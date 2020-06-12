import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Animated, Easing, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Component} from 'react';
import { firebaseApp } from '../../Component/FirebaseConfig.js';

import bgImage from '../../images/Login_Register/wallpaper.png';
import Logo from '../../images/Login_Register/logo.png';
import IconUser from '../../images/Login_Register/username.png';
import IconPass from '../../images/Login_Register/password.png';


const { width: WIDTH} = Dimensions.get('window')
export class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
    }
  }
  Login(){
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=>{
      Alert.alert(
        'Alert Title',
        'Login successful!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => this.props.navigation.navigate('home') }
        ],
        { cancelable: false }
      )
      this.setState({
        username:'',
        email:'',
        password:''
      });
    })
    .catch(function (error) {
      Alert.alert(
        'Alert Title',
        'Login failed!',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    })
  }

  render(){
  return (
    <ImageBackground source = {bgImage} style = {styles.backgroundContainer}>
      <View style = {styles.logoContainer}>
          <Image source = {Logo} style = {styles.logo}/>
          <Text style = {styles.logoText}>CARE APP</Text>
      </View>

      <View style = {styles.inputContainer}>
        <Image source={IconUser} size={28} color={'rgba(255,255,255,0.7)'} style = {styles.inputIcon}/> 
        <TextInput 
              style = {styles.input}
              placeholder = {'Username or Email'}
              placeholderTextColor = {'rgba(255,255,255,0.7)'}
              underlineColorAndroid = 'transparent'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
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
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />

      </View>

      <TouchableOpacity style={styles.btnLogin} onPress={() => {this.Login()}}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('register')}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>


  );
  }
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
      color: 'black',
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
      top: 6,
      left: 30
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