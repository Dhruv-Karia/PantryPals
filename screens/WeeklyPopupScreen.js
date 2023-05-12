import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'react-native-elements';

export default function WeeklyPopupScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Skinny Veggie Fried Rice', checked: false },
    { id: 2, title: 'Thai Savory Brown Friend Rice', checked: false },
    { id: 3, title: 'Chinese Scallion Pancakes', checked: false },
    { id: 4, title: 'Chinese Steamed Flan', checked: false },
    { id: 5, title: 'Easy Thai Fried Rice', checked: false },
  ]);

  useEffect(() => {
    // Set up a timer to show the modal every week
    const interval = setInterval(() => {
      setIsModalVisible(true);
    }, 30000); // 604800000 ms = 1 week

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleToggleCheckbox = (id) => {
    const updatedCheckboxes = recipes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, checked: !checkbox.checked };
      } else {
        return checkbox;
      }
    });
    console.log(id);
    setRecipes(updatedCheckboxes);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text style={styles.title}>Weekly Popup</Text>
          <Text>Hey there!</Text>
          <Text>Which recipes did you use this week?</Text>
          <View>
            {recipes.map((checkbox) => (
              <CheckBox
                key={checkbox.id}
                title={checkbox.title}
                checked={checkbox.checked}
                onPress={() => handleToggleCheckbox(checkbox.id)}
              />
            ))}
          </View>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setIsModalVisible(false)}>
            <Text style={{ color: 'blue' }}>submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '90%',
    height: 200,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});
