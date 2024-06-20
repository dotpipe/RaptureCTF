// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Use hashing for production
});

module.exports = mongoose.model('User', userSchema);

// models/Game.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  board: { type: Array, required: true },
  turn: { type: String, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
