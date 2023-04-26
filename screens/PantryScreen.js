import React, { useState } from 'react';
import { ScrollView, StyleSheet, Button, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { pantryContent } from '../data/products.js';
import { ItemScreen } from './ItemScreen.js';
import { useNavigation } from '@react-navigation/native';

export default function PantryScreen() {
  const [pantry, setPantry] = useState([
    {"category": "Dairy", "items": []}, 
    {"category": "Vegetables", "items": []}, 
    {"category": "Fruits", "items": []},
    {"category": "Grains", "items": []}] );
  const Dairy = [];
  const Vegetables = [];
  const Fruits = [];
  const Grains = [];

 pantryContent.map(item => {
  console.log(item);
    if (item.category == "Dairy") {
      Dairy.push(item);
    } else if (item.category == "Vegetables") {
      Vegetables.push(item);
    } else if (item.category == "Fruits") {
      Fruits.push(item);
    } else {
      Grains.push(item)
    }
  });

const navigation = useNavigation();


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Dairy</Text>
        <FlatList
          data={Dairy}
          renderItem={({ item }) => (
            
            <View style={styles.box}>
              <TouchableOpacity onPress={() => navigation.navigate('Product Detail', { item: item })}>
                <Image style={styles.image} source={item.img} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.title}>Vegetables</Text>
        <FlatList
          data={Vegetables}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <TouchableOpacity onPress={() => navigation.navigate('Product Detail', { item: item })}>
                <Image style={styles.image} source={item.img} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.title}>Fruits</Text>
        <FlatList
          data={Fruits}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <TouchableOpacity onPress={() => navigation.navigate('Product Detail', { item: item })}>
                <Image style={styles.image} source={item.img} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        <Text style={styles.title}>Grains</Text>
        <FlatList
          data={Grains}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <TouchableOpacity onPress={() => navigation.navigate('Product Detail', { item: item })}>
                <Image style={styles.image} source={item.img} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </View>
      {/* <View style={styles.container}>
        <Text style={styles.title}>Dairy</Text>
        
          {Dairy.map(item =>(
              <View key={item.name} style={styles.box}>
                <Image style={styles.image} source={require('../product_img/apple.jpg')} />
                <Text style={styles.name}>{item.name}</Text>
              </View>
          ))}
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  box: {
    width: '45%',
    height: 200,
    flexDirection: 'column', 
    margin: 10, 
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'green'
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: 50,
  },
  name: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#97BE11',
    color: 'white',
  },
});
