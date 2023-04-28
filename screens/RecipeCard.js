import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';

const RecipeCard = ({ recipe, visible, onClose }) => {
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    // Fetch recipe details (ingredients and steps) when the modal is opened
    if (visible) {
      fetchRecipeDetails();
    }
  }, [visible]);

  const fetchRecipeDetails = async () => {
    try {
        console.log(recipe.id);
      const response = await fetch(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions?apiKey=a9a05452a82e41d5ba2af024868d5a12`);
      const data = await response.json();
      const instructions = data[0].steps.map(step => step.step);
      setSteps(instructions);
      setIngredients(recipe.extendedIngredients);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.map(ingredient => (
            <View key={ingredient.id} style={styles.ingredient}>
              <Text style={styles.ingredientText}>{ingredient.original}</Text>
            </View>
          ))}
          <Text style={styles.sectionTitle}>Steps</Text>
          {steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  ingredient: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 14,
    marginLeft: 5,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RecipeCard;
