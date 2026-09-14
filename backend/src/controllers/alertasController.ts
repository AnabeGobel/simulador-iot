import { Request, Response } from 'express';
import supabase from '../config/supabase';

// Junta manualmente o código/nome da estação a cada alerta.
// Não usamos o embed automático do Supabase (`estacoes(codigo, nome)`)
// porque isso exige uma foreign key real entre alertas.estacao_id e
// estacoes.id — e estacao_id foi criada como TEXT solto, sem essa FK.
// Fazendo o "join" aqui evita depender dessa relação.
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

// Listar todos os alertas
export const listarAlertas = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('alertas')
      .select('*')
      .order('data_ocorrencia', { ascending: false });

    if (error) {
      return res.status(500).json({ erro: 'Erro ao listar alertas.', detalhe: error.message });
    }

    const comEstacao = await anexarEstacoes(data ?? []);
    return res.json(comEstacao);
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};

// Marcar alerta como lido
export const marcarComoLido = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('alertas')
      .update({ lido: true })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ erro: 'Erro ao atualizar alerta.', detalhe: error.message });
    }

    return res.json({ mensagem: 'Alerta marcado como lido.', alerta: data });
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};

// Marcar alerta como resolvido
export const resolverAlerta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuarioId = req.usuario?.id; // Obtido via authMiddleware

  try {
    const { data, error } = await supabase
      .from('alertas')
      .update({
        resolvido: true,
        lido: true,
        resolvido_por: usuarioId,
        data_resolucao: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ erro: 'Erro ao resolver alerta.', detalhe: error.message });
    }

    return res.json({ mensagem: 'Alerta resolvido com sucesso!', alerta: data });
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};
