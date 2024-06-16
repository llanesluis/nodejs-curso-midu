import dotenv from 'dotenv';
dotenv.config();

export const { PORT = process.env.PORT ?? 3000, HASH_SALT_ROUNDS = 10 } = process.env;
