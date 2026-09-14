export type Severidade = "NORMAL" | "ATENCAO" | "CRITICO";
export type EstadoEstacao = "online" | "atencao" | "offline";

export interface Estacao {
  id: string;
  codigo: string;
  local: string;
  estado: EstadoEstacao;
  ativa: boolean;
  devEui: string;
  ultimaComunicacao: string;
  bateria: number;
  sinal: "Forte" | "Médio" | "Fraco";
  tensao: number;
  corrente: number;
  temperatura: number;
  potencia: number;
  consumoHoje: number;
  vibracao: number;
  inclinacao: number;
}

export interface Sensor {
  id: string;
  nome: string;
  tipo: string;
  unidade: string;
  estacao: string;
  ativo: boolean;
  ultimoValor: number;
}

export interface Alerta {
  id: string;
  tipo: string;
  estacao: string;
  valor: string;
  limite: string;
  severidade: Severidade;
  data: string;
  lido: boolean;
  resolvido: boolean;
}

export interface Anomalia {
  id: string;
  tipo: string;
  estacao: string;
  descricao: string;
  severidade: Severidade;
  data: string;
}

export interface Utilizador {
  id: string;
  nome: string;
  email: string;
  perfil: "admin" | "tecnico" | "operador";
  ativo: boolean;
  ultimoAcesso: string;
}

const locais = [
  "Caála Centro",
  "Bairro Kanjala",
  "Zona Industrial",
  "Estrada Nacional",
  "Bairro Cassumbe",
  "Mercado Municipal",
  "Hospital Municipal",
  "Escola Nº 12",
];

function seedRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

export const estacoes: Estacao[] = Array.from({ length: 25 }, (_, i) => {
  const r = seedRand(i + 7);
  const estado: EstadoEstacao = i % 9 === 3 ? "offline" : i % 5 === 2 ? "atencao" : "online";
  return {
    id: `est-${i + 1}`,
    codigo: `CAALA-${String(i + 1).padStart(3, "0")}`,
    local: locais[i % locais.length] ?? "Caála",
    estado,
    ativa: estado !== "offline",
    devEui: `A84041${(1000 + i).toString(16).toUpperCase()}FF`,
    ultimaComunicacao: estado === "offline" ? "há 2 dias" : `há ${Math.floor(r() * 50) + 5} segundos`,
    bateria: Math.round(60 + r() * 40),
    sinal: r() > 0.6 ? "Forte" : r() > 0.3 ? "Médio" : "Fraco",
    tensao: Number((215 + r() * 25).toFixed(1)),
    corrente: Number((5 + r() * 6).toFixed(1)),
    temperatura: Number((28 + r() * 35).toFixed(1)),
    potencia: Number((1.2 + r() * 1.4).toFixed(2)),
    consumoHoje: Number((15 + r() * 30).toFixed(1)),
    vibracao: Number((r() * 4).toFixed(2)),
    inclinacao: Number((r() * 6).toFixed(1)),
  };
});

export const sensores: Sensor[] = estacoes.slice(0, 12).flatMap((e, i) => [
  {
    id: `sen-${i}-1`,
    nome: `Tensão ${e.codigo}`,
    tipo: "Tensão",
    unidade: "V",
    estacao: e.codigo,
    ativo: true,
    ultimoValor: e.tensao,
  },
  {
    id: `sen-${i}-2`,
    nome: `Corrente ${e.codigo}`,
    tipo: "Corrente",
    unidade: "A",
    estacao: e.codigo,
    ativo: true,
    ultimoValor: e.corrente,
  },
  {
    id: `sen-${i}-3`,
    nome: `Temperatura ${e.codigo}`,
    tipo: "Temperatura",
    unidade: "°C",
    estacao: e.codigo,
    ativo: e.estado !== "offline",
    ultimoValor: e.temperatura,
  },
  {
    id: `sen-${i}-4`,
    nome: `IMU (MPU6050) ${e.codigo}`,
    tipo: "Estrutural",
    unidade: "g / °",
    estacao: e.codigo,
    ativo: true,
    ultimoValor: e.vibracao,
  },
]);

export const alertas: Alerta[] = [
  {
    id: "al-1",
    tipo: "Possível queda",
    estacao: "CAALA-003",
    valor: "12.4°",
    limite: "5°",
    severidade: "CRITICO",
    data: "09/08/2026 10:32",
    lido: false,
    resolvido: false,
  },
  {
    id: "al-2",
    tipo: "Vibração elevada",
    estacao: "CAALA-007",
    valor: "3.8 g",
    limite: "2.0 g",
    severidade: "ATENCAO",
    data: "09/08/2026 09:15",
    lido: false,
    resolvido: false,
  },
  {
    id: "al-3",
    tipo: "Sobretensão",
    estacao: "CAALA-011",
    valor: "258 V",
    limite: "240 V",
    severidade: "CRITICO",
    data: "09/08/2026 08:47",
    lido: true,
    resolvido: false,
  },
  {
    id: "al-4",
    tipo: "Temperatura alta",
    estacao: "CAALA-015",
    valor: "78 °C",
    limite: "60 °C",
    severidade: "ATENCAO",
    data: "09/08/2026 08:20",
    lido: true,
    resolvido: false,
  },
  {
    id: "al-5",
    tipo: "Sobrecorrente",
    estacao: "CAALA-010",
    valor: "14.2 A",
    limite: "12 A",
    severidade: "CRITICO",
    data: "08/08/2026 22:03",
    lido: true,
    resolvido: true,
  },
  {
    id: "al-6",
    tipo: "Subtensão",
    estacao: "CAALA-004",
    valor: "192 V",
    limite: "200 V",
    severidade: "ATENCAO",
    data: "08/08/2026 19:41",
    lido: true,
    resolvido: true,
  },
  {
    id: "al-7",
    tipo: "Falha de comunicação",
    estacao: "CAALA-004",
    valor: "48 h sem dados",
    limite: "1 h",
    severidade: "CRITICO",
    data: "07/08/2026 06:10",
    lido: true,
    resolvido: false,
  },
];

