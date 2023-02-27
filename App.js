import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('https://api.spoonacular.com/recipes/random?number=10&apiKey=a9a05452a82e41d5ba2af024868d5a12')
      .then(response => {
        setRecipes(response.data.recipes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView>
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
