// frontend/src/services/dataService.ts
import { api } from './api';
import { Estacao, Sensor, Alerta, Anomalia, Utilizador } from '../lib/mock-data';

export type EstadoTempoReal = 'ok' | 'alerta' | 'perigo' | 'offline';

export interface EstacaoComEstado extends Estacao {
  estadoTempoReal: EstadoTempoReal;
  ultimaTelemetria: TelemetriaLeitura | null;
}

// --- ESTAÇÕES ---
export async function getEstacoes(): Promise<EstacaoComEstado[]> {
  const { data } = await api.get('/estacoes');

  return data.map((item: any) => {
    const ultima = item.ultima_telemetria;
    const estadoTempoReal: EstadoTempoReal = item.estado_tempo_real ?? 'offline';

    return {
      id: item.id,
      codigo: item.codigo,
      local: item.municipio ? `${item.municipio}${item.comuna ? `, ${item.comuna}` : ''}` : (item.nome ?? 'Caála'),
      estado: estadoTempoReal === 'ok' ? 'online' : estadoTempoReal === 'offline' ? 'offline' : 'atencao',
      ativa: item.estado !== 'Inativa',
      devEui: item.dev_eui || item.device_id || 'N/A',
      ultimaComunicacao: ultima ? new Date(ultima.created_at).toLocaleString('pt-PT') : 'Sem comunicação',
      bateria: 0,
      sinal: 'Forte',
      tensao: ultima?.tensao ?? 0,
      corrente: ultima?.corrente ?? 0,
      temperatura: ultima?.temperatura ?? 0,
      potencia: ultima?.tensao && ultima?.corrente ? Number(((ultima.tensao * ultima.corrente) / 1000).toFixed(2)) : 0,
      consumoHoje: 0,
      vibracao: ultima?.vibracao ?? 0,
      inclinacao: ultima?.inclinacao ?? 0,
      estadoTempoReal,
      ultimaTelemetria: ultima ?? null,
    };
  });
}

// --- SENSORES ---
export async function getSensores(): Promise<Sensor[]> {
  const { data } = await api.get('/sensores');
  return data.map((item: any) => ({
    id: item.id,
    nome: item.nome,
    tipo: item.tipo,
    unidade: item.unidade,
    estacao: item.estacoes?.codigo ?? item.estacao_id,
    ativo: item.ativo ?? true,
    ultimoValor: item.ultimo_valor ?? 0,
  }));
}

// --- ALERTAS ---
// O backend já não usa embed relacional do Supabase (não havia FK real
// entre estacao_id e estacoes.id) — em vez de `item.estacoes?.codigo`,
// o controller agora devolve `estacao_codigo` diretamente em cada linha.
export async function getAlertas(): Promise<Alerta[]> {
  const { data } = await api.get('/alertas');
  return data.map((item: any) => ({
    id: item.id,
    tipo: item.tipo,
    estacao: item.estacao_codigo || item.estacao_id || 'Estação desconhecida',
    valor: item.valor,
    limite: item.limite,
    severidade: item.severidade,
    data: item.data_ocorrencia ? new Date(item.data_ocorrencia).toLocaleString('pt-PT') : '—',
    lido: item.lido,
    resolvido: item.resolvido,
  }));
}

// --- ANOMALIAS ---
export async function getAnomalias(): Promise<Anomalia[]> {
  const { data } = await api.get('/anomalias');
  return data.map((item: any) => ({
    id: item.id,
    tipo: item.tipo,
    estacao: item.estacao_codigo || item.estacao_id || 'Estação desconhecida',
    descricao: item.descricao,
    severidade: item.severidade,
    data: item.data_ocorrencia ? new Date(item.data_ocorrencia).toLocaleString('pt-PT') : '—',
  }));
}

// --- UTILIZADORES ---
export async function getUtilizadores(): Promise<Utilizador[]> {
  const { data } = await api.get('/usuarios');
  return data.map((item: any) => ({
    id: item.id,
    nome: item.nome_completo,
    email: item.email,
    perfil: item.perfil,
    ativo: item.estado !== 'Inativa',
    ultimoAcesso: item.ultimo_acesso ? new Date(item.ultimo_acesso).toLocaleString('pt-PT') : 'Sem registo',
  }));
}

// --- CONFIGURAÇÕES / LIMITES ---
export interface LimiteConfiguravel {
  id?: number;
  parametro: string;
  valor_minimo: number | null;
  valor_maximo: number | null;
  unidade: string;
}

// Valores padrão alinhados ao sistema IoT Energia Caála — usados só se a
// API ainda não devolver nada (ex: tabela `limites` vazia).
const LIMITES_PADRAO: LimiteConfiguravel[] = [
  { parametro: 'Tensão', valor_minimo: 200, valor_maximo: 240, unidade: 'V' },
  { parametro: 'Corrente', valor_minimo: null, valor_maximo: 12, unidade: 'A' },
  { parametro: 'Temperatura', valor_minimo: null, valor_maximo: 60, unidade: '°C' },
  { parametro: 'Vibração', valor_minimo: null, valor_maximo: 2, unidade: 'g' },
  { parametro: 'Inclinação', valor_minimo: null, valor_maximo: 5, unidade: '°' },
];

export async function getLimites(): Promise<LimiteConfiguravel[]> {
  try {
    const { data } = await api.get('/configuracoes/limites');
    const lista = Array.isArray(data) ? data : data?.limites ?? [];

    if (lista.length === 0) return LIMITES_PADRAO;

    return lista.map((item: any) => ({
      id: item.id,
      parametro: item.parametro,
      valor_minimo: item.valor_minimo != null ? Number(item.valor_minimo) : null,
      valor_maximo: item.valor_maximo != null ? Number(item.valor_maximo) : null,
      unidade: item.unidade || extrairUnidade(item.parametro),
    }));
  } catch (error) {
    console.warn('Rota /configuracoes/limites indisponível. A usar limites padrão.', error);
    return LIMITES_PADRAO;
  }
}

function extrairUnidade(parametro: string): string {
  const map: Record<string, string> = {
    tensão: 'V',
    corrente: 'A',
    temperatura: '°C',
    vibração: 'g',
    inclinação: '°',
  };
  return map[parametro.toLowerCase()] || '';
}

export async function atualizarLimites(limites: Partial<LimiteConfiguravel>[]) {
  const payload = limites.map((l) => ({
    parametro: l.parametro,
    valor_minimo: l.valor_minimo,
    valor_maximo: l.valor_maximo,
  }));

  const { data } = await api.put('/configuracoes/limites', payload);
  return data;
}

// --- TELEMETRIA ---
export interface TelemetriaLeitura {
  id: number;
  codigo_estacao: string;
  device_id: string;
  temperatura: number | null;
  tensao: number | null;
  corrente: number | null;
  vibracao: number | null;
  inclinacao: number | null;
  created_at: string;
}

export async function getTelemetriaEstacao(codigo: string, limit = 50): Promise<TelemetriaLeitura[]> {
  const { data } = await api.get(`/telemetria/estacao/${codigo}?limit=${limit}`);
  return data;
}

export async function getTelemetriaRecente(limit = 200): Promise<TelemetriaLeitura[]> {
  const { data } = await api.get(`/telemetria/recente?limit=${limit}`);
  return data;
}
