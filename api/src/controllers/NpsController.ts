import { getCustomRepository, Not, IsNull } from 'typeorm';
import { Request, Response } from 'express';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NpsController {
  async calculate(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUsers = await surveyUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveyUsers.filter((survey) => survey.value <= 6).length;
    const promoters = surveyUsers.filter((survey) => survey.value >= 9).length;

    const totalAnswers = surveyUsers.length;

    const nps = ((promoters - detractors) / totalAnswers) * 100;

    return res.status(200).json({
      detractors: detractors,
      promoters: promoters,
      totalAnswers: totalAnswers,
      result: `${nps}%`,
    });
  }
}

export { NpsController };
