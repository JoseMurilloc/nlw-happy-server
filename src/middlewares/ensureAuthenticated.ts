import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth';
import { Request, Response, NextFunction } from 'express'

interface TokenPayload {
  provider: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Token invalid' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    return response.status(401).json({ error: 'Token Invalid' })
  }
}
