import { Request, Response } from 'express';
import supabase from '../config/supabase';

export const criarEstacao = async (req: Request, res: Response) => {
  try {
    const {
      codigo,
      nome,
      descricao,
      estado,
      provincia,
      municipio,
      comuna,
      latitude,
      longitude,
      descricao_local,
      device_id,
      dev_eui,
      gateway,
      tecnologia,
      intervalo_transmissao,
      frequencia_coleta,
      observacoes
    } = req.body;

    const latitudeNumerica = Number(latitude);
    const longitudeNumerica = Number(longitude);

    if (
      latitude == null ||
      longitude == null ||
      String(latitude).trim() === '' ||
      String(longitude).trim() === '' ||
      !Number.isFinite(latitudeNumerica) ||
      !Number.isFinite(longitudeNumerica) ||
      latitudeNumerica < -90 ||
      latitudeNumerica > 90 ||
      longitudeNumerica < -180 ||
      longitudeNumerica > 180
    ) {
      return res.status(400).json({
        error: 'Latitude e longitude válidas são obrigatórias para cadastrar uma estação.',
      });
    }

    const { data, error } = await supabase
      .from('estacoes')
      .insert([{
        codigo,
        nome,
        descricao,
        estado,
        provincia,
        municipio,
        comuna,
        latitude: latitudeNumerica,
        longitude: longitudeNumerica,
        descricao_local,
        device_id,
        dev_eui,
        gateway,
        tecnologia,
        intervalo_transmissao,
        frequencia_coleta,
        observacoes
      }])
      .select();

    if (error) return res.status(400).json({ error: error.message });

    return res.status(201).json({ mensagem: 'Estação criada com sucesso!', data: data[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao criar estação.' });
  }
};

// Uma estação é considerada "online" se recebeu telemetria nos últimos
// MINUTOS_PARA_OFFLINE minutos. Ajusta conforme o intervalo real de envio
// dos teus dispositivos (ex: se enviam a cada 5 min, sobe este valor).
const MINUTOS_PARA_OFFLINE = 15;

export const listarEstacoes = async (_req: Request, res: Response) => {
  try {
    const { data: estacoes, error } = await supabase
      .from('estacoes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    if (!estacoes || estacoes.length === 0) return res.status(200).json([]);

    // Para cada estação, busca a leitura de telemetria mais recente e se
    // existe algum alerta por resolver — isto é o que dá o estado
    // "em tempo real" (online / atenção / crítico / offline) mostrado no
    // Dashboard, em Estações e em Monitoramento.
    const estacoesComEstado = await Promise.all(
      estacoes.map(async (e) => {
        const [{ data: ultimaTelemetria }, { data: alertasAtivos }] = await Promise.all([
          supabase
            .from('telemetria')
            .select('*')
            .eq('codigo_estacao', e.codigo)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(),
          supabase
            .from('alertas')
            .select('severidade')
            .eq('estacao_id', e.id)
            .eq('resolvido', false),
        ]);

        const comunicouRecentemente =
          !!ultimaTelemetria &&
          Date.now() - new Date(ultimaTelemetria.created_at).getTime() < MINUTOS_PARA_OFFLINE * 60 * 1000;

        let estadoTempoReal: 'ok' | 'alerta' | 'perigo' | 'offline';
        if (!comunicouRecentemente) {
          estadoTempoReal = 'offline';
        } else if (alertasAtivos?.some((a) => a.severidade === 'CRITICO')) {
          estadoTempoReal = 'perigo';
        } else if (alertasAtivos?.some((a) => a.severidade === 'ATENCAO')) {
          estadoTempoReal = 'alerta';
        } else {
          estadoTempoReal = 'ok';
        }

        return {
          ...e,
          ultima_telemetria: ultimaTelemetria ?? null,
          estado_tempo_real: estadoTempoReal,
        };
      })
    );

    return res.status(200).json(estacoesComEstado);
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao listar estações.' });
  }
};

// Ativa/desativa uma estação. Uma estação "Inativa" passa a não aceitar
// mais telemetria — ver processarEMultarTelemetria em telemetriaController.ts,
// que verifica este mesmo campo `estado` antes de gravar qualquer leitura.
export const atualizarEstadoEstacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ativa } = req.body;

    if (typeof ativa !== 'boolean') {
      return res.status(400).json({ error: 'O campo "ativa" (true ou false) é obrigatório.' });
    }

    const { data, error } = await supabase
      .from('estacoes')
      .update({ estado: ativa ? 'Ativa' : 'Inativa' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: 'Erro ao atualizar estado da estação.', detalhe: error.message });
    }

    return res.status(200).json({ mensagem: 'Estado da estação atualizado com sucesso!', data });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao atualizar estado da estação.' });
  }
};

// Remove definitivamente uma estação.
// Nota: sensores.estacao_id tem ON DELETE CASCADE para estacoes(id), por
// isso remover uma estação também remove automaticamente os sensores
// associados a ela.
export const removerEstacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('estacoes').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: 'Erro ao remover estação.', detalhe: error.message });
    }

    return res.status(200).json({ mensagem: 'Estação removida com sucesso!' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao remover estação.' });
  }
};
