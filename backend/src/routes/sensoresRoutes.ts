import { Router } from 'express';
import {
  listarSensores,
  criarSensor,
  atualizarEstadoSensor,
  removerSensor,
} from '../controllers/sensoresController';
import { autenticarToken, autorizarPerfis } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', autenticarToken, listarSensores);
router.post('/', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), criarSensor);

// Ativar/desativar um sensor
router.patch('/:id/estado', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), atualizarEstadoSensor);

// Remover um sensor
router.delete('/:id', autenticarToken, autorizarPerfis('Administrador', 'Técnico'), removerSensor);

export default router;
