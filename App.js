import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchRecipes = () => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=10&apiKey=YOUR_API_KEY`)
      .then(response => {
        setRecipes(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios.get('https://api.spoonacular.com/recipes/random?number=10&apiKey=YOUR_API_KEY')
      .then(response => {
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
      <View style={styles.container}>
        {recipes.map(recipe => (
          <View key={recipe.id} style={styles.box}>
            <Image style={styles.image} source={{ uri: recipe.image }} />
            <Text style={styles.title}>{recipe.title}</Text>
          </View>
        ))}
      </View>
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
});

export default App;
