import { Router } from 'express';
import { login, registar } from '../controllers/authController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

// Rota pública: qualquer utilizador pode tentar fazer login.
router.post('/login', login);

// Rota protegida: só um Administrador com sessão iniciada pode registar
// novas contas. Sistema privado — não existe autorregisto por ninguém.
router.post('/registrar', autenticarToken, autorizarPerfis('Administrador'), registar);

export default router;
