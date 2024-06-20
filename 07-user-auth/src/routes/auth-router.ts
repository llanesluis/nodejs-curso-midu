import { Router } from 'express';
import { UserSchema } from '../validations/users';
// @ts-ignore
import { UserRepository } from '../db/db-local/user-repository.js';
import { getAccessToken, getAuthenticatedUser } from '../utils/jwt';

const authRouter = Router();

authRouter.get('/', (req, res, next) => {
  try {
    const authenticatedUser = getAuthenticatedUser(req);

    res.render('../src/views/info', authenticatedUser);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const accessToken = getAccessToken(user);

    res
      .cookie('access_token', accessToken, {
        httpOnly: true, // only accessible by the web server, not JavaScript
        secure: process.env.NODE_ENV === 'production', // only sent over HTTPS
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1 hour
      })
      .json(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/signup', async (req, res, next) => {
  const results = UserSchema.safeParse(req.body);

  if (!results.success) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const { username, email, password, role } = results.data;

  const user = {
    username,
    email,
    password,
    role,
  };

  try {
    const result = await UserRepository.createUser(user);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/logout', (req, res, next) => {
  try {
    res.clearCookie('access_token').json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
