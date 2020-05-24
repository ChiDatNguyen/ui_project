import * as React from 'react';
import {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { Home } from './src/screens/Home';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login" 
        screenOptions={{
          headerTintColor:'#fff',
          headerStyle:{
            backgroundColor:'pink'
          }
        }}
      >
        <Stack.Screen name="login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="home" component={Home} options={{title:'CareApp'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
