import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Módulo MQTT
import './config/mqtt';

// Rotas existentes
import authRoutes from './routes/authRoutes';
import usuariosRoutes from './routes/usuariosRoutes';
import estacoesRoutes from './routes/estacoesRoutes';
import sensoresRoutes from './routes/sensoresRoutes';

// Novas Rotas
import alertasRoutes from './routes/alertasRoutes';
import anomaliasRoutes from './routes/anomaliasRoutes';
import telemetriaRoutes from './routes/telemetria';
import configuracoesRoutes from './routes/configuracoesRoutes';
import relatoriosRoutes from './routes/relatorios'; // <-- 1. Importação da rota de relatórios adicionada

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Registar endpoints
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/estacoes', estacoesRoutes);
app.use('/api/sensores', sensoresRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/anomalias', anomaliasRoutes);
app.use('/api/telemetria', telemetriaRoutes);
app.use('/api/configuracoes', configuracoesRoutes);
app.use('/api/relatorios', relatoriosRoutes); // <-- 2. Endpoint de relatórios registrado aqui

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', sistema: 'IoT Energia Caála', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Backend a rodar na porta ${PORT}`);
});