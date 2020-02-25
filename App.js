import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Navigation from './components/navigation/navigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SetupScreen from './components/screens/setup';
import TirageScreen from './components/screens/tirage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Tirage" component={TirageScreen} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}
