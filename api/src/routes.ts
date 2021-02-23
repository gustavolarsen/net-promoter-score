import { Router } from 'express';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();

/**
 * GET => Buscar
 * POST => Incluir
 * PUT => Alterar
 * DELETE => Apagar
 * PATCH => Alteração específica
 */

//cria usuario
router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

export { router };
