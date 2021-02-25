import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
  async createSurvey(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const newSurvey = surveyRepository.create({
      title,
      description,
    });

    await surveyRepository.save(newSurvey);

    return res.status(201).json({ success: 'Survey created.' });
  }

  async getSurveys(req: Request, res: Response) {
    const allSurveys = await getCustomRepository(SurveyRepository).find();

    return res.status(200).json(allSurveys);
  }
}

export { SurveyController };
