import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import User from '../models/User';
import * as Yup from 'yup';

import bcrypt from 'bcrypt';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required('Nome é oobrigatório'),
      email: Yup.string().email().required('Email é obrigatório'),
      password: Yup.string().min(6, 'A senha precisa ter pelo menos 6 dígitos')
    });

    await schema.validate({ name, email, password }, {
      abortEarly: false,
    })

    const userRepository = getRepository(User);

    const passwordHash = await bcrypt.hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passwordHash
    });

    await userRepository.save(user);

    return response.status(201).json({ user })
  }
}

export default new UserController();
