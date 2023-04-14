import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function WasteScreen() {
  return (
    <View style={styles.container}>
      <Text>Waste Screen</Text>
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
