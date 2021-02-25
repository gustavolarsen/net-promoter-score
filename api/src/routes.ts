import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

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

router.post('/sendMail', sendMailController.sendMail);

export { router };
