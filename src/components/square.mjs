import React from 'react';

const pieceSymbols = {
  'pw': '♙',
  'rw': '♖',
  'nw': '♘',
  'bw': '♗',
  'qw': '♕',
  'kw': '♔',
  'pb': '♟',
  'rb': '♜',
  'nb': '♞',
  'bb': '♝',
  'qb': '♛',
  'kb': '♚',
  'fw': '⚑', // Use a unique symbol for the flag
  'fb': '⚐', // Use a unique symbol for the flag
};

const Square = ({ piece, isSelected, onClick }) => {
  const className = `square ${isSelected ? 'selected' : ''} ${((piece && piece.color === 'w') ? 'white' : 'black')}`;
  const symbol = piece ? pieceSymbols[`${piece.type}${piece.color}`] : '';

  return (
    <button className={className} onClick={onClick}>
      <span className="piece">{symbol}</span>
    </button>
  );
};

export default Square;
