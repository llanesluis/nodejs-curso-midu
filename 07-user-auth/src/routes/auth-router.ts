import { Router } from 'express';
import { UserSchema } from '../validations/users';
// @ts-ignore
import { UserRepository } from '../db/db-local/user-repository.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const authRouter = Router();

authRouter.get('/', (req, res, next) => {
  try {
    const token = req.cookies.token;
    let loggedUser = {};

    if (token) {
      loggedUser = jwt.verify(token, JWT_SECRET!);
    }

    res.render('../src/views/info', loggedUser);
  } catch (error) {
    next(error);
  }
});

authRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });

    const token = jwt.sign(user, JWT_SECRET!, { expiresIn: '1h' });

    res.cookie('token', token).json(user);
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
    res.clearCookie('token');

    res.send('logout endpoint');
  } catch (error) {
    next(error);
  }
});

export default authRouter;
