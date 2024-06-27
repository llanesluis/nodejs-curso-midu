import { createClient } from '@libsql/client';
import env from '../../config';

export const db = createClient({ url: env.DB_URL, authToken: env.DB_TOKEN });
