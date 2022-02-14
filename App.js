import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import gradualIcon from "./assets/gradualIcon.png";
import LoginScreen from './Components/LoginScreen/LoginScreen';
import Dashboard from './Components/Dashboard/Dashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{headerShown: false}}
        />

      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
})