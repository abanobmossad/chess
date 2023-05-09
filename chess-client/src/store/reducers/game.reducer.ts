import { createReducer } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import Cookies from 'js-cookie';
import { Chess } from 'chess.js';
import { gameMoveAction, joinGameAction, joinedToGameAction, leaveGameAction, loadGameAction, startGameAction } from '../actions/game.actions';
import { ChessBoard, GameState, SocketGameMoveEvent } from '../../common/interfaces';
import { CHESS_SYMBOLS } from '../../common/constants';
import { GameSocket } from '../../server';
import { GameSocketEvents } from '../../common/events.enum';

const chess = new Chess();
const moveSound = new Audio('/sounds/move.mp3');
const captureSound = new Audio('/sounds/capture.mp3');
const joinSound = new Audio('/sounds/join.mp3');
const leaveSound = new Audio('/sounds/leave.mp3');

// set user ID
const userIdCookie = Cookies.get('userId');
const userId = userIdCookie || nanoid();
if (!userIdCookie) Cookies.set('userId', userId);

const initialState: GameState = {
  gameId: '',
  chess,
  board: chess.board().flat(),
  activePiece: { from: '', to: '', piece: '' },
  capturedWhitePieces: [],
  capturedBlackPieces: [],
  playAs: 'w',
  currentTurn: 'w',
  displayedNameTop: '',
  displayedNameBottom: '',
  userId,
  isTheCreator: false,
  isViewer: true,
  isLoaded: false,
};

const getGameBoardWithFlip = (board: ChessBoard, flipped = false) => {
  return flipped ? board.flat().reverse() : board.flat();
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameMoveAction, (state, action) => {
      const { payload } = action;
      if (payload.from === state.activePiece.from && payload.to === state.activePiece.to) return;

      try {
        const legalMove = chess.move({ from: payload.from, to: payload.to });

        if (legalMove.captured) {
          const captured = { symbol: CHESS_SYMBOLS[`${legalMove.color}${legalMove.piece}`], type: legalMove.piece };
          if (legalMove.color === 'w') state.capturedWhitePieces.push(captured);
          state.capturedBlackPieces.push(captured);

          captureSound.play();
        } else moveSound.play();

        state.board = getGameBoardWithFlip(chess.board(), state.playAs === 'b');
        state.activePiece = { from: payload.from, to: payload.to, piece: legalMove.piece };
        state.currentTurn = chess.turn();
        // update server game state
        GameSocket.emit(GameSocketEvents.PlayMove, {
          from: payload.from,
          to: payload.to,
          position: chess.fen(),
          gameId: state.gameId,
          activePiece: state.activePiece,
          board: state.board,
          currentTurn: chess.turn(),
        } as SocketGameMoveEvent);
      } catch (e) {
        console.log('ILLEGAL MOVE');
      }
    })
    .addCase(startGameAction.fulfilled, (state, action) => {
      const { payload } = action;
      state.gameId = payload._id;
      state.creatorId = payload.creatorId;
      state.displayedNameBottom = payload.creatorName;
      state.userName = payload.creatorName;
      Cookies.set('userName', payload.creatorName);

      state.playAs = payload.creatorPlayAs;
      state.currentTurn = chess.turn();
      state.history = payload.history;
      state.isTheCreator = true;
      state.board = chess.board().flat();
      state.isLoaded = true;
    })
    .addCase(loadGameAction.fulfilled, (state, action) => {
      const { payload } = action;
      chess.load(payload.position);

      const isTheCreator = payload.creatorId === state.userId;
      state.gameId = payload._id;
      state.creatorId = payload.creatorId;
      state.opponentId = payload.opponentId;
      state.userName = Cookies.get('userName');

      state.playAs = isTheCreator ? payload.creatorPlayAs : (payload.creatorPlayAs === 'w' ? 'b' : 'w');
      state.currentTurn = payload.currentTurn;
      state.history = payload.history;
      state.activePiece = payload.activePiece;
      state.isTheCreator = isTheCreator;
      state.board = getGameBoardWithFlip(chess.board(), state.playAs === 'b');
      state.isLoaded = true;
    })
    .addCase(joinGameAction, (state, action) => {
      const { payload } = action;

      GameSocket.emit(GameSocketEvents.JOIN_GAME, {
        gameId: state.gameId,
        userId: state.userId,
        userName: payload.userName,
      });
      state.userName = payload.userName;
      Cookies.set('userName', payload.userName);
    })
    .addCase(joinedToGameAction, (state, action) => {
      const { payload } = action;

      state.isViewer = state.userId !== payload.game.opponentId && state.userId !== payload.game.creatorId;
      if (!state.isViewer) {
        state.displayedNameBottom = state.userId === payload.game.creatorId ? payload.game.creatorName : payload.game.opponentName;
        state.displayedNameTop = state.userId === payload.game.creatorId ? payload.game.opponentName : payload.game.creatorName;
      } else {
        state.displayedNameBottom = payload.game.creatorName;
        state.displayedNameTop = payload.game.opponentName;
        // set the view to be the white
        state.playAs = 'w';
      }

      if (payload.userId !== state.userId) joinSound.play();
    })
    .addCase(leaveGameAction, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { payload } = action;
      if (payload.isOpponentLeft) {
        state.displayedNameTop = '';
        state.opponentId = '';
      }
      if (payload.userId !== state.userId) leaveSound.play();
    });
});