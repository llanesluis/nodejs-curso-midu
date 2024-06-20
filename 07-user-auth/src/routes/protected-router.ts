import { Router } from 'express';
import { getAuthenticatedUser } from '../utils/jwt';

const protectedRouter = Router();

protectedRouter.get('/', (req, res, next) => {
  try {
    const authenticatedUser = getAuthenticatedUser(req);

    res.render('../src/views/protected', authenticatedUser);
  } catch (error) {
    next(error);
  }
});

export default protectedRouter;
