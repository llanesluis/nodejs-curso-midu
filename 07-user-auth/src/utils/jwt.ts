import { Request } from 'express';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';
import { User } from '../validations/users';

export function getAuthenticatedUser(req: Request) {
  const accessToken = req.cookies.access_token;

  let authenticatedUser = {};

  if (accessToken) {
    authenticatedUser = jwt.verify(accessToken, JWT_SECRET!);
  }

  return authenticatedUser;
}

export function getAccessToken(user: User) {
  return jwt.sign(user, JWT_SECRET!, { expiresIn: '1h' });
}
