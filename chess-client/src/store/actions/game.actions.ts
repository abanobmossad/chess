import { createAction } from '@reduxjs/toolkit';

export const gameMoveAction = createAction('GAME_MOVE', function (from: string, to: string) {
  return {
    payload: {
      from,
      to,
    },
  };
});