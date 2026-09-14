import { Router } from 'express';
import { listarAlertas, marcarComoLido, resolverAlerta } from '../controllers/alertasController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

// Todos os utilizadores autenticados podem ver os alertas
router.get('/', autenticarToken, listarAlertas);

// Marcar alerta como lido
router.patch('/:id/lido', autenticarToken, marcarComoLido);

// Apenas Administradores e Técnicos podem resolver um alerta
router.patch('/:id/resolver', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), resolverAlerta);

export default router;