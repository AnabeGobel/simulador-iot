import { Router } from 'express';
import { listarUsuarios, atualizarPerfilUsuario, alterarSenha, removerUsuario } from '../controllers/usuariosController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', autenticarToken, autorizarPerfis('Administrador'), listarUsuarios);

// IMPORTANTE: esta rota tem de vir ANTES de '/:id' — senão o Express
// interpreta "alterar-senha" como um valor de :id e nunca chega aqui.
// Alterar a própria palavra-passe — qualquer utilizador autenticado, não
// só o Administrador.
router.patch('/alterar-senha', autenticarToken, alterarSenha);

router.patch('/:id', autenticarToken, autorizarPerfis('Administrador'), atualizarPerfilUsuario);
router.delete('/:id', autenticarToken, autorizarPerfis('Administrador'), removerUsuario);

export default router;
