import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
import GroceryList from './screens/GroceryList';


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

        <Stack.Screen 
          name="GroceryList" 
          component={GroceryList} 
          options={{
            title: 'GroceryList',
            headerLeft: null,
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
      <Tab.Navigator 
      screenOptions={{
        //tabBarActiveTintColor: '#28590C',
        //tabBarInactiveTintColor: '#FFFFFF',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#81B622',
        },
      }}>
      <Tab.Screen
        name="Waste"
        component={WasteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./icons/Waste.png')}
              style={{ width: 25, height: 25, tintColor: focused ? '#28590C' : '#FFFFFF' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Meals"
        component={MealsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./icons/Meals.png')}
              style={{ width: 25, height: 25, tintColor: focused ? '#28590C' : '#FFFFFF' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Pantry"
        component={PantryScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./icons/Pantry.png')}
              style={{ width: 20, height: 25, tintColor: focused ? '#28590C' : '#FFFFFF' }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./icons/Settings.png')}
              style={{ width: 25, height: 25, tintColor: focused ? '#28590C' : '#FFFFFF' }}
            />
          ),
        }}
      />


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