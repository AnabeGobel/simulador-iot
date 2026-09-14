import mqtt, { MqttClient } from 'mqtt';
import supabase from './supabase';
import { TelemetriaPayload } from '../types/telemetria';
import { avaliarTelemetria } from '../services/deteccaoAnomalias';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.MQTT_HOST || '';
const port = process.env.MQTT_PORT || '8883';
const brokerUrl = `mqtts://${host}:${port}`;

const options: mqtt.IClientOptions = {
  clientId: `backend_node_${Math.random().toString(16).substring(2, 8)}`,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
  rejectUnauthorized: true,
  reconnectPeriod: 5000,
};

console.log('🔄 A ligar ao HiveMQ Cloud...');
export const mqttClient: MqttClient = mqtt.connect(brokerUrl, options);

mqttClient.on('connect', () => {
  console.log('✅ Ligação estabelecida com sucesso ao HiveMQ Cloud!');
  const topico = 'caala/estacoes/+/telemetria';
  mqttClient.subscribe(topico, (err) => {
    if (!err) {
      console.log(`📡 A escutar mensagens MQTT no tópico: ${topico}`);
    } else {
      console.error('❌ Erro ao subscrever o tópico:', err);
    }
  });
});

mqttClient.on('message', async (topic: string, message: Buffer) => {
  try {
    const payload: TelemetriaPayload = JSON.parse(message.toString());
    console.log(`📩 Nova mensagem recebida [${topic}]:`, payload);

    if (!payload.device_id) {
      console.warn('⚠️ Payload ignorado: "device_id" não informado.');
      return;
    }

    // 1. Procura a estação associada a este dispositivo no Supabase
    //    (agora também traz o `id`, necessário para ligar anomalias/alertas).
    const { data: estacao, error: erroEstacao } = await supabase
      .from('estacoes')
      .select('id, codigo')
      .eq('device_id', payload.device_id)
      .single();

    if (erroEstacao || !estacao) {
      console.error(`❌ Nenhuma estação cadastrada para o device_id: ${payload.device_id}`);
      return;
    }

    const codigoEstacao = estacao.codigo;

    // 2. Grava a telemetria com a estação associada
    const { error: erroInsercao } = await supabase.from('telemetria').insert([
      {
        codigo_estacao: codigoEstacao,
        device_id: payload.device_id,
        temperatura: payload.temperatura,
        tensao: payload.tensao,
        corrente: payload.corrente,
        vibracao: payload.vibracao,
        inclinacao: payload.inclinacao,
      },
    ]);

    if (erroInsercao) {
      console.error('❌ Erro ao gravar telemetria no Supabase:', erroInsercao.message);
      return;
    }

    console.log(`💾 Telemetria gravada com sucesso para a estação ${codigoEstacao}!`);

    // 3. Compara a leitura com os limites configurados em /app/configuracoes
    //    e gera anomalias/alertas automaticamente quando ultrapassados.
    await avaliarTelemetria(estacao.id, codigoEstacao, payload);
  } catch (err) {
    const error = err as Error;
    console.error('⚠️ Erro ao processar payload JSON recebido:', error.message);
  }
});

export default mqttClient;
