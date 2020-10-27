import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import Mail from '../lib/Mail';
import User from '../models/User';

import crypto from 'crypto'

class ForgotPassword {
  async create(request: Request, response: Response) {

    const userRepository = getRepository(User);
    const email = request.body;


    const user = userRepository.findOne({
      email
    });

    if(!user)
      return response.status(400).json({ error: 'Email not matching with user' })

    // const token = crypto.randomBytes(20).toString('hex')

    // const now = Date.now();



    await Mail.sendMail(
      "Password recovery ✔",
      "Password recovery ✔",
      "<b>Parece  que você solicitou uma recuperação de senha</b>",
      email
    )

    return response.status(200).json({ message: "Forgot password send" })

  }
}

export default new ForgotPassword();
