import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import firebase from '../Firebase';

const RecipeItem = ({ recipe, onSelect }) => {
  const [select, setSelect] = useState(false);

  const onPress = () => {
    setSelect(!select);
    onSelect(recipe.id, !select);
  };

  return (
    <View key={recipe.id} style={styles.box}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={{ uri: recipe.image }} />
        <Text style={styles.title}>{recipe.title}</Text>
      </TouchableOpacity>
      {select && (
        <View style={styles.plusButton}>
          <Text style={styles.plusButtonText}>+</Text>
        </View>
      )}
    </View>
  );
};

const MealsScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = firebase.auth().currentUser;
      const preferencesRef = firebase.database().ref(`users/${user.uid}/preferences`);

      preferencesRef.once('value', (snapshot) => {
        const preferencesData = snapshot.val();
        if (preferencesData) {
          const { cuisines, diet } = preferencesData;
          const cuisineS = cuisines[0];
          const dietS = diet;

          axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=61409bc29a88436882fe11bf76ad7155&diet=${dietS}&cuisine=${cuisineS}`)
            .then(response => {
              setRecipes(response.data.results);
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    };

    fetchRecipes();
  }, []);

  const onSelectRecipe = (recipeId, select) => {
    if (select) {
      setSelectedRecipes([...selectedRecipes, recipeId]);
    } else {
      setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
    }
  };

  const handleDoneButtonPress = () => {
    const user = firebase.auth().currentUser;
    //console.log(selectedRecipes);
    firebase
    .database()
    .ref(`users/${user.uid}/plan`)
    .set({
      recipes: selectedRecipes
    })
    .then(() => {
      navigation.navigate('GroceryList');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const searchRecipes = () => {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&number=10&apiKey=61409bc29a88436882fe11bf76ad7155`)
      .then(response => {
        setRecipes(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
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
      <View style={styles.container}>
        {recipes.map(recipe => (
          <View key={recipe.id} style={styles.box}>
            <Image style={styles.image} source={{ uri: recipe.image }} />
            <Text style={styles.title}>{recipe.title}</Text>
            <TouchableOpacity
              style={styles.plusButton}
              onPress={() => {
                if (selectedRecipes.length < 5) {
                  const newSelectedRecipes = [...selectedRecipes, recipe];
                  setSelectedRecipes(newSelectedRecipes);
                }
              }}
            >
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      {selectedRecipes.length === 5 && (
        <TouchableOpacity style={styles.doneButton} onPress={handleDoneButtonPress}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      )}
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
  plusButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 150, 136, 0.7)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  plusIcon: {
    color: '#fff',
    fontSize: 24,
  },
  doneButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});



export default MealsScreen;