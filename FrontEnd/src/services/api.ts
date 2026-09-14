import axios from 'axios';
import { supabase } from '../lib/supabaseClient';

// URL base do backend Express.
// Se o projeto usa Vite (mais comum com TanStack Router), a variável certa
// é VITE_API_URL, não NEXT_PUBLIC_API_URL. Mantemos os dois por segurança.
const API_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) ||
  (typeof process !== 'undefined' && (process as any).env?.NEXT_PUBLIC_API_URL) ||
  'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let renovacaoEmAndamento: Promise<string | null> | null = null;

async function renovarToken(): Promise<string | null> {
  if (!renovacaoEmAndamento) {
    const refreshToken = localStorage.getItem('@iot_caala:refresh_token');
    if (!refreshToken) return null;

    renovacaoEmAndamento = supabase.auth
      .refreshSession({ refresh_token: refreshToken })
      .then(({ data, error }) => {
        if (error || !data.session) return null;

        localStorage.setItem('@iot_caala:token', data.session.access_token);
        if (data.session.refresh_token) {
          localStorage.setItem('@iot_caala:refresh_token', data.session.refresh_token);
        }
        return data.session.access_token;
      })
      .finally(() => {
        renovacaoEmAndamento = null;
      });
  }

  return renovacaoEmAndamento;
}

// Interceptor para injetar o Token JWT automaticamente em cada chamada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@iot_caala:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratar sessão expirada (Erro 401/403)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as (typeof error.config & { _tokenRetry?: boolean }) | undefined;

    if (error.response?.status === 401 && config && !config._tokenRetry) {
      config._tokenRetry = true;
      const token = await renovarToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return api.request(config);
      }

      localStorage.removeItem('@iot_caala:token');
      localStorage.removeItem('@iot_caala:refresh_token');
      localStorage.removeItem('@iot_caala:usuario');
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.replace('/login');
      }
    }

    return Promise.reject(error);
  }
);

// Servico de consulta de telemetria existente
export const obterTelemetriaEstacao = async (codigo: string, limit = 50) => {
  const resposta = await api.get(`/telemetria/estacao/${codigo}?limit=${limit}`);
  return resposta.data;
};

// ==========================================
// SERVIÇOS ADICIONADOS PARA OS RELATÓRIOS
// ==========================================

// 1. Obter lista de estações para o <select>
export const obterEstacoes = async () => {
  const resposta = await api.get('/estacoes');
  return resposta.data;
};

// 2. Obter consolidação e agregados dos relatórios
export const obterDadosRelatorio = async (params: {
  estacao: string;
  dataInicio: string;
  dataFim: string;
}) => {
  const resposta = await api.get('/relatorios/gerar', { params });
  return resposta.data;
};

// export default para os ficheiros que importam `api` como default
export default api;