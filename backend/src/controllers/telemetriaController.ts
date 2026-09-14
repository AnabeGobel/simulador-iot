import { Request, Response } from 'express';
import supabase from '../config/supabase';

export interface TelemetriaPayload {
  codigo_estacao: string;
  device_id: string;
  temperatura?: number;
  tensao?: number;
  corrente?: number;
  vibracao?: number;
  inclinacao?: number;
}

export const processarEMultarTelemetria = async (payload: TelemetriaPayload) => {
  try {
    // 0. Verifica se a estação está ativa antes de aceitar a leitura.
    // Uma estação marcada como "Inativa" (ver atualizarEstadoEstacao em
    // estacoesController.ts) deixa de aceitar telemetria — o ESP pode
    // continuar fisicamente a enviar dados, mas o backend passa a
    // ignorá-los enquanto a estação estiver desativada.
    const codigoEstacaoPayload = payload.codigo_estacao || payload.device_id;
    if (codigoEstacaoPayload) {
      const { data: estacaoAlvo } = await supabase
        .from('estacoes')
        .select('estado')
        .eq('codigo', codigoEstacaoPayload)
        .maybeSingle();

      if (estacaoAlvo && estacaoAlvo.estado === 'Inativa') {
        console.warn(`⛔ Telemetria ignorada: a estação ${codigoEstacaoPayload} está inativa.`);
        return null;
      }
    }

    // 1. Guardar a leitura de telemetria
    const { data: telemetriaInserida, error: errTelemetria } = await supabase
      .from('telemetria')
      .insert([payload])
      .select()
      .single();

    if (errTelemetria) {
      console.error('❌ Erro ao salvar telemetria:', errTelemetria.message);
      return;
    }

    // 2. Buscar os limites configurados na BD
    const { data: limites, error: errLimites } = await supabase.from('limites').select('*');
    if (errLimites || !limites) {
      console.error('⚠️ Erro ao carregar limites para verificação.');
      return;
    }

    // Mapeamento normalizado (converte todas as chaves para minúsculas e sem acentos)
    const mapaLimites = new Map<string, number>();
    limites.forEach((l: any) => {
      const chave = String(l.parametro || l.nome || '').toLowerCase().trim();
      const valor = Number(l.valor_maximo ?? l.valor ?? l.limite);
      if (chave && !isNaN(valor)) {
        mapaLimites.set(chave, valor);
      }
    });

    const codigoEstacao = payload.codigo_estacao || payload.device_id || 'ESTACAO-CAALA-01';
    const alertasParaInserir: any[] = [];
    const anomaliasParaInserir: any[] = [];

    // Função de verificação flexível de limites
    const checarLimite = (
      chavesParametro: string[],
      valorMedido: number | undefined,
      tipoTitulo: string,
      severidade: 'ATENCAO' | 'CRITICO'
    ) => {
      if (valorMedido === undefined || valorMedido === null || isNaN(valorMedido)) return;

      // Tenta encontrar o limite por qualquer uma das chaves associadas
      let limiteMax: number | undefined = undefined;
      for (const chave of chavesParametro) {
        if (mapaLimites.has(chave)) {
          limiteMax = mapaLimites.get(chave);
          break;
        }
      }

      if (limiteMax !== undefined && valorMedido > limiteMax) {
        const descricao = `${tipoTitulo}: Valor de ${valorMedido} ultrapassou o limite tolerado de ${limiteMax}.`;

        // Registo para a tabela de alertas
        alertasParaInserir.push({
          tipo: tipoTitulo,
          estacao_id: codigoEstacao,
          valor: String(valorMedido),
          limite: String(limiteMax),
          severidade,
          lido: false,
          resolvido: false,
          created_at: new Date().toISOString(),
        });

        // Registo para a tabela de anomalias
        anomaliasParaInserir.push({
          tipo: tipoTitulo,
          estacao: codigoEstacao,
          descricao,
          severidade,
          created_at: new Date().toISOString(),
        });
      }
    };

    // Mapeamento de checagem cobrindo variações de nomes na BD
    checarLimite(['temperatura', 'temp'], payload.temperatura, 'Temperatura Elevada', 'CRITICO');
    checarLimite(['tensao', 'tensão', 'voltage'], payload.tensao, 'Sobretensão Detectada', 'CRITICO');
    checarLimite(['corrente', 'current'], payload.corrente, 'Sobrecorrente Detectada', 'CRITICO');
    checarLimite(['vibracao', 'vibração', 'vibration'], payload.vibracao, 'Vibração Anormal', 'ATENCAO');
    checarLimite(['inclinacao', 'inclinação', 'tilt'], payload.inclinacao, 'Desvio de Inclinação', 'ATENCAO');

    // 3. Guardar Alertas no Supabase
    if (alertasParaInserir.length > 0) {
      const { error: errAlertas } = await supabase.from('alertas').insert(alertasParaInserir);
      if (errAlertas) {
        console.error('❌ Erro ao gravar alertas:', errAlertas.message);
      } else {
        console.log(`🚨 ${alertasParaInserir.length} alerta(s) inserido(s) com sucesso.`);
      }
    }

    // 4. Guardar Anomalias no Supabase
    if (anomaliasParaInserir.length > 0) {
      const { error: errAnomalias } = await supabase.from('anomalias').insert(anomaliasParaInserir);
      if (errAnomalias) {
        console.error('❌ Erro ao gravar anomalias:', errAnomalias.message);
      } else {
        console.log(`⚠️ ${anomaliasParaInserir.length} anomalia(s) inserida(s) com sucesso.`);
      }
    }

    return telemetriaInserida;
  } catch (err) {
    console.error('❌ Erro inesperado ao processar telemetria:', err);
  }
};

// POST /api/telemetria
export const receberTelemetriaViaHttp = async (req: Request, res: Response) => {
  try {
    const payload: TelemetriaPayload = req.body;
    const resultado = await processarEMultarTelemetria(payload);

    if (!resultado) {
      return res.status(403).json({
        mensagem: 'Telemetria não processada — a estação está inativa ou os dados são inválidos.',
      });
    }

    return res.status(201).json({ mensagem: 'Telemetria processada', dados: resultado });
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ error: 'Erro ao processar telemetria: ' + error.message });
  }
};

// GET /api/telemetria/estacao/:codigo
export const listarTelemetriaPorEstacao = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;
    const limiteParam = Number(req.query.limit);
    const limite = !isNaN(limiteParam) && limiteParam > 0 ? limiteParam : 50;

    const { data, error } = await supabase
      .from('telemetria')
      .select('*')
      .eq('codigo_estacao', codigo)
      .order('created_at', { ascending: false })
      .limit(limite);

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ error: 'Erro ao procurar telemetria: ' + error.message });
  }
};

// GET /api/telemetria/recente
export const listarTelemetriaRecente = async (req: Request, res: Response) => {
  try {
    const limiteParam = Number(req.query.limit);
    const limite = !isNaN(limiteParam) && limiteParam > 0 ? limiteParam : 200;

    const { data, error } = await supabase
      .from('telemetria')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limite);

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ error: 'Erro ao procurar telemetria recente: ' + error.message });
  }
};

// GET /api/telemetria/estacao/:codigo/ultima
export const obterUltimaLeituraPorEstacao = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;

    const { data, error } = await supabase
      .from('telemetria')
      .select('*')
      .eq('codigo_estacao', codigo)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data || null);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ error: 'Erro ao procurar última telemetria: ' + error.message });
  }
};
