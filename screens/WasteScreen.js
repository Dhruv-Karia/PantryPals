import React from 'react';
import { Linking, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import WeeklyPopupScreen from './WeeklyPopupScreen';
// import { PieChart } from 'react-native-svg-charts';

export default function WasteScreen() {
  const widthAndHeight = 250
  const foodData = { "remain": ["apple", "banana", "rice"], "consumed": ["pasta", "tomato", "yogurt"], "expired": ["milk"], "notUsedUp": ["milk"] }
  const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
  const data = [
    {
      key: 1,
      value: 50,
      svg: { fill: 'green' },
    },
    {
      key: 2,
      value: 30,
      svg: { fill: 'blue' },
    },
    {
      key: 3,
      value: 20,
      svg: { fill: 'red' },
    },
  ];

  return (
    <ScrollView>
      <WeeklyPopupScreen />
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Food Waste Report</Text>
        <View style={styles.box}>
        {/* <PieChart style={{ height: 200 }} data={data} /> */}
          <Image style={styles.chart} source={require('../data/Pie-Chart-food-waste.png')} />
          <Text>We'd noticed <Text style={styles.highlight}>{(foodData.notUsedUp).join(', ')}</Text> is not getting used up.</Text>
        </View>
        <Text style={styles.title}>Resources</Text>
        <View style={styles.resources}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.ImageContainer} onPress={() => {Linking.openURL('https://www.youtube.com/watch?v=8NCm2Q1rZOM&pp=ygUScmVkdWNpbmcgZm9vZHdhc3Rl')}}>
             <Image style={styles.logo} source={require('../data/yt_1200.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ImageContainer} onPress={() => {Linking.openURL('https://findacomposter.com/')}}>
              <Image style={styles.logo} source={require('../data/compostBin.jpg')} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.resourcesText}>Video Tutorials</Text>
            <Text style={styles.resourcesText}>Compost facilities near me</Text>
          </View>
        </View>
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
  box: {
    width: '90%',
    height: 200,
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 40,
    margin: 10,
  },
  resources: {
    width: '90%',
    backgroundColor: '#FBBC04',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 190,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourcesText: {
    fontSize: 16,
    margin: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: 'red',
  },
  logo: {
    height: '100%',
    width: '100%',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  ImageContainer: {
    width: '45%',
    margin: 10,
  },
  chart: {
    width: '100%',
    height: '100%',
  }
});
