import { Router } from 'express';
import { gerarRelatorio } from '../controllers/relatoriosController';
import { autenticarToken } from '../middlewares/authMiddleware';

const router = Router();

// Protegida: precisa de sessão iniciada para saber quem gerou o relatório
// (nome/contato do emissor vêm do utilizador autenticado).
router.get('/gerar', autenticarToken, gerarRelatorio);

export default router;
