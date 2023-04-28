import React from 'react';
import { Linking, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
// import PieChart from 'react-native-pie-chart';

export default function WasteScreen() {
  const widthAndHeight = 250
  const series = [123, 321, 123, 789, 537]
  const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
  const Item = ({ item }) => {
    return (
      <View>
        <Text 
            style={styles.resourcesText} 
            onPress={() => {Linking.openURL('https://www.youtube.com/watch?v=8NCm2Q1rZOM&pp=ygUScmVkdWNpbmcgZm9vZHdhc3Rl')}}>Video Tutorials
        </Text>
        <Text 
          style={styles.resourcesText} 
          onPress={() => {Linking.openURL('https://findacomposter.com/')}}>Compost facilities near me
        </Text>
      </View>
    );
  };
  const Row = ({ children }) => (
    <View style={styles.row}>{children}</View>
  )
  const Col = ({ numRows, children }) => {
    return  (
      <View style={styles[`${numRows}col`]}>{children}</View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Food Waste Report</Text>
        <View style={styles.box}>
          <Text>Food items remaining: {}</Text>
          <Text>Food items consumed: {}</Text>
          <Text>Food items expired: {}</Text>
          {/* <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} doughnut={true} coverRadius={0.45} coverFill={'#FFF'} /> */}
          <Text>We'd noticed {} is not getting used up.</Text>
        </View>
        <Text style={styles.title}>Resources</Text>
        <View style={styles.resources}>
          <Row>
            <Col numRows={2}>
              <Image source={{uri: 'https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg'}} />
              <Text 
                style={styles.resourcesText} 
                onPress={() => {Linking.openURL('https://www.youtube.com/watch?v=8NCm2Q1rZOM&pp=ygUScmVkdWNpbmcgZm9vZHdhc3Rl')}}>Video Tutorials
              </Text>
            </Col>
            <Col numRows={2}>
              <Image source={{uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fcompost-bin&psig=AOvVaw2BiH9oZ483yQqM30H3oU0i&ust=1682727463867000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCKiD17imy_4CFQAAAAAdAAAAABAE'}} />
              <Text 
                style={styles.resourcesText} 
                onPress={() => {Linking.openURL('https://findacomposter.com/')}}>Compost facilities near me
              </Text>
            </Col>
          </Row>
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
    fontSize: 40,
  },
  resources: {
    width: '90%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    flex: 2,
  },
  row: {
    flexDirection: "row",
  },
  resourcesText: {
    fontSize: 16,
  },
  "2col":  {
    backgroundColor:  "white",
    borderColor:  "#fff",
    borderWidth:  1,
    flex:  2
  },
});
