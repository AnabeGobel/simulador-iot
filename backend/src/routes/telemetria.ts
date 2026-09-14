import { Router } from 'express';
import { listarTelemetriaPorEstacao, listarTelemetriaRecente } from '../controllers/telemetriaController';
import { autenticarToken } from '../middlewares/authMiddleware';

const router = Router();

// Protege as rotas com o middleware de autenticação JWT
// GET /api/telemetria/estacao/:codigo
router.get('/estacao/:codigo', autenticarToken, listarTelemetriaPorEstacao);

// GET /api/telemetria/recente
router.get('/recente', autenticarToken, listarTelemetriaRecente);

export default router;