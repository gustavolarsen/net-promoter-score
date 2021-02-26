import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUsersRepository = getCustomRepository(SurveyUserRepository);

    const surveyUserExists = await surveyUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUserExists) {
      return res.status(400).json({ error: 'Survey User not found.' });
    }

    surveyUserExists.value = Number(value);

    await surveyUsersRepository.save(surveyUserExists);

    return res.status(200).json({ success: 'Answer registered successfully.' });
  }
}

export { AnswerController };
