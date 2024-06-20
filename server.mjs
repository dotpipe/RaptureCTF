import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialBoard, handleMove } from './src/game.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let board = [...initialBoard]; // Keep board state on server

io.on('connection', (socket) => {
  socket.emit('board', board); // Send initial board state to the client

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('move', (from, to) => {
    const newBoard = handleMove(board, from, to);
    if (newBoard) {
      board = newBoard; // Update server-side board state
      io.emit('board', board); // Broadcast the new board state to all clients
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
