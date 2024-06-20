import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../public/styles.css';

const Board = ({ board, onMove }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (row, col) => {
    if (selectedCell) {
      onMove(selectedCell, { row, col });
      setSelectedCell(null);
    } else {
      setSelectedCell({ row, col });
    }
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`board-cell ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onMove: PropTypes.func.isRequired,
};

export default Board;
