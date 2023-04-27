import { Square, Color, PieceSymbol, Chess } from 'chess.js';
export type ChessBoard = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];


export interface GameState {
  board: ChessBoard,
  chess: Chess,
  activePiece: { from: string, to: string, piece: string },
  capturedWhitePieces: {
    type: PieceSymbol;
    symbol: string
  }[],
  capturedBlackPieces: {
    type: PieceSymbol;
    symbol: string
  }[]
}

export interface ThemeState {
  board: { black: string, white: string, moveHighlight: string, arrow: string },
}

export interface SETTINGS {
  game: { allowArrows: boolean }
}