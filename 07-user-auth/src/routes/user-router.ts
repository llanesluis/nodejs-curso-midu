import { Router } from 'express';
import { UserSchema } from '../validations/users';
// @ts-ignore
import { UserRepository } from '../db/db-local/user-repository.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const result = UserRepository.getAllUsers();
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:username', (req, res, next) => {
  const username = req.params.username;
  try {
    const result = UserRepository.getUserByUsername(username);
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  const results = UserSchema.safeParse(req.body);
  if (!results.success) {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const { username, email, password, role } = results.data;

  try {
    const result = await UserRepository.createUser({ username, email, password, role });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
