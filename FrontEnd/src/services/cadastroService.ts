import api from './api';

// Interfaces para tipagem no TypeScript
export interface NovoUsuario {
  nome_completo: string;
  email: string;
  telefone?: string;
  username: string;
  password?: string;
  perfil: 'Administrador' | 'Técnico' | 'Operador';
}

export interface NovaEstacao {
  codigo: string;          // Ex: CAALA-001
  nome: string;            // Ex: Estação Caála Centro
  descricao?: string;
  provincia?: string;
  municipio?: string;
  latitude?: number;
  longitude?: number;
  device_id: string;       // Ex: ESP32-LORA-001
  frequencia_coleta?: number;
}

export interface NovoSensor {
  codigo: string;          // Ex: SEN-001
  nome: string;            // Ex: Sensor de Temperatura Transformador 1
  tipo: string;            // Temperatura, Tensão, Corrente, Vibração, Inclinação
  unidade: string;         // °C, V, A, m/s²
  valor_minimo?: number;
  valor_maximo?: number;
  limite_critico?: number;
  estacao_id: string;      // ID da estação associada (Chave Estrangeira)
}

// 1. Serviço para Registar Utilizadores
export const cadastrarUsuario = async (dados: NovoUsuario) => {
  // Chama a rota de registo protegida por perfil Administrador
  const response = await api.post('/auth/registrar', dados);
  return response.data;
};

// 2. Serviço para Registar Estações IoT
export const cadastrarEstacao = async (dados: NovaEstacao) => {
  const response = await api.post('/estacoes', dados);
  return response.data;
};

// 3. Serviço para Listar Estações (Útil para preencher a seleção no formulário de sensores)
export const listarEstacoes = async () => {
  const response = await api.get('/estacoes');
  return response.data;
};

// 4. Serviço para Registar Sensores
export const cadastrarSensor = async (dados: NovoSensor) => {
  const response = await api.post('/sensores', dados);
  return response.data;
};