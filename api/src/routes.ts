import { Router } from 'express';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

const router = Router();
const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

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

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.calculate);

export { router };
