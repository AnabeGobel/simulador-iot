import { Request, Response } from 'express';
import supabase from '../config/supabase';

interface RelatorioQuery {
  estacao?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface EstatisticasNumericas {
  media: number | null;
  min: number | null;
  max: number | null;
}

// Calcula média/mínimo/máximo ignorando valores nulos ou inválidos
function calcularEstatisticas(valores: Array<number | null | undefined>): EstatisticasNumericas {
  const validos = valores
    .map((v) => Number(v))
    .filter((v) => v !== null && v !== undefined && !isNaN(v));

  if (validos.length === 0) {
    return { media: null, min: null, max: null };
  }

  const soma = validos.reduce((acc, v) => acc + v, 0);

  return {
    media: Number((soma / validos.length).toFixed(2)),
    min: Number(Math.min(...validos).toFixed(2)),
    max: Number(Math.max(...validos).toFixed(2)),
  };
}

// A tabela anomalias já tem colunas `valor`/`limite`, mas por agora ficam
// null nos registos gerados automaticamente — o valor real está embutido no
// texto de `descricao`, no formato:
// "<Tipo>: <valor> <unidade> acima/abaixo do limite máximo/mínimo de <limite> <unidade>."
// Damos sempre prioridade às colunas valor/limite quando vierem preenchidas.
function extrairValorLimite(
  valorColuna: string | number | null | undefined,
  limiteColuna: string | number | null | undefined,
  descricao: string | null | undefined
): { valor: string; limite: string } {
  if (valorColuna !== null && valorColuna !== undefined && limiteColuna !== null && limiteColuna !== undefined) {
    return { valor: String(valorColuna), limite: String(limiteColuna) };
  }

  if (descricao) {
    const match = descricao.match(
      /([\d.,]+)\s*([^\d\s]*)\s+(?:acima|abaixo)\s+do limite\s+(?:máximo|mínimo)\s+de\s+([\d.,]+)\s*([^\d\s.]*)/i
    );
    if (match) {
      const [, valorNum, valorUnidade, limiteNum, limiteUnidade] = match;
      return {
        valor: `${valorNum} ${valorUnidade}`.trim(),
        limite: `${limiteNum} ${limiteUnidade}`.trim(),
      };
    }
    return { valor: descricao, limite: '—' };
  }

  return { valor: '—', limite: '—' };
}

function traduzirGravidade(severidade: string | null | undefined): string {
  if (severidade === 'CRITICO') return 'Crítica';
  if (severidade === 'ATENCAO') return 'Média';
  return severidade || '—';
}

function traduzirSituacaoAnomalia(severidade: string | null | undefined): string {
  return severidade === 'CRITICO' ? 'Crítico' : 'Atenção';
}

export const gerarRelatorio = async (req: Request<{}, {}, {}, RelatorioQuery>, res: Response) => {
  try {
    const { estacao = 'TODAS', dataInicio, dataFim } = req.query;

    // Período: se não vier data, usa os últimos 30 dias como padrão
    const fimData = dataFim ? new Date(`${dataFim}T23:59:59.999Z`) : new Date();
    const inicioData = dataInicio
      ? new Date(`${dataInicio}T00:00:00.000Z`)
      : new Date(fimData.getTime() - 30 * 24 * 60 * 60 * 1000);

    const filtrarPorEstacao = estacao && estacao !== 'TODAS';

    // 0. Dados de quem gerou o relatório (emissor).
    // req.usuario (preenchido pelo authMiddleware) só traz id/email/perfil —
    // nome_completo e telefone vêm da tabela usuarios, tal como o
    // authController.ts já faz no login.
    let emissorNome = 'Utilizador SIMIE-CAÁLA';
    let emissorContato = '(+244) 923 000 000';

    if (req.usuario?.id) {
      const { data: perfilEmissor } = await supabase
        .from('usuarios')
        .select('nome_completo, telefone')
        .eq('id', req.usuario.id)
        .maybeSingle();

      if (perfilEmissor?.nome_completo) emissorNome = perfilEmissor.nome_completo;
      if (perfilEmissor?.telefone) emissorContato = perfilEmissor.telefone;
    }

    // 1. Mapa de todas as estações (id UUID -> registo completo).
    // Necessário porque alertas.estacao_id e anomalias.estacao_id guardam o
    // UUID real de estacoes.id, não o código "CAALA-00X" — precisamos deste
    // mapa tanto para resolver o filtro (código -> UUID) como para mostrar
    // o código de volta nas linhas da tabela.
    const { data: todasEstacoes, error: erroEstacoes } = await supabase.from('estacoes').select('*');
    if (erroEstacoes) {
      console.error('Erro Supabase ao consultar estações:', erroEstacoes);
      return res.status(500).json({ message: 'Erro ao consultar estações.', detalhe: erroEstacoes.message });
    }

    const listaEstacoes = todasEstacoes ?? [];
    const mapaPorId = new Map(listaEstacoes.map((e) => [e.id, e]));
    const estacaoInfo = filtrarPorEstacao ? listaEstacoes.find((e) => e.codigo === estacao) ?? null : null;

    // Se foi escolhida uma estação específica mas ela não existe na tabela,
    // não há telemetria/alertas/anomalias para procurar por UUID.
    const estacaoNaoEncontrada = filtrarPorEstacao && !estacaoInfo;

    // 2. Telemetria do período — é a fonte de todos os agregados numéricos
    // (esta tabela usa codigo_estacao em texto, não UUID)
    let leituras: any[] = [];
    if (!estacaoNaoEncontrada) {
      let queryTelemetria = supabase
        .from('telemetria')
        .select('*')
        .gte('created_at', inicioData.toISOString())
        .lte('created_at', fimData.toISOString());

      if (filtrarPorEstacao) {
        queryTelemetria = queryTelemetria.eq('codigo_estacao', estacao);
      }

      const { data: telemetriaData, error: erroTelemetria } = await queryTelemetria;
      if (erroTelemetria) {
        console.error('Erro Supabase ao consultar telemetria:', erroTelemetria);
        return res.status(500).json({ message: 'Erro ao consultar telemetria.', detalhe: erroTelemetria.message });
      }
      leituras = telemetriaData ?? [];
    }

    const tempStats = calcularEstatisticas(leituras.map((l) => l.temperatura));
    const tensaoStats = calcularEstatisticas(leituras.map((l) => l.tensao));
    const correnteStats = calcularEstatisticas(leituras.map((l) => l.corrente));
    const vibracaoStats = calcularEstatisticas(leituras.map((l) => l.vibracao));
    const inclinacaoStats = calcularEstatisticas(leituras.map((l) => l.inclinacao));

    // Consumo estimado (kWh): não existe coluna de energia acumulada na
    // tabela telemetria (só tensão/corrente instantâneas), então
    // aproximamos pela potência média do período (kW) x horas do período.
    const potenciasKw = leituras
      .filter((l) => l.tensao != null && l.corrente != null)
      .map((l) => (Number(l.tensao) * Number(l.corrente)) / 1000);
    const potenciaMediaKw = potenciasKw.length
      ? potenciasKw.reduce((acc, p) => acc + p, 0) / potenciasKw.length
      : 0;
    const horasPeriodo = Math.max((fimData.getTime() - inicioData.getTime()) / (1000 * 60 * 60), 0);
    const consumoTotal = Number((potenciaMediaKw * horasPeriodo).toFixed(2));

    // 3. Anomalias do período
    // Nota: a coluna de data é `data_ocorrencia` (não `created_at`), e
    // `estacao_id` é o UUID real de estacoes.id.
    let anomaliasData: any[] = [];
    if (!estacaoNaoEncontrada) {
      let queryAnomalias = supabase
        .from('anomalias')
        .select('*')
        .gte('data_ocorrencia', inicioData.toISOString())
        .lte('data_ocorrencia', fimData.toISOString())
        .order('data_ocorrencia', { ascending: false });

      if (filtrarPorEstacao && estacaoInfo) {
        queryAnomalias = queryAnomalias.eq('estacao_id', estacaoInfo.id);
      }

      const { data, error: erroAnomalias } = await queryAnomalias;
      if (erroAnomalias) {
        console.error('Erro Supabase ao consultar anomalias:', erroAnomalias);
        return res.status(500).json({ message: 'Erro ao consultar anomalias.', detalhe: erroAnomalias.message });
      }
      anomaliasData = data ?? [];
    }

    // 4. Alertas do período (mesma lógica: estacao_id é UUID)
    let alertasData: any[] = [];
    if (!estacaoNaoEncontrada) {
      let queryAlertas = supabase
        .from('alertas')
        .select('*')
        .gte('data_ocorrencia', inicioData.toISOString())
        .lte('data_ocorrencia', fimData.toISOString())
        .order('data_ocorrencia', { ascending: false });

      if (filtrarPorEstacao && estacaoInfo) {
        queryAlertas = queryAlertas.eq('estacao_id', estacaoInfo.id);
      }

      const { data, error: erroAlertas } = await queryAlertas;
      if (erroAlertas) {
        console.error('Erro Supabase ao consultar alertas:', erroAlertas);
        return res.status(500).json({ message: 'Erro ao consultar alertas.', detalhe: erroAlertas.message });
      }
      alertasData = data ?? [];
    }

    const codigoDaEstacao = (estacaoIdUuid: string | null | undefined) =>
      (estacaoIdUuid && mapaPorId.get(estacaoIdUuid)?.codigo) || 'N/A';

    const anomaliasFormatadas = anomaliasData.map((a: any) => {
      const { valor, limite } = extrairValorLimite(a.valor, a.limite, a.descricao);
      return {
        id: String(a.id),
        dataHora: a.data_ocorrencia ? new Date(a.data_ocorrencia).toLocaleString('pt-PT') : '—',
        estacao: codigoDaEstacao(a.estacao_id),
        parametro: a.tipo || '—',
        valor,
        limite,
        situacao: traduzirSituacaoAnomalia(a.severidade),
      };
    });

    const alertasFormatados = alertasData.map((a: any) => ({
      id: String(a.id),
      data: a.data_ocorrencia ? new Date(a.data_ocorrencia).toLocaleDateString('pt-PT') : '—',
      estacao: codigoDaEstacao(a.estacao_id),
      tipo: a.tipo || '—',
      gravidade: traduzirGravidade(a.severidade),
      estado: a.resolvido ? 'Resolvido' : a.lido ? 'Em análise' : 'Pendente',
    }));

    const codigoEstacaoLabel = filtrarPorEstacao ? String(estacao) : 'Todas as Estações';

    const respostaRelatorio = {
      emissor: {
        nome: emissorNome,
        contato: emissorContato,
      },
      estacaoInfo: {
        codigo: codigoEstacaoLabel,
        dispositivo: estacaoInfo?.device_id || (filtrarPorEstacao ? 'N/A' : 'Múltiplos dispositivos'),
        localizacao: estacaoInfo
          ? `${estacaoInfo.municipio || 'Caála'}${estacaoInfo.comuna ? `, ${estacaoInfo.comuna}` : ''}`
          : 'Rede SIMIE-CAÁLA',
        status: estacaoInfo?.estado || (filtrarPorEstacao ? 'Sem dados no período' : 'Rede completa'),
      },
      resumo: {
        totalMedicoes: leituras.length,
        tempMedia: tempStats.media,
        tempMax: tempStats.max,
        tempMin: tempStats.min,
        tensaoMedia: tensaoStats.media,
        tensaoMin: tensaoStats.min,
        tensaoMax: tensaoStats.max,
        correnteMedia: correnteStats.media,
        correnteMin: correnteStats.min,
        correnteMax: correnteStats.max,
        consumoTotal,
        vibracaoMax: vibracaoStats.max,
        inclinacaoMax: inclinacaoStats.max,
        totalAnomalias: anomaliasFormatadas.length,
        totalAlertas: alertasFormatados.length,
      },
      anomalias: anomaliasFormatadas,
      alertas: alertasFormatados,
      conclusao: `Durante o período analisado (${dataInicio || inicioData.toLocaleDateString('pt-PT')} — ${
        dataFim || fimData.toLocaleDateString('pt-PT')
      }), a estação ${codigoEstacaoLabel} registou ${leituras.length} medições de telemetria. Foram identificadas ${
        anomaliasFormatadas.length
      } anomalia(s) e ${alertasFormatados.length} alerta(s) no período.`,
    };

    return res.status(200).json(respostaRelatorio);
  } catch (error: any) {
    console.error('Erro ao gerar relatório:', error);
    return res.status(500).json({ message: 'Erro interno ao gerar relatório.', detalhe: error.message });
  }
};
