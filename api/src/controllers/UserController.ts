import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await getRepository(User).find();

    return res.status(200).json(users);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getRepository(User);

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

    return res.status(200).json({ success: 'User created.' });
  }
}

export { UserController };
