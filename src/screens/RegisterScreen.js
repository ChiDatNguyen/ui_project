import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Component } from 'react';

import bgImage from 'C:/Users/Admin/Desktop/ui_project-master/src/images/wallpaper.png';
import Logo from 'C:/Users/Admin/Desktop/ui_project-master/src/images/logo.png';
import IconUser from 'C:/Users/Admin/Desktop/ui_project-master/src/images/username.png';
import IconPass from 'C:/Users/Admin/Desktop/ui_project-master/src/images/password.png';

const { width: WIDTH } = Dimensions.get('window')
export function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    submitRegister = (email,pass) => {
      // auth().createUserWithEmailAndPassword(email,pass).catch(function(error) {});
      alert(email);
      navigation.navigate('login');
    }
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.logoText}>REGISTER</Text>
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

        <View style={styles.inputContainer} style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.inputRow}
            placeholder={'Height'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
          />
          <TextInput
            style={styles.inputRow}
            placeholder={'Weight'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
          />
        </View>
        
        <View style={styles.inputContainer} style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('login')}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogin} onPress={() => this.submitRegister(email, pass)}>
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
    color: 'white',
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
    top: -2,
    left: 25
  },
  inputContainer: {
    marginTop: 10
  },
  btnLogin: {
    width: WIDTH - 220,
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