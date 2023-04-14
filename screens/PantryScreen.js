import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Text, View, Image } from 'react-native';
import { pantryContent } from '../data/products.js';

export default function PantryScreen() {
  const [pantry, setPantry] = useState(pantryContent);

  return (
    <ScrollView>
      <Text>Pantry Screen</Text>
      <View style={styles.container}>
        <Text style={styles.title}>Pantry</Text>
          {pantry.map(item => (
            // <Card>
            //   <Card.Title style={styles.paragraph}>{item.name}</Card.Title>
            //   <Card.Divider/>
            //   <Card.Image source={"../" + item.img} />
            //   <Button icon={<Icon name='code' color='#ffffff' />} buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}} title='VIEW NOW' />
            // </Card>
            <View key={item.name} style={styles.box}>
              <Image style={styles.image} source={require('../product_img/apple.jpg')} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
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
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#97BE11',
    color: 'white',
  },
});
