import dotenv from 'dotenv';
dotenv.config();

export const {
  PORT = process.env.PORT ?? 3000,
  HASH_SALT_ROUNDS = 10,
  DB_URL = process.env.DB_URL,
  DB_TOKEN = process.env.DB_TOKEN,
} = process.env;
