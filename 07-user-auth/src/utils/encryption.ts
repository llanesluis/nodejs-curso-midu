import bcrypt from 'bcrypt';
import env from '../config';

interface EncryptPassword {
  password: string;
  salt_rounds?: number;
}
export async function encryptPassword({
  password,
  salt_rounds = Number(env.HASH_SALT_ROUNDS),
}: EncryptPassword) {
  const hashedPassword = await bcrypt.hash(password, salt_rounds);
  return hashedPassword;
}

export async function comparePassword({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return bcrypt.compare(password, hashedPassword);
}
