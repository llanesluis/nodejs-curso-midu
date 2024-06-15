import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
