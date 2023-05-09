import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { gameReducer, settingsReducer } from './reducers';

const store = configureStore({
  reducer: { game: gameReducer, settings: settingsReducer },
  middleware: [thunk],
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;