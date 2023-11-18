import { useContext, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
//import { useDispatch, useSelector } from 'react-redux';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
//import { FavoritesContext } from '../store/context/FavoritesContext';
import { addFavorite, removeFavorite } from '../store/redux/FavoritesSlice';
import { connect } from 'react-redux';

function MealDetailScreen({ route, navigation, favoriteMeals, addFavorite, removeFavorite }) {
  //const favoriteMealIds = useSelector((state) => state.favoriteMeals.favoriteIds);
  //const dispatch = useDispatch();
  //const favoriteMeals = useContext(FavoritesContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  //const mealIsFavorite = favoriteMealIds.includes(mealId);
  const mealIsFavorite = favoriteMeals.favoriteIds.includes(mealId);

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      removeFavorite(mealId);
      //dispatch(removeFavorite({ id: mealId }));
    } else {
      addFavorite(mealId);
      //dispatch(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
          icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [navigation, mealIsFavorite, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}
const mapStateToProps = (state) => {
  return {
    favoriteMeals: state.favoriteMeals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (mealId) => dispatch(addFavorite({ id: mealId })),
    removeFavorite: (mealId) => dispatch(removeFavorite({ id: mealId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetailScreen);


const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
