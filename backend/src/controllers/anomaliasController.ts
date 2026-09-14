import { Request, Response } from 'express';
import supabase from '../config/supabase';

// Ver nota em alertasController.ts — sem FK real entre estacao_id e
// estacoes.id, por isso o "join" é feito aqui manualmente.
async function anexarEstacoes<T extends { estacao_id: string | null }>(linhas: T[]) {
  if (linhas.length === 0) return linhas.map((l) => ({ ...l, estacao_codigo: null, estacao_nome: null }));

  const { data: estacoes } = await supabase.from('estacoes').select('id, codigo, nome');
  const mapa = new Map((estacoes ?? []).map((e) => [String(e.id), e]));

  return linhas.map((linha) => {
    const estacao = linha.estacao_id != null ? mapa.get(String(linha.estacao_id)) : undefined;
    return {
      ...linha,
      estacao_codigo: estacao?.codigo ?? null,
      estacao_nome: estacao?.nome ?? null,
    };
  });
}

// Listar todas as anomalias registadas
export const listarAnomalias = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('anomalias')
      .select('*')
      .order('data_ocorrencia', { ascending: false });

    if (error) {
      return res.status(500).json({ erro: 'Erro ao buscar anomalias.', detalhe: error.message });
    }

    const comEstacao = await anexarEstacoes(data ?? []);
    return res.json(comEstacao);
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};

// Registar nova anomalia manualmente por um Técnico/Admin
export const criarAnomalia = async (req: Request, res: Response) => {
  const { tipo, descricao, severidade, estacao_id } = req.body;

  if (!tipo || !descricao || !estacao_id) {
    return res.status(400).json({ erro: 'Os campos tipo, descricao e estacao_id são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase
      .from('anomalias')
      .insert([
        {
          tipo,
          descricao,
          severidade: severidade || 'ATENCAO',
          estacao_id,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ erro: 'Erro ao criar anomalia.', detalhe: error.message });
    }

    return res.status(201).json({ mensagem: 'Anomalia registada com sucesso!', anomalia: data });
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};
