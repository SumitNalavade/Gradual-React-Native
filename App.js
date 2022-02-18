import { StyleSheet} from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Components/LoginScreen/LoginScreen';
import Dashboard from './Components/Dashboard/Dashboard';
import ClassDetails from './Components/ClassDetails/ClassDetails';
import Profile from './Components/Profile/Profile';

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

      <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: true}}/>

      <Stack.Screen name="Class Details" component={ClassDetails} options={{headerShown: true}}/>

      <Stack.Screen name="Profile" component={Profile} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
})