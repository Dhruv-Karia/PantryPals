import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WasteScreen from './screens/WasteScreen';
import MealsScreen from './screens/MealsScreen';
import PantryScreen from './screens/PantryScreen';
import SettingsScreen from './screens/SettingsScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {

  const [user, setUser] = React.useState();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Waste" component={WasteScreen} />
        <Tab.Screen name="Meals" component={MealsScreen} />
        <Tab.Screen name="Pantry" component={PantryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}