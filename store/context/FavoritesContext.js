import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  favoriteIds: [],
  addFavorite: (favoriteId) => {},
  removeFavorite: (favoriteId) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite(favoriteId) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, favoriteId]);
  }

  function removeFavorite(favoriteId) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== favoriteId)
    );
  }

  const value = {
    favoriteIds: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
