import { Router } from 'express';
import { getLimites, atualizarLimites } from '../controllers/configuracoesController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

router.get('/limites', autenticarToken, getLimites);
router.put('/limites', autenticarToken, autorizarPerfis('Administrador'), atualizarLimites);

export default router;
