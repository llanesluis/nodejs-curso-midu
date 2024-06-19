import { Router } from 'express';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';

const protectedRouter = Router();

protectedRouter.get('/', (req, res, next) => {
  try {
    const token = req.cookies.token;
    let loggedUser = {};

    if (token) {
      loggedUser = jwt.verify(token, JWT_SECRET!);
    }

    res.render('../src/views/protected', loggedUser!);
  } catch (error) {
    next(error);
  }
});

export default protectedRouter;
