import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import crypto from 'crypto';

class SessionController {
  async create(request: Request, response: Response) {
    const userRepository = getRepository(User)

    const { email, password } = request.body;

    const user = await userRepository.findOne({
      where: {
        email
      }
    })

    if (!user) {
      return response.status(400).json({ error: 'password or email dont match, try again' })
    }

    const passwordMath = await compare(password, user.password)

    if (!passwordMath) {
      return response.status(400).json({ error: 'password or email dont match, try again' })
    }

    const { id } = user;

    const token = sign({}, 'authConfig.secret', {
      subject: String(id),
      expiresIn: '1d'
    })

    delete user.password;

    return response.json({
      user,
      token
    })
  }

  async forgot(request: Request, response: Response) {

    try {
      const { email } = request.body;

      const userRepository = getRepository(User);

      const user = await userRepository.find({
        email
      })

      if (!user) return response.status(400).json({ error: 'User not found' });


      const token = crypto.randomBytes(20).toString('hex')


      return response.json({ message: 'Hello' })
    } catch(err) {
      console.error(err);
    }
  }
}

export default new SessionController();
