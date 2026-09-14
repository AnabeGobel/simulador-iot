import { Router } from 'express';
import { criarEstacao, listarEstacoes, atualizarEstadoEstacao, removerEstacao } from '../controllers/estacoesController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

// Quem não fizer login não pode ver nem criar estações.
router.get('/', autenticarToken, listarEstacoes);
router.post('/', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), criarEstacao);
router.patch('/:id/estado', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), atualizarEstadoEstacao);
router.delete('/:id', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), removerEstacao);

export default router;
