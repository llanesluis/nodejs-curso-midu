import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import { errorMiddleware, notFoundMiddleware } from './middleware/error-handler';
import authRouter from './routes/auth-router';
import usersRouter from './routes/user-router';
import protectedRouter from './routes/protected-router';

export default function createApp() {
  const app = express();

  app.set('view engine', 'ejs');
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/auth', authRouter);
  app.use('/users', usersRouter);
  app.use('/protected', protectedRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
