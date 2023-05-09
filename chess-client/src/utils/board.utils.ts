import { Color, PieceSymbol } from 'chess.js';
import { ChessBoardFlat } from '../common/interfaces';

export const getXYPosition = (i: number, isFlipped = false) => {
  const x = isFlipped ? Math.floor((i % 8) - 7) : i % 8;
  const y = isFlipped ? Math.floor(i / 8) : Math.floor(i / 8) - 7;
  return { x: Math.abs(x), y: Math.abs(y) };
};

export const getSquarePosition = (i: number, isFlipped = false) => {
  const { x, y } = getXYPosition(i, isFlipped);
  const letter = 'abcdefgh'[x];

  return `${letter}${y + 1}`;
};

export const isBlackSquare = (i: number) => {
  const { x, y } = getXYPosition(i);
  return (x + y) % 2 === 0;
};

export const getPiecePosition = (board: ChessBoardFlat, piece: { type: PieceSymbol, color: Color }, isFlipped = false) => {
  let position = null;
  board.forEach((p, i) => {
    if (p !== null && p.type === piece.type && p.color === piece.color) {
      position = getSquarePosition(i, isFlipped);
    }
  });
  return position;
};
