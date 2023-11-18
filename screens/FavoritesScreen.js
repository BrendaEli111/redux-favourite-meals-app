import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from 'react-redux';

import MealList from "../components/MealList/MealList";
import { MEALS } from "../data/dummy-data";

function FavoritesScreen({ favoriteMeals }) {
  const favoriteMealsId = favoriteMeals.favoriteIds;
  const favoriteMealsList = MEALS.filter((meal) =>
    favoriteMealsId.includes(meal.id)
  );

  if (favoriteMealsList.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealList items={favoriteMealsList} />;
}

const mapStateToProps = (state) => {
  return {
    favoriteMeals: state.favoriteMeals,
  };
};

export default connect(mapStateToProps)(FavoritesScreen);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
