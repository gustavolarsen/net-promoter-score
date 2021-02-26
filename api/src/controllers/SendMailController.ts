import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async sendMail(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const userExists = await userRepository.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    const surveyExists = await surveyRepository.findOne({ id: survey_id });

    if (!surveyExists) {
      return res.status(400).json({ error: 'Survey not found' });
    }

    //verifica se ja existe a pesquisa não respondida para o usuario
    const surveyUserExists = await surveyUserRepository.findOne({
      where: {
        user_id: userExists.id,
        survey_id: surveyExists.id,
        value: null,
      },
      relations: ['user', 'survey'],
    });

    //busca template do email da pesquisa
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    //variaveis que serão substituidas no corpo do email
    const mailVariables = {
      name: userExists.name,
      title: surveyExists.title,
      description: surveyExists.description,
      id: '',
      link: process.env.URL_MAIL_SURVEY,
    };

    //envia por email a mesma pesquisa
    if (surveyUserExists) {
      mailVariables.id = surveyUserExists.id;

      await SendMailService.execute(
        userExists.email,
        surveyExists.title,
        mailVariables,
        npsPath
      );
      return res.status(200).json({ success: 'Survey sent successfully.' });
    }

    //caso nao exista uma pesquisa não respondida pelo usario
    //cria a o relacionamento e evia por email
    const newSurveyUser = surveyUserRepository.create({
      user_id: userExists.id,
      survey_id: surveyExists.id,
    });

    await surveyUserRepository.save(newSurveyUser);

    mailVariables.id = newSurveyUser.id;

    await SendMailService.execute(
      userExists.email,
      surveyExists.title,
      mailVariables,
      npsPath
    );
    return res
      .status(200)
      .json({ success: 'Survey created and sent successfully.' });
  }
}

export { SendMailController };
