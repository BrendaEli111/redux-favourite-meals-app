import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./FavoritesSlice";

export const store = configureStore({
  reducer: {
    favoriteMeals: favoriteReducer,
  },
});
