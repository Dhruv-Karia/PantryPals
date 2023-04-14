import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WasteScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Food Waste Report</Text>
      <View style={styles.box}>
        <Text>D3 or react native svg chart library</Text>
      </View>
      <Text style={styles.subtitle}>Resources</Text>
      <View style={styles.box}>

      </View>
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
