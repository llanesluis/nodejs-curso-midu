import express from 'express';
import morgan from 'morgan';
import { PORT } from './config';
import { errorMiddleware, notFoundMiddleware } from './middleware/error-handler';
import authRouter from './routes/auth-router';
import usersRouter from './routes/user-router';

export default function createApp() {
  const app = express();

  app.use(morgan('dev'));
  app.use(express.json());

  // todo: routes
  app.use('/auth', authRouter);
  app.use('/users', usersRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
