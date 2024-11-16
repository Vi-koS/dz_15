// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../src/components/slice/PostSlice';
import favoritesReducer from '../src/components/slice/FavoritesSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
