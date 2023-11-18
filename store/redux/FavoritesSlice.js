import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteIds: [],
  },
  reducers: {
    addFavorite(state, action) {
      state.favoriteIds.push(action.payload.id);
    },
    removeFavorite(state, action) {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload.id
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
