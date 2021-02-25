import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();

/**
 * GET => Buscar
 * POST => Incluir
 * PUT => Alterar
 * DELETE => Apagar
 * PATCH => Alteração específica
 */

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);

router.get('/surveys', surveyController.getSurveys);
router.post('/surveys', surveyController.createSurvey);

export { router };
