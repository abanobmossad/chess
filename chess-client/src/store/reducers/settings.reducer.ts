import { createReducer } from '@reduxjs/toolkit';
import { defaultsDeep } from 'lodash';
import Cookies from 'js-cookie';
import { setBoardSettings } from '../actions/settings.actions';
import { SETTINGS } from '../../common/interfaces';


let initialState: SETTINGS = {
  board: {
    blackColor: 'gray',
    whiteColor: 'aliceblue',
    moveHighlightColor: '#F2F202',
    arrowColor: '#e17055',
    allowArrows: false,
    playSounds: true,
    allowAnimation: false,
    showLegalMoves: false,
    piecesSchema: 'bases',
    boardThemeName: 'gray',
  },
};

const cookieSettings = Cookies.get('settings');
if (!cookieSettings) Cookies.set('settings', JSON.stringify(initialState) );
else initialState = JSON.parse(cookieSettings);

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setBoardSettings, (state, action) => {
      state.board = defaultsDeep(action.payload.settings, state.board);
      Cookies.set('settings', JSON.stringify(state) );
    });
});