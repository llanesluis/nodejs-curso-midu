import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', (req, res) => {
  res.send('auth router');
});
authRouter.post('/login', (req, res) => {
  res.send('login endpoint');
});
authRouter.post('/signup', (req, res) => {
  res.send('signup endpoint');
});
authRouter.post('/logout', (req, res) => {
  res.send('logout endpoint');
});

export default authRouter;
