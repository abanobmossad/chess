import { createReducer } from '@reduxjs/toolkit';
import { defaultsDeep } from 'lodash';
import { settSettings } from '../actions/settings.actions';
import { SETTINGS } from '../../common/interfaces';

const initialState: SETTINGS = {
  game: { allowArrows: false },
};

export const settingsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(settSettings, (state, action) => {
      state = defaultsDeep(action.payload.settings, state);
    });
});