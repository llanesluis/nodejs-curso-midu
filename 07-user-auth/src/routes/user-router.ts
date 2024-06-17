import { Router } from 'express';
import { createUser, getAllUsers } from '../db/libsql/users';

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const result = await getAllUsers();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  //todo: zod
  const { username, email, password, role } = req.body;

  try {
    const result = await createUser({ username, email, password, role });
    res.send(result);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
