import { createReducer } from '@reduxjs/toolkit';
import { changeBoardColors } from '../actions/theme.actions';
import { ThemeState } from '../../common/interfaces';

const initialState: ThemeState = {
  board: { black: 'gray', white: 'aliceblue', moveHighlight: '#F2F202', arrow: '#F2F202' },
};

export const themeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeBoardColors, (state, action) => {
      state.board = action.payload;
    });
});