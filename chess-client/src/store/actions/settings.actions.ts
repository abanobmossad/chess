import { createAction } from '@reduxjs/toolkit';
import { SETTINGS } from '../../common/interfaces';

export const setBoardSettings = createAction('SET_BOARD_SETTINGS', function (settings: Partial<SETTINGS['board']>) {
  console.log('⚠️ ➜ setBoardSettings ➜ settings:', settings);
  return {
    payload: { settings },
  };
});
