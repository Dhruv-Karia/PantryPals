import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import WasteScreen from './screens/WasteScreen';
import MealsScreen from './screens/MealsScreen';
import PantryScreen from './screens/PantryScreen';
import SettingsScreen from './screens/SettingsScreen';
import Login from './screens/login';
import Signup from './screens/signup';
import Preferences from './screens/Preferences'
import ItemScreen from './screens/ItemScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="SettingsScreen" 
       component={SettingsScreen} 
       options={
         { title: 'SettingsScreen' },
         {headerLeft: null} 
       }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen 
          name="Signup" 
          component={Signup} 
          options={{ title: 'Signup' }}
        />       
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: 'Login',
            headerLeft: null,
          }}
        />
        <Stack.Screen 
          name="SettingsScreen" 
          component={SettingsScreen} 
          options={{
            title: 'SettingsScreen',
            headerLeft: null,
          }}
        />

        <Stack.Screen 
          name="Preferences" 
          component={Preferences} 
          options={{
            title: 'Preferences',
            headerLeft: null,
          }}
        />

        <Stack.Screen 
          name="MainTabNavigator" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Waste" component={WasteScreen} />
      <Tab.Screen name="Meals" component={MealsScreen} />
      <Tab.Screen name="Pantry" component={PantryComponent} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function PantryComponent() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="PantryScreen" component={PantryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Product Detail" component={ItemScreen} />
    </Stack.Navigator>
  )
}
