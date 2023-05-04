import { Square, Color, PieceSymbol, Chess } from 'chess.js';
export type ChessBoard = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][];

export type ChessBoardFlat = ({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[];

export interface GameState {
  gameId: string,
  board: ChessBoardFlat,
  chess: Chess,
  activePiece: { from: string, to: string, piece: string },
  playAs: string,
  // current user name (could be viewer)
  userId: string,
  userName?: string,
  // players
  opponentId?: string,
  creatorId?: string,
  // players names
  displayedNameTop: string,
  displayedNameBottom: string,

  isTheCreator: boolean,
  currentTurn: string,

  isLoaded: boolean,
  isViewer: boolean,

  history?: string[][],
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


export interface SocketGameMoveEvent {
  from: string,
  to: string,
  position: string,
  gameId: string,
  activePiece: GameState['activePiece'],
  board: ChessBoardFlat,
}