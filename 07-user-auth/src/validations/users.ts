import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user', 'admin']),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
