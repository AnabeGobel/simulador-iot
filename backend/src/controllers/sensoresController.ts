import { Request, Response } from 'express';
import supabase from '../config/supabase';

// Mapeia o `tipo` do sensor para a coluna correspondente na tabela
// telemetria. Tipos sem correspondência direta (Energia, Aceleração/
// Movimento, Impacto) não têm coluna própria em telemetria, por isso
// ficam sem "último valor" por agora.
const CAMPO_TELEMETRIA_POR_TIPO: Record<string, 'temperatura' | 'tensao' | 'corrente' | 'vibracao' | 'inclinacao'> = {
  Temperatura: 'temperatura',
  Tensão: 'tensao',
  Corrente: 'corrente',
  Vibração: 'vibracao',
  Inclinação: 'inclinacao',
};

export const listarSensores = async (req: Request, res: Response) => {
  const { data: sensores, error } = await supabase
    .from('sensores')
    .select('*, estacoes(codigo, nome)')
    .order('codigo', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar sensores.', detalhe: error.message });
  }

  const listaSensores = sensores ?? [];
  if (listaSensores.length === 0) return res.json([]);

  // Códigos de estação envolvidos (telemetria usa codigo_estacao em texto,
  // não o estacao_id UUID guardado no sensor).
  const codigosEstacoes = Array.from(
    new Set(listaSensores.map((s: any) => s.estacoes?.codigo).filter(Boolean))
  );

  const ultimaLeituraPorEstacao = new Map<string, any>();

  if (codigosEstacoes.length > 0) {
    const { data: leituras, error: erroTelemetria } = await supabase
      .from('telemetria')
      .select('*')
      .in('codigo_estacao', codigosEstacoes)
      .order('created_at', { ascending: false });

    if (erroTelemetria) {
      console.error('Erro Supabase ao consultar telemetria para sensores:', erroTelemetria);
      // Não interrompe a resposta — devolve os sensores sem "último valor"
      // em vez de rebentar a página inteira por causa disto.
    } else {
      (leituras ?? []).forEach((l: any) => {
        // Vem ordenado do mais recente para o mais antigo, então a primeira
        // ocorrência de cada estação já é a leitura mais recente dela.
        if (!ultimaLeituraPorEstacao.has(l.codigo_estacao)) {
          ultimaLeituraPorEstacao.set(l.codigo_estacao, l);
        }
      });
    }
  }

  const sensoresComValor = listaSensores.map((s: any) => {
    const codigoEstacao = s.estacoes?.codigo;
    const leitura = codigoEstacao ? ultimaLeituraPorEstacao.get(codigoEstacao) : undefined;
    const campo = CAMPO_TELEMETRIA_POR_TIPO[s.tipo];
    const ultimoValor = campo && leitura ? leitura[campo] : null;

    return {
      ...s,
      ultimo_valor: ultimoValor,
    };
  });

  return res.json(sensoresComValor);
};

export const criarSensor = async (req: Request, res: Response) => {
  const { codigo, nome, tipo, unidade, limite_atencao, limite_critico, estacao_id } = req.body;

  const { data, error } = await supabase
    .from('sensores')
    .insert([{ codigo, nome, tipo, unidade, limite_atencao, limite_critico, estacao_id }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ erro: 'Erro ao cadastrar sensor.', detalhe: error.message });
  }

  return res.status(201).json({ mensagem: 'Sensor criado com sucesso!', sensor: data });
};

// Ativa/desativa um sensor. A tabela guarda o estado em `estado`
// ('Ativo' | 'Inativo'), não numa coluna booleana — por isso convertemos
// aqui o `ativo: true/false` que vem do frontend.
export const atualizarEstadoSensor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ativo } = req.body;

  if (typeof ativo !== 'boolean') {
    return res.status(400).json({ erro: 'O campo "ativo" (true ou false) é obrigatório.' });
  }

  const { data, error } = await supabase
    .from('sensores')
    .update({ estado: ativo ? 'Ativo' : 'Inativo' })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ erro: 'Erro ao atualizar estado do sensor.', detalhe: error.message });
  }

  return res.json({ mensagem: 'Estado do sensor atualizado com sucesso!', sensor: data });
};

// Remove definitivamente um sensor.
export const removerSensor = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = await supabase.from('sensores').delete().eq('id', id);

  if (error) {
    return res.status(400).json({ erro: 'Erro ao remover sensor.', detalhe: error.message });
  }

  return res.json({ mensagem: 'Sensor removido com sucesso!' });
};
