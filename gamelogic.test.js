// gameLogic.test.js
const { expect } = require('chai');
const { initialBoard, handleMove } = require('./gamelogic.mjs');
const mongoose = require('mongoose');
const Game = require('./models/game.jsx');

describe('Game Logic', () => {
  before(async () => {
    await mongoose.connect('mongodb://localhost:27017/chess_capture_flag_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Game.deleteMany({});
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should initialize the board', async () => {
    const board = await initialBoard();
    expect(board).to.be.an('array');
    expect(board.length).to.equal(8);
  });

  it('should handle a valid move', async () => {
    const game = new Game({ board: initialBoard(), turn: 'w' });
    await game.save();
    const move = { from: 'e2', to: 'e4' };
    const updatedBoard = await handleMove(game.id, move);
    expect(updatedBoard).to.be.an('array');
  });
});
