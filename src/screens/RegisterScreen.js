import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Component } from 'react';

import bgImage from '../../images/Login_Register/wallpaper.png';
import Logo from '../../images/Login_Register/logo.png';
import IconUser from '../../images/Login_Register/username.png';
import IconPass from '../../images/Login_Register/password.png';
import IconMail from '../../images/Login_Register/email.png';

const { width: WIDTH } = Dimensions.get('window')
export function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');
    submitRegister = (email,pass) => {
      // auth().createUserWithEmailAndPassword(email,pass).catch(function(error) {});
      alert(email);
      navigation.navigate('login');
    }
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.logoText}>SIGN UP</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Image source={IconUser} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} /> 
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
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

          <View style={styles.inputContainer}>
          <Image source={IconMail} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIconEmail} />
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={user => setUser(user)}
              defaultValue={user}
            />
          </View>

        
        <View style={styles.inputContainer} style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('login')}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('home')}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
}
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50
  },
  logo: {
    width: 120,
    height: 120
  },
  logoText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputRow:{
    width: WIDTH - 245,
    height: 45,
    top: 10,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputRowLoginRegis: {
    width: WIDTH - 245,
    height: 45,
    top: 20,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 6,
    left: 30
  },
  inputIconEmail:{
    position: 'absolute',
    top: 10,
    left: 32
  },
  inputContainer: {
    marginTop: 10
  },
  btnLogin: {
    width: WIDTH - 270,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center'
  }
});