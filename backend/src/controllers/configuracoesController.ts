// backend/src/controllers/configuracoesController.ts
import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getLimites = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('limites')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erro Supabase GET limites:', error);
      return res.status(500).json({ erro: 'Erro ao consultar limites.', detalhe: error.message });
    }

    return res.status(200).json(data);
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno do servidor.', detalhe: err.message });
  }
};

export const atualizarLimites = async (req: Request, res: Response) => {
  try {
    const limites = req.body;

    if (!Array.isArray(limites)) {
      return res.status(400).json({ erro: 'O corpo da requisição deve ser um array.' });
    }

    // Mapeamento dos campos para sincronizar no Supabase
    const payload = limites.map((item: any) => ({
      parametro: item.parametro,
      valor_minimo: item.valor_minimo !== null && item.valor_minimo !== undefined ? Number(item.valor_minimo) : null,
      valor_maximo: item.valor_maximo !== null && item.valor_maximo !== undefined ? Number(item.valor_maximo) : null,
    }));

    // Executa o UPSERT baseado no campo unico 'parametro'
    const { data, error } = await supabase
      .from('limites')
      .upsert(payload, { onConflict: 'parametro' })
      .select();

    if (error) {
      console.error('Erro Supabase PUT limites:', error);
      return res.status(500).json({ erro: 'Erro ao guardar limites no banco de dados.', detalhe: error.message });
    }

    return res.status(200).json({ mensagem: 'Limites atualizados com sucesso!', data });
  } catch (err: any) {
    return res.status(500).json({ erro: 'Erro interno no servidor.', detalhe: err.message });
  }
};