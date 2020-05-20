import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Animated, Easing, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Component} from 'react';

import bgImage from 'C:/Users/Admin/Desktop/ui_project-master/src/images/wallpaper.png';
import Logo from 'C:/Users/Admin/Desktop/ui_project-master/src/images/logo.png';
import IconUser from 'C:/Users/Admin/Desktop/ui_project-master/src/images/username.png';
import IconPass from 'C:/Users/Admin/Desktop/ui_project-master/src/images/password.png';


const { width: WIDTH} = Dimensions.get('window')
export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
      <View style = {styles.logoContainer}>
          <Image source = {Logo} style = {styles.logo}/>
          <Text style = {styles.logoText}>HEALTH APP</Text>
      </View>

      <View style = {styles.inputContainer}>
        <Image source={IconUser} size={28} color={'rgba(255,255,255,0.7)'} style = {styles.inputIcon}/> 
        <TextInput 
              style = {styles.input}
              placeholder = {'Username'}
              placeholderTextColor = {'rgba(255,255,255,0.7)'}
              underlineColorAndroid = 'transparent'
              onChangeText={email => setEmail(email)}
              defaultValue={email}
        />

      </View>

      <View style={styles.inputContainer}>
        <Image source={IconPass} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
        <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={pass => setPass(pass)}
          defaultValue={pass}
        />

      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('home')}>
          <Text style = {styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('register')}>
          <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>


  );
}
const styles = StyleSheet.create({
    backgroundContainer:{
      flex:1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer:{
      alignItems: 'center',
      marginBottom: 50
    },
    logo:{
      width: 120,
      height: 120
    },
    logoText:{
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      marginTop: 10,
      opacity: 0.5
    },
    input:{
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25
    },
    inputIcon:{
      position: 'absolute',
      top: -2,
      left: 25
    },
    inputContainer:{
      marginTop: 10
    },
    btnLogin:{
      width: WIDTH - 200,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#432577',
      justifyContent: 'center',
      marginTop: 20
    },
    btnEye:{
      position: 'absolute',
      top:-8,
      right: 30
    },
    text:{
      color:'rgba(255,255,255,0.7)',
      fontSize: 16,
      textAlign: 'center'
    }
});