import supabase from '../config/supabase';
import { TelemetriaPayload } from '../types/telemetria';

interface RegraMapeamento {
  campo: keyof Pick<TelemetriaPayload, 'temperatura' | 'tensao' | 'corrente' | 'vibracao' | 'inclinacao'>;
  parametro: string; // Nome exato registado na coluna `parametro` da tabela `limites`
  tipoMinimo: string; // Tipo de anomalia ao ficar abaixo do mínimo
  tipoMaximo: string; // Tipo de anomalia ao ficar acima do máximo
  unidade: string;
}

const MAPEAMENTO_PARAMETROS: RegraMapeamento[] = [
  { campo: 'tensao', parametro: 'Tensão', tipoMinimo: 'Subtensão', tipoMaximo: 'Sobretensão', unidade: 'V' },
  { campo: 'corrente', parametro: 'Corrente', tipoMinimo: 'Subcorrente', tipoMaximo: 'Sobrecorrente', unidade: 'A' },
  { campo: 'temperatura', parametro: 'Temperatura', tipoMinimo: 'Temperatura baixa', tipoMaximo: 'Temperatura elevada', unidade: '°C' },
  { campo: 'vibracao', parametro: 'Vibração', tipoMinimo: 'Vibração anómala (Baixa)', tipoMaximo: 'Vibração elevada', unidade: 'g' },
  { campo: 'inclinacao', parametro: 'Inclinação', tipoMinimo: 'Inclinação anómala', tipoMaximo: 'Inclinação elevada', unidade: '°' },
];

const MARGEM_CRITICO = 0.2; // 20% acima/abaixo do limite para contar como CRÍTICO

interface LimiteBD {
  parametro: string;
  valor_minimo: number | null;
  valor_maximo: number | null;
  unidade: string;
}

export async function avaliarTelemetria(
  estacaoId: string,
  codigoEstacao: string,
  payload: TelemetriaPayload
) {
  // 1. Procura a nova estrutura com valor_minimo e valor_maximo
  const { data: limites, error: erroLimites } = await supabase
    .from('limites')
    .select('parametro, valor_minimo, valor_maximo, unidade');

  if (erroLimites || !limites) {
    console.error('⚠️ Não foi possível carregar os limites para avaliar a telemetria:', erroLimites?.message);
    return;
  }

  // Mapeia parâmetros para acesso O(1)
  const mapaLimites = new Map<string, LimiteBD>(
    limites.map((l) => [l.parametro, l])
  );

  for (const regra of MAPEAMENTO_PARAMETROS) {
    const valorLido = payload[regra.campo];
    if (valorLido == null) continue;

    const configLimite = mapaLimites.get(regra.parametro);
    if (!configLimite) continue;

    const min = configLimite.valor_minimo !== null ? Number(configLimite.valor_minimo) : null;
    const max = configLimite.valor_maximo !== null ? Number(configLimite.valor_maximo) : null;

    let violacao: { tipo: 'min' | 'max'; limiteExcedido: number } | null = null;

    // Avalia Mínimo
    if (min !== null && valorLido < min) {
      violacao = { tipo: 'min', limiteExcedido: min };
    } 
    // Avalia Máximo
    else if (max !== null && valorLido > max) {
      violacao = { tipo: 'max', limiteExcedido: max };
    }

    if (!violacao) continue;

    const { tipo, limiteExcedido } = violacao;
    const tipoAnomalia = tipo === 'min' ? regra.tipoMinimo : regra.tipoMaximo;

    // Cálculo da severidade (desvio proporcional em relação ao limite)
    const desvio = Math.abs(valorLido - limiteExcedido) / (limiteExcedido || 1);
    const severidade = desvio >= MARGEM_CRITICO ? 'CRITICO' : 'ATENCAO';

    const descricao =
      tipo === 'max'
        ? `${tipoAnomalia}: ${valorLido} ${regra.unidade} acima do limite máximo de ${limiteExcedido} ${regra.unidade}.`
        : `${tipoAnomalia}: ${valorLido} ${regra.unidade} abaixo do limite mínimo de ${limiteExcedido} ${regra.unidade}.`;

    // 1. Regista a anomalia na BD
    const { error: erroAnomalia } = await supabase
      .from('anomalias')
      .insert([
        {
          tipo: tipoAnomalia,
          descricao,
          severidade,
          estacao_id: estacaoId,
        },
      ]);

    if (erroAnomalia) {
      console.error(`❌ Erro ao registar anomalia (${tipoAnomalia}) para ${codigoEstacao}:`, erroAnomalia.message);
      continue;
    }

    // 2. Gera o alerta acionável
    const { error: erroAlerta } = await supabase.from('alertas').insert([
      {
        tipo: tipoAnomalia,
        valor: `${valorLido} ${regra.unidade}`,
        limite: `${limiteExcedido} ${regra.unidade}`,
        severidade,
        estacao_id: estacaoId,
        lido: false,
        resolvido: false,
      },
    ]);

    if (erroAlerta) {
      console.error(`❌ Erro ao gerar alerta (${tipoAnomalia}) para ${codigoEstacao}:`, erroAlerta.message);
    } else {
      console.log(`🚨 ${severidade} detetado em ${codigoEstacao}: ${descricao}`);
    }
  }
}