import * as React from 'react';
import {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity ,ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { Home } from './src/screens/Home';
import { AddNewActivity } from './src/screens/AddNewActivity';
import { ScheduleScreen } from './src/screens/ScheduleScreen';
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
        <Stack.Screen name="login" component={LoginScreen} options={{title: 'tLogin'}}/>
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="home" component={Home} options={{title:'CareApp'}}/>
        {/* <Stack.Screen name="add" component={AddNewActivity} options={{title:'Them moi'}}/> */}
        {/* <Stack.Screen name="schedule" component={ScheduleScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
