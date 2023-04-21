import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import firebase from '../Firebase';

const Preferences = ({ navigation }) => {
  const [dietOptions, setDietOptions] = useState({
    GlutenFree: false,
    Ketogenic: false,
    Vegetarian: false,
    LactoVegetarian: false,
    OvoVegetarian: false,
    Vegan: false,
    Pescetarian: false,
    Paleo: false,
    Primal: false,
    LowFODMAP: false,
    Whole30: false,
  });

  const [cuisineOptions, setCuisineOptions] = useState({
    African: false,
    American: false,
    British: false,
    Cajun: false,
    Caribbean: false,
    Chinese: false,
    EasternEuropean: false,
    European: false,
    French: false,
    German: false,
    Greek: false,
    Indian: false,
    Irish: false,
    Italian: false,
    Japanese: false,
    Jewish: false,
    Korean: false,
    LatinAmerican: false,
    Mediterranean: false,
    Mexican: false,
    MiddleEastern: false,
    Nordic: false,
    Southern: false,
    Spanish: false,
    Thai: false,
    Vietnamese: false,
  });

  const handleDietOption = (option) => {
    const updatedOptions = { ...dietOptions };
    for (let key in updatedOptions) {
      if (key === option) {
        updatedOptions[key] = true;
      } else {
        updatedOptions[key] = false;
      }
    }
    setDietOptions(updatedOptions);
  };

  const handleCuisineOption = (option) => {
    const updatedOptions = { ...cuisineOptions };
    if (updatedOptions[option]) {
      updatedOptions[option] = false;
    } else {
      const selectedCount = Object.values(updatedOptions).filter(
        (value) => value === true
      ).length;
      if (selectedCount < 3) {
        updatedOptions[option] = true;
      }
    }
    setCuisineOptions(updatedOptions);
  };

  const handleNext = () => {
    const user = firebase.auth().currentUser;
    const dietSelection = Object.keys(dietOptions).find(
      (key) => dietOptions[key] === true
    );
    const cuisineSelections = Object.keys(cuisineOptions).filter(
      (key) => cuisineOptions[key] === true
    );
    firebase
      .database()
      .ref(`users/${user.uid}/preferences`)
      .set({
        diet: dietSelection,
        cuisines: cuisineSelections,
      })
      .then(() => {
        navigation.navigate('MainTabNavigator');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Choose a diet option:</Text>
      {Object.keys(dietOptions).map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => handleDietOption(option)}
        >
          <Checkbox.Android
            status={dietOptions[option] ? 'checked' : 'unchecked'}
          />
          <Text style={styles.checkboxLabel}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.title}>Choose up to 3 cuisines:</Text>
      {Object.keys(cuisineOptions).map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => handleCuisineOption(option)}
        >
          <Checkbox.Android
            status={cuisineOptions[option] ? 'checked' : 'unchecked'}
          />
          <Text style={styles.checkboxLabel}>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkboxLabel: {
      fontSize: 16,
      marginLeft: 8,
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    }
});


export default Preferences;