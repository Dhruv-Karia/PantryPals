import React, { useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import { pantryContent } from '../data/products.js';

export default function PantryScreen() {
  const [pantry, setPantry] = useState(pantryContent);
  
  return (
    <ScrollView style={styles.container}>
      <Text>Pantry Screen</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Pantry</Text>
          {pantry.map(item => (
            <Card>
              <Card.Title style={styles.paragraph}>{item.name}</Card.Title>
              <Card.Divider/>
              <Card.Image source={item.img} />
              <Button icon={<Icon name='code' color='#ffffff' />} buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} title='VIEW NOW' />
            </Card>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
