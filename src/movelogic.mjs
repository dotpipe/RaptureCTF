// moveLogic.js

const isMoveLegal = (piece, to, board) => {
    switch (piece.type) {
      case 'p': return isPawnMoveLegal(piece, to, board);
      case 'r': return isRookMoveLegal(piece, to, board);
      case 'n': return isKnightMoveLegal(piece, to, board);
      case 'b': return isBishopMoveLegal(piece, to, board);
      case 'f': return isFlagMoveLegal(piece, to, board);
      default: return false;
    }
  };
  
  const isPawnMoveLegal = (piece, to, board) => {
    const direction = piece.color === 'w' ? -1 : 1;
    const from = piece.position;
  
    // Move forward
    if (from.col === to.col && from.row + direction === to.row && !board[to.row][to.col]) {
      return true;
    }
  
    // Initial double move
    if (from.col === to.col && from.row + 2 * direction === to.row && !piece.hasMoved && !board[to.row][to.col]) {
      return true;
    }
  
    // Capture diagonally
    if (Math.abs(from.col - to.col) === 1 && from.row + direction === to.row && board[to.row][to.col] && board[to.row][to.col].color !== piece.color) {
      return true;
    }
  
    return false;
  };
  
  const isRookMoveLegal = (piece, to, board) => {
    const from = piece.position;
  
    // Move along row
    if (from.row === to.row) {
      const minCol = Math.min(from.col, to.col);
      const maxCol = Math.max(from.col, to.col);
      for (let col = minCol + 1; col < maxCol; col++) {
        if (board[from.row][col]) {
          return false;
        }
      }
      return !board[to.row][to.col] || board[to.row][to.col].color !== piece.color;
    }
  
    // Move along column
    if (from.col === to.col) {
      const minRow = Math.min(from.row, to.row);
      const maxRow = Math.max(from.row, to.row);
      for (let row = minRow + 1; row < maxRow; row++) {
        if (board[row][from.col]) {
          return false;
        }
      }
      return !board[to.row][to.col] || board[to.row][to.col].color !== piece.color;
    }
  
    return false;
  };
  
  const isKnightMoveLegal = (piece, to, board) => {
    const from = piece.position;
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
  
    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
      return !board[to.row][to.col] || board[to.row][to.col].color !== piece.color;
    }
  
    return false;
  };
  
  const isBishopMoveLegal = (piece, to, board) => {
    const from = piece.position;
    const rowDiff = Math.abs(from.row - to.row);
    const colDiff = Math.abs(from.col - to.col);
  
    if (rowDiff === colDiff) {
      const rowStep = from.row < to.row ? 1 : -1;
      const colStep = from.col < to.col ? 1 : -1;
  
      for (let i = 1; i < rowDiff; i++) {
        if (board[from.row + i * rowStep][from.col + i * colStep]) {
          return false;
        }
      }
      return !board[to.row][to.col] || board[to.row][to.col].color !== piece.color;
    }
  
    return false;
  };
  
  const isQueenMoveLegal = (piece, to, board) => {
    // Queen combines the move of a rook and bishop
    return isRookMoveLegal(piece, to, board) || isBishopMoveLegal(piece, to, board);
  };
  
  const isFlagMoveLegal = (piece, to, board) => {
    // Flags can only be picked up by the opposition and not move on their own
    return !piece.isPicked && board[to.row][to.col] && board[to.row][to.col].color !== piece.color;
  };
  
  module.exports = { isMoveLegal, isPawnMoveLegal, isRookMoveLegal, isKnightMoveLegal, isBishopMoveLegal, isQueenMoveLegal, isFlagMoveLegal };
  