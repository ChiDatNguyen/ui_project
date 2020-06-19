import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity, Alert,TextInput } from "react-native";
import { firebaseApp } from "../../Component/FirebaseConfig";
const { width: WIDTH} = Dimensions.get('window')

export class EditProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username:'',
        description:'',
        age:'',
        bloodtype:'',
        height:'',
        weight:''
      }
     
    }
    Update(){
      firebaseApp.database().ref('/user/'+firebaseApp.auth().currentUser.uid).update(
        {
          username: this.state.username,
          age: this.state.age,
          bloodType: this.state.bloodtype,
          height: this.state.height,
          weight: this.state.weight,
          description: this.state.description,
        }
      )
      .then( () => { this.props.navigation.navigate('profile') })
    }
    
    render(){
      return (
        
        <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={require('../../images/profile/user.png')}
                style={styles.image}
                resizeMode="center"
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Username'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={(username)=> this.setState({username})}
              value={this.state.username}
          />
          </View>

          <View style={styles.infoContainer}>
            <TextInput
              style={styles.input}
              placeholder={'Description'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={(description)=> this.setState({description})}
              value={this.state.description}
            />
          </View>

          <View style={styles.infoContainer} style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.inputSmall1}
            placeholder={'Weight'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={(weight)=> this.setState({weight})}
            value={this.state.weight}
          />
          <TextInput
            style={styles.inputSmall2}
            placeholder={'Height'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={(height)=> this.setState({height})}
            value={this.state.height}
          />
          </View>

          <View style={styles.infoContainer} style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.inputSmall3}
            placeholder={'Age'}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={(age)=> this.setState({age})}
            value={this.state.age}
          />
          <TextInput
              style={styles.inputSmall4}
              placeholder={'Blood Type'}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'
              onChangeText={(bloodtype)=> this.setState({bloodtype})}
              value={this.state.bloodtype}
          />
          </View>

          

          <TouchableOpacity style={styles.btnLogout} onPress={() => { this.Update() }}>
            <Text style={styles.textButton}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout1}>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
    inputIcon: {
        top: 40,
        left: 35
    },
    input: { 
        width: WIDTH - 150,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 30,
        backgroundColor: '#432577',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    inputSmall1:{
      top: 15,  
      width: WIDTH - 270,
      height: 45,
      left: 50,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 30,
      backgroundColor: '#432577',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25
    },
    inputSmall2:{
      top: 15,  
      width: WIDTH - 265,
      height: 45,
      left: 0,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 30,
      backgroundColor: '#432577',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25
    },
    inputSmall3:{
      top: 25,  
      width: WIDTH - 270,
      height: 45,
      left: 50,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 30,
      backgroundColor: '#432577',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25
    },
    inputSmall4:{
      top: 25,  
      width: WIDTH - 265,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 20,
      backgroundColor: '#432577',
      color: 'rgba(255,255,255,0.7)',
      marginHorizontal: 25
    },
    input1:{
      top: 45, 
      width: WIDTH - 120,
        height: 45,
        left: 50,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 30,
        backgroundColor: '#432577',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
    },
    image: {
      flex: 1,
      height: undefined,
      width: undefined
    },
    titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
    },
    subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
    },
    profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
    },
    dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
    },
    active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
    },
    add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
    },
    infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
    },
    statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
    },
    statsBox: {
      alignItems: "center",
      flex: 1
    },
    mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
    },
    mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
    },
    recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
    },
    recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
    },
    activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
    },
    btnLogout: {
      width: WIDTH - 220,
      left: 120,
      top:40,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#432577',
      justifyContent: 'center',
      marginBottom: 18
    },
    btnLogout1: {
      width: WIDTH - 220,
      left: 120,
      top:40,
      height: 45,
      borderRadius: 25,
      backgroundColor: 'white',
      justifyContent: 'center',
      marginBottom: 18
    },
    textButton:{
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
      textAlign: 'center'
    }
  });