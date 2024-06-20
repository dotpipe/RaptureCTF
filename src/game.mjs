export const initialBoard = [
  ['R', 'N', 'B', 'F', 'Q', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'f', 'q', 'b', 'n', 'r'],
];

const isValidMove = (board, from, to) => {
  const piece = board[from];
  if (!piece) return false;
  
  // Add move validation logic for each piece type
  switch (piece.type) {
    case 'pawn':
      return isValidPawnMove(board, from, to);
    case 'rook':
      return isValidRookMove(board, from, to);
    case 'knight':
      return isValidKnightMove(board, from, to);
    case 'bishop':
      return isValidBishopMove(board, from, to);
    case 'queen':
      return isValidQueenMove(board, from, to);
    case 'king':
      return isValidKingMove(board, from, to);
    default:
      return false;
  }
};

export const handleMove = (board, from, to) => {
  if (!isValidMove(board, from, to)) {
    return null; // Invalid move
  }

  const newBoard = [...board];
  newBoard[to] = newBoard[from];
  newBoard[from] = null;
  return newBoard;
};