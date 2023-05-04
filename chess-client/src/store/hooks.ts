import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '.';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;