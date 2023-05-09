import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../server';

export const gameMoveAction = createAction('GAME_MOVE', function (from: string, to: string) {
  return {
    payload: {
      from,
      to,
    },
  };
});

interface StartGameProps {
  creatorId: string,
  creatorName: string,
  creatorPlayAs: string,
  time: string
}

export const startGameAction = createAsyncThunk('START_GAME', async function (props: StartGameProps) {
  const { data } = await API.post('/game', props);
  return data;
});

export const loadGameAction = createAsyncThunk('LOAD_GAME', async function (gameId: string) {
  const { data } = await API.get(`game/${gameId}`);
  return data;
});

export const joinGameAction = createAction('JOIN_GAME', function (userName: string) {
  return {
    payload: { userName },
  };
});

export const leaveGameAction = createAction('LEAVE_GAME', function (userId: string, userName: string, isOpponentLeft: boolean) {
  return {
    payload: { userId, userName, isOpponentLeft },
  };
});

export const joinedToGameAction = createAction('JOINED_GAME', function (userId: string, userName: string, game: any) {
  return {
    payload: { userId, userName, game },
  };
});