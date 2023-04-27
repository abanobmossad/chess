import { Color, PieceSymbol } from 'chess.js';
import { ChessBoard } from '../common/interfaces';


export const getXYPosition = (i: number) => {
  const x = i % 8;
  const y = Math.abs(Math.floor(i / 8) - 7);
  return { x, y };
};

export const isBlackSquare = (i: number) => {
  const { x, y } = getXYPosition(i);
  return (x + y) % 2 === 1;
};

export const getSquarePosition = (i: number) => {
  const { x, y } = getXYPosition(i);
  const letter = 'abcdefgh'[x];

  return `${letter}${y + 1}`;
};

export const getPiecePosition = (board: ChessBoard, piece: { type: PieceSymbol, color: Color }) => {
  let position = null;
  board.flat()
    .forEach((p, i) => {
      if (p !== null && p.type === piece.type && p.color === piece.color) {
        const row = 'abcdefgh'[i % 8];
        const column = Math.ceil((64 - i) / 8);
        position = row + column;
      }
    });
  return position;
};
