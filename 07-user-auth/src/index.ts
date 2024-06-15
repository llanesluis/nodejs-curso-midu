import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';

dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hola mundo');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
