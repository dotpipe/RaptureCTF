// gameLogic.js
import mongoose from 'mongoose';
const Game = require('./models/game.jsx');
const Board = require('./board.mjs');
import { isMoveLegal } from './src/movelogic.mjs';

let boardInstance = new Board();

const initialBoard = async () => {
  boardInstance = new Board();
  return boardInstance.getBoardState();
};

const handleMove = async (gameId, move) => {
  const game = await Game.findById(gameId);
  if (!game) throw new Error('Game not found');

  const { from, to } = move;
  const piece = boardInstance.getPieceAtPosition(from);

  if (piece && isMoveLegal(piece, to, boardInstance.getBoardState())) {
    // Handle flag pickup and drop logic
    if (piece.isFlag) {
      if (!piece.isPicked) {
        boardInstance.pickUpFlag(piece.color);
      } else {
        boardInstance.dropFlag(piece.color);
      }
    }

    // Perform move
    boardInstance.movePiece(from, to);

    // Update game state
    game.board = boardInstance.getBoardState();
    game.turn = game.turn === 'w' ? 'b' : 'w';
    await game.save();
  }

  return game.board;
};

module.exports = { initialBoard, handleMove };
