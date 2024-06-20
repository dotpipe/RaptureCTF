import React, { useState } from 'react';
import Square from './src/components/square.mjs';

const Board = ({ board, onMove }) => {
  const [selectedSquare, setSelectedSquare] = useState(null);

  const handleSquareClick = (row, col) => {
    if (selectedSquare) {
      onMove(selectedSquare, { row, col });
      setSelectedSquare(null);
    } else {
      setSelectedSquare({ row, col });
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => (
            <Square
              key={colIndex}
              piece={square}
              isSelected={selectedSquare && selectedSquare.row === rowIndex && selectedSquare.col === colIndex}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
