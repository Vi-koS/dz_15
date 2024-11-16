// favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface FavoritesState {
  favoriteIds: string[];
}

const initialState: FavoritesState = {
  favoriteIds: JSON.parse(localStorage.getItem('favoriteIds') || '[]'), // Загружаем избранные ID из localStorage
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter((favId) => favId !== id);
      } else {
        state.favoriteIds.push(id);
      }
      localStorage.setItem('favoriteIds', JSON.stringify(state.favoriteIds)); // Сохраняем изменения в localStorage
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites.favoriteIds;
export default favoritesSlice.reducer;
