import { randomBinomial } from 'd3';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function ItemScreen(props) {
  const item = JSON.parse(JSON.stringify(props.route.params.item));
  const num = 1;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.image} source={item.img} />
          <Text style={styles.name}>{item.name}</Text>
      </View>
      <Text>You have {num} in stock</Text>
      <View style={styles.line} />
            <View style={styles.protipContainer}>
        <Text style={styles.protip}>Protip:</Text><Text>{item.protip}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  subtitle: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  protip: {
    fontWeight: 'bold',
  },
  protipContainer: {
    width: '85%',
    flexDirection: 'column', 
    margin: 10, 
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#DFE9AC',
    padding: 10
  },
  line: { 
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '90%',

  }
});
