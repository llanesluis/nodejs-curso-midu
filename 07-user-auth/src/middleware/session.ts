import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../validations/users';
import env from '../config';

type RequestWithSession = Request & { session: { user: User | {} } };

export function getAuthenticatedUser(
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.access_token;
  req.session = { user: {} };

  if (accessToken) {
    const authenticatedUser = jwt.verify(accessToken, env.JWT_SECRET);
    req.session = { user: authenticatedUser };
  }

  next();
}
