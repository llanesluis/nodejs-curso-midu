import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../validations/users';
import env from '../config';

export function getAuthenticatedUser(req: Request) {
  const accessToken = req.cookies.access_token;

  let authenticatedUser = {};

  if (accessToken) {
    authenticatedUser = jwt.verify(accessToken, env.JWT_SECRET);
  }

  return authenticatedUser;
}

export function getAccessToken(user: User) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: '1h' });
}
