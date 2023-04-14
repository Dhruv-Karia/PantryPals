import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PantryScreen() {
  return (
    <View style={styles.container}>
      <Text>Pantry Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
