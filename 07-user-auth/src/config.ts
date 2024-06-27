import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// export const {
//   PORT = process.env.PORT ?? 3000,
//   HASH_SALT_ROUNDS = 10,
//   DB_URL = process.env.DB_URL,
//   DB_TOKEN = process.env.DB_TOKEN,
//   JWT_SECRET = process.env.JWT_SECRET,
// } = process.env;

const EnvSchema = z.object({
  PORT: z.coerce.number().min(1000),
  JWT_SECRET: z.string().min(1),
  HASH_SALT_ROUNDS: z.coerce.number().default(10),
  DB_URL: z.string().url(),
  DB_TOKEN: z.string().min(1),
});

const env = EnvSchema.parse(process.env);
export default env;
