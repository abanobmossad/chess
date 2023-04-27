import { createAction } from '@reduxjs/toolkit';
import { ThemeState } from '../../common/interfaces';

export const changeBoardColors = createAction('SET_THEME_BOARD_COLORS', function (props: ThemeState['board']) {
  return {
    payload: props,
  };
});