import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await getCustomRepository(UserRepository).find();

    return res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getCustomRepository(UserRepository);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const newUser = userRepository.create({
      name,
      email,
    });

    await userRepository.save(newUser);

    return res.status(201).json({ success: 'User created.' });
  }
}

export { UserController };
