import { db } from '.';
import { User } from '../../validations/users';

export function createUsersTable() {
  try {
    db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT,
    role TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);
  } catch (error) {
    throw new Error('could not create users table');
  }
}

export async function createUser(input: User) {
  const { username, email, password, role } = input;

  //Checar que no exista el usuario
  const userExists = await db.execute({
    sql: `SELECT username FROM users WHERE email = ?`,
    args: [email],
  });
  if (userExists.rows[0]) {
    throw new Error('user already exist');
  }

  //Crear el usuario
  try {
    const results = await db.execute({
      sql: `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
      args: [username, email, password, role],
    });

    const userId = results.lastInsertRowid;

    const userResults = await db.execute({
      sql: `SELECT id, username, role FROM users WHERE id = ?`,
      args: [userId!],
    });

    const user = userResults.rows[0];
    return user;
  } catch (error) {
    throw new Error('could not create the user');
  }
}

export async function getAllUsers() {
  try {
    const results = await db.execute({ sql: `SELECT id, username, role FROM users`, args: [] });
    const users = results.rows.map((user) => {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
      };
    });
    return users;
  } catch (error) {
    throw new Error('could not fetch users');
  }
}
