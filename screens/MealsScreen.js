import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import firebase from '../Firebase';
import RecipeCard from './RecipeCard';

const MealsScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const searchRecipes = () => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=10&apiKey=54f02b231f7d4dd48e5573927c3d0edd`)
      .then(response => {
        setRecipes(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const user = firebase.auth().currentUser;
  const preferencesRef = firebase.database().ref(`users/${user.uid}/preferences`);

  preferencesRef.once('value', (snapshot) => {
    const preferencesData = snapshot.val();
    const { cuisines, diet } = preferencesData;
    const cuisineS = cuisines[0];
    const dietS = diet;

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=54f02b231f7d4dd48e5573927c3d0edd&diet=${dietS}&cuisine=${cuisineS}`)
      .then(response => {
        setRecipes(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleRecipeDeselect = () => {
    setSelectedRecipe(null);
  };

  return (
    <ScrollView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchRecipes}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {selectedRecipe ?
        <RecipeCard recipe={selectedRecipe} onDeselect={handleRecipeDeselect} /> :
        <View style={styles.container}>
          {recipes.map(recipe => (
            <TouchableOpacity key={recipe.id} style={styles.box} onPress={() => handleRecipeSelect(recipe)}>
              <Image style={styles.image} source={{ uri: recipe.image }} />
              <Text style={styles.title}>{recipe.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
    backgroundColor: '#009688',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  box: {
    width: '45%',
    height: 200,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#009688',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MealsScreen;