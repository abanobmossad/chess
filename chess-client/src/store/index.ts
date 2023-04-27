import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { gameReducer, settingsReducer, themeReducer } from './reducers';

const store = configureStore({
  reducer: { game: gameReducer, theme: themeReducer, settings: settingsReducer },
  middleware: [thunk],
  devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;