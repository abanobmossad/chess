import { createAction } from '@reduxjs/toolkit';
import { SETTINGS } from '../../common/interfaces';

export const settSettings = createAction('SET_SETTINGS', function (settings: Partial<SETTINGS>) {
  return {
    payload: { settings },
  };
});