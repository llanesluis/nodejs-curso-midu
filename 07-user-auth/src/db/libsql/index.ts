import { createClient } from '@libsql/client';
import { DB_TOKEN, DB_URL } from '../../config';

export const db = createClient({ url: DB_URL!, authToken: DB_TOKEN });
