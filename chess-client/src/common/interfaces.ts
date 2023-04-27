import { Square, Color, PieceSymbol } from 'chess.js';

export type ChessBoard = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];


export interface ThemeState {
  board: { black: string, white: string, moveHighlight: string, arrow: string },
}

export interface SETTINGS {
  game: { allowArrows: boolean }
}