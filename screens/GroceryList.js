import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, CheckBox } from 'react-native';
import { Checkbox } from 'react-native-paper';
import firebase from '../Firebase';
import axios from 'axios';

const GroceryList = ({ navigation }) => {
  const [recipeData, setRecipeData] = useState([]);
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = firebase.auth().currentUser;
      const recipeRef = firebase.database().ref(`users/${user.uid}/plan`);

      recipeRef.once('value', async (snapshot) => {
        const recipes = snapshot.val()?.recipes ?? [];

        const recipeDataWithIngredients = await Promise.all(
          recipes.map(async (recipe) => {
            const { id, title } = recipe;
            const url = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=61409bc29a88436882fe11bf76ad7155`;
            const { data } = await axios.get(url);

            const ingredients = data.ingredients.map((ingredient) => {
              const { name, amount, unit } = ingredient;
              return {
                name,
                amount: amount.metric.value,
                unit: amount.metric.unit,
              };
            });

            return {
              id,
              title,
              ingredients,
            };
          })
        );

        setRecipeData(recipeDataWithIngredients);
      });
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const newList = [];

    recipeData.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const existingIngredient = newList.find(
          (item) => item.name.toLowerCase() === ingredient.name.toLowerCase()
        );
        if (existingIngredient) {
          existingIngredient.amount += ingredient.amount;
        } else {
          newList.push({ ...ingredient });
        }
      });
    });

    setGroceryList(newList);
  }, [recipeData]);

  const handleCheckboxChange = (index) => {
    const newList = [...groceryList];
    newList[index].checked = !newList[index].checked;
    setGroceryList(newList);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Grocery List</Text>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Ingredients</Text>
        <TouchableOpacity style={styles.clearButton} onPress={() => setGroceryList([])}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {groceryList.map((ingredient, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <Checkbox
            value={ingredient.checked}
            onValueChange={() => handleCheckboxChange(index)}
            style={styles.checkbox}
          />
          <Text style={styles.ingredient}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('MainTabNavigator')}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    subTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
    },
    clearButton: {
      backgroundColor: '#CCCCCC',
      borderRadius: 4,
      padding: 8,
    },
    clearButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    ingredientContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    checkbox: {
      marginRight: 8,
    },
    ingredient: {
      fontSize: 16,
      marginBottom: 4,
    },
    doneButton: {
      backgroundColor: '#2196F3',
      borderRadius: 4,
      padding: 16,
      marginTop: 16,
      alignItems: 'center',
    },
    doneButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });
  
  
  export default GroceryList;