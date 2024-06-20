import React, { useState } from 'react';
import Board from './board.jsx';
import { initialBoard, handleMove } from './game.mjs';

const App = () => {
  const [board, setBoard] = useState(initialBoard);

  const onMove = (from, to) => {
    try {
      const newBoard = handleMove(board, from, to);
      if (newBoard) {
        setBoard(newBoard);
      } else {
        console.log("Invalid move");
      }
    } catch (error) {
      console.error("Error handling move:", error);
    }
  };

  return (
    <div>
      <Board board={board} onMove={onMove} />
    </div>
  );
};

export default App;
