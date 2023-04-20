import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ItemScreen(item) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      

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
    width: '45%',
    height: 200,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  }
});