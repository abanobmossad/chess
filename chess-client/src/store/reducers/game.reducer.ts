import { createReducer } from '@reduxjs/toolkit';
import { gameMoveAction } from '../actions/game.actions';
import { Chess } from 'chess.js';
import { GameState } from '../../common/interfaces';
import { CHESS_SYMBOLS } from '../../common/constants';

const chess = new Chess();
const moveSound = new Audio('sounds/move.mp3');
const captureSound = new Audio('sounds/capture.mp3');

const initialState: GameState = {
  chess,
  board: chess.board(),
  activePiece: { from: '', to: '', piece: '' },
  capturedWhitePieces: [],
  capturedBlackPieces: [],
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameMoveAction, (state, action) => {
      try {
        const legalMove = chess.move({ from: action.payload.from, to: action.payload.to });

        if (legalMove.captured) {
          const captured = { symbol: CHESS_SYMBOLS[`${legalMove.color}${legalMove.piece}`], type: legalMove.piece };
          if (legalMove.color === 'w') state.capturedWhitePieces.push(captured);
          state.capturedBlackPieces.push(captured);

          captureSound.play();
        } else moveSound.play();

        state.board = chess.board();
        state.activePiece = { from: action.payload.from, to: action.payload.to, piece: legalMove.piece };
      } catch (e) {
        console.log('ILLEGAL MOVE');
      }
    });
});