import { createReducer } from '@reduxjs/toolkit';
import { gameMoveAction } from '../actions/game.actions';
import { Chess } from 'chess.js';

const chess = new Chess();
const moveSound = new Audio('sounds/move.mp3');
const captureSound = new Audio('sounds/capture.mp3');

const initialState = {
  chess,
  board: chess.board(),
  activePiece: { from: '', to: '', piece: '' },
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(gameMoveAction, (state, action) => {
      try {
        const legalMove = chess.move({ from: action.payload.from, to: action.payload.to });
        if (legalMove.captured) captureSound.play();
        else moveSound.play();

        state.board = chess.board();
        state.activePiece = { from: action.payload.from, to: action.payload.to, piece: legalMove.piece };
      } catch (e) {
        console.log('ILLEGAL MOVE');
      }
    });
});