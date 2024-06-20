import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { User } from '../validations/users';

type RequestWithSession = Request & { session: { user: User | {} } };

export function getAuthenticatedUser(
  req: RequestWithSession,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.access_token;
  req.session = { user: {} };

  if (accessToken) {
    const authenticatedUser = jwt.verify(accessToken, JWT_SECRET!);
    req.session = { user: authenticatedUser };
  }

  next();
}