export const anomalias: Anomalia[] = [
  {
    id: "an-1",
    tipo: "Vibração elevada",
    estacao: "CAALA-007",
    descricao: "Aceleração acima do limite configurado durante 3 leituras seguidas.",
    severidade: "ATENCAO",
    data: "09/08/2026 09:15",
  },
  {
    id: "an-2",
    tipo: "Inclinação anormal",
    estacao: "CAALA-003",
    descricao: "Inclinação de 12.4° detectada pelo IMU — possível deslocamento do poste.",
    severidade: "CRITICO",
    data: "09/08/2026 08:50",
  },
  {
    id: "an-3",
    tipo: "Sobrecorrente",
    estacao: "CAALA-010",
    descricao: "Corrente de 14.2 A acima do limite de 12 A.",
    severidade: "CRITICO",
    data: "09/08/2026 08:12",
  },
  {
    id: "an-4",
    tipo: "Consumo anormal",
    estacao: "CAALA-018",
    descricao: "Consumo 42% acima da média das últimas duas semanas.",
    severidade: "ATENCAO",
    data: "08/08/2026 23:04",
  },
  {
    id: "an-5",
    tipo: "Temperatura elevada",
    estacao: "CAALA-015",
    descricao: "78 °C registados no transformador (limite 60 °C).",
    severidade: "CRITICO",
    data: "08/08/2026 21:30",
  },
];

export const utilizadores: Utilizador[] = [
  {
    id: "u-1",
    nome: "Ana Miguel",
    email: "admin@caala.ao",
    perfil: "admin",
    ativo: true,
    ultimoAcesso: "09/08/2026 10:40",
  },
  {
    id: "u-2",
    nome: "Carlos Tchivinda",
    email: "tecnico@caala.ao",
    perfil: "tecnico",
    ativo: true,
    ultimoAcesso: "09/08/2026 09:12",
  },
  {
    id: "u-3",
    nome: "Joana Kandimba",
    email: "operador@caala.ao",
    perfil: "operador",
    ativo: true,
    ultimoAcesso: "08/08/2026 17:55",
  },
  {
    id: "u-4",
    nome: "Pedro Sanjamba",
    email: "pedro@caala.ao",
    perfil: "tecnico",
    ativo: false,
    ultimoAcesso: "01/08/2026 08:20",
  },
];

export const limitesPadrao = [
  { parametro: "Tensão máxima", valor: 240, unidade: "V" },
  { parametro: "Tensão mínima", valor: 200, unidade: "V" },
  { parametro: "Corrente máxima", valor: 12, unidade: "A" },
  { parametro: "Temperatura máxima", valor: 60, unidade: "°C" },
  { parametro: "Vibração máxima", valor: 2, unidade: "g" },
  { parametro: "Inclinação máxima", valor: 5, unidade: "°" },
];

export function serie24h(base: number, amplitude: number) {
  const r = seedRand(Math.round(base * 100));
  return Array.from({ length: 24 }, (_, h) => ({
    hora: `${String(h).padStart(2, "0")}:00`,
    valor: Number((base + Math.sin(h / 3) * amplitude + (r() - 0.5) * amplitude).toFixed(2)),
  }));
}

export function serieTempoReal(base: number, amplitude: number, pontos = 20) {
  const r = seedRand(Math.round(base * 37));
  return Array.from({ length: pontos }, (_, i) => ({
    hora: `${String(9 + Math.floor(i / 4)).padStart(2, "0")}:${String((i % 4) * 15).padStart(2, "0")}`,
    valor: Number((base + (r() - 0.5) * amplitude * 2).toFixed(2)),
  }));
}

export const resumo = {
  estacoes: estacoes.length,
  online: estacoes.filter((e) => e.estado === "online").length,
  alertasAtivos: alertas.filter((a) => !a.resolvido).length,
  anomaliasHoje: anomalias.filter((a) => a.data.startsWith("09/08")).length,
  tensaoMedia: 221.4,
  correnteMedia: 8.7,
  potenciaMedia: 1.92,
  consumoHoje: 1284,
  consumoOntem: 1102,
  consumoMes: 32481,
  estruturasEmRisco: 2,
};
