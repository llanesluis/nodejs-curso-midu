import { z } from 'zod';

const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['user, admin']),
});

export type User = z.infer<typeof UserSchema>;
