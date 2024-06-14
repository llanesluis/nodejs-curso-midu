import express from 'express';
import logger from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

import dotenv from 'dotenv';
import { db } from '../database';
dotenv.config();

const PORT = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {
    maxDisconnectionDuration: 3600,
  },
});

db.execute(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    username TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

io.on('connection', async (socket) => {
  const username = socket.handshake.auth.username;
  const serverOffset = socket.handshake.auth.serverOffset ?? 0;

  console.log(`A user has connected! -> ${username}`);

  socket.on('disconnect', () => {
    console.log(`A user has disconnected! -> ${username}`);
  });

  //El servidor escucha el evento "chat message" enviado desde el cliente
  socket.on('chat message', async ({ msg, username }) => {
    console.log(`Message recieved: ${msg} -> ${username}`);

    //Guardar el mensaje en la base de datos
    let result;
    try {
      result = await db.execute({
        sql: `INSERT INTO messages (content, username) VALUES (:content, :username)`,
        args: {
          content: msg,
          username: username,
        },
      });
    } catch (error) {
      console.error(error);
      return;
    }

    const serverOffset = result.lastInsertRowid?.toString();

    let lastMessage;
    try {
      const results = await db.execute({
        sql: `SELECT * FROM messages WHERE id = ?`,
        args: [serverOffset as string],
      });

      lastMessage = results.rows[0];
      console.log(lastMessage);
    } catch (error) {
      console.error(error);
      return;
    }

    const time = lastMessage.createdAt ?? '2024-12-12 00:00:00';

    const data = { msg, serverOffset, username, time };

    io.emit('chat message', data);
  });

  //En caso de que el cliente no se pueda recuperar
  //y por tanto no le carguen los nuevos mensajes
  //haremos un SELECT para recuperar los mensajes
  if (!socket.recovered) {
    try {
      const results = await db.execute({
        sql: `SELECT * FROM messages WHERE id > ?`,
        args: [serverOffset],
      });

      //Por cada registro se emite un evento
      //para que el cliente lo escuche y agregue el mensaje
      results.rows.forEach((row) => {
        const msg = row.content;
        const serverOffset = row.id?.toString();
        const username = row.username;
        const time = row.createdAt;

        const data = { msg, serverOffset, username, time };

        socket.emit('chat message', data);
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/client/index.html`);
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
