import { Router } from 'express';
import { listarAnomalias, criarAnomalia } from '../controllers/anomaliasController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', autenticarToken, listarAnomalias);
router.post('/', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), criarAnomalia);

export default router;