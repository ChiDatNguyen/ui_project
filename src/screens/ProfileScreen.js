import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { firebaseApp } from '../../Component/FirebaseConfig.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EditProfile } from '../screens/EditProfile';

const { width: WIDTH} = Dimensions.get('window')
const ProfileStack = createStackNavigator();
export class ProfileScreen extends React.Component {
    render() {
        return (
            <ProfileStack.Navigator>
                <ProfileStack.Screen name="profile" component={MainProfile} options={{ headerShown: false }} />
                <ProfileStack.Screen name="edit" component={EditProfile} options={{ headerShown: false }} />
            </ProfileStack.Navigator>
        );
    }
}

export class MainProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      email:'',
      age:'',
      bloodtype:'',
      height:'',
      weight:''
    }
    firebaseApp.database().ref('/user/'+firebaseApp.auth().currentUser.uid).once('value').then(snapshot => {this.setState({ age:snapshot.val().age,
      weight:snapshot.val().weight,
      height:snapshot.val().height,
      bloodtype:snapshot.val().bloodType,
      email:snapshot.val().email,
      username:snapshot.val().username})});
  }
  Logout() {
    firebaseApp.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('login')
      })
      .catch(function (error) {
        Alert.alert(
          'Alert Title',
          'Logout failed!',
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
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={require('../../images/profile/profile-pic.jpg')}
                style={styles.image}
                resizeMode="center"
              />
            </View>

            <View style={styles.active} />
        
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
              {this.state.username}
            </Text>
            <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
              CEO of Stark Industries
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
    <Text style={[styles.text, {fontSize: 24}]}>{this.state.age}</Text>
              <Text style={[styles.text, styles.subText]}>Age</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: '#DFD8C8',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={[styles.text, {fontSize: 24}]}>{this.state.weight}</Text>
              <Text style={[styles.text, styles.subText]}>Weight</Text>
            </View>
            <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>{this.state.height}</Text>
              <Text style={[styles.text, styles.subText]}>Height</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: '#DFD8C8',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={[styles.text, { fontSize: 24 }]}>{this.state.bloodtype}</Text>
              <Text style={[styles.text, styles.subText]}>Blood Type</Text>
            </View>
          </View>

          <View style={{marginTop: 32}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require('../../images/profile/media1.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require('../../images/profile/media2.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require('../../images/profile/media3.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require('../../images/profile/media4.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.mediaImageContainer}>
                <Image
                  source={require('../../images/profile/media5.jpg')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            </ScrollView>
            <View style={styles.mediaCount}>
              <Text
                style={[
                  styles.text,
                  {fontSize: 24, color: '#DFD8C8', fontWeight: '300'},
                ]}>
                ABOUT
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    color: '#DFD8C8',
                    textTransform: 'uppercase',
                  },
                ]}>
                me
              </Text>
            </View>
          </View>
          <Text style={[styles.subText, styles.recent]}>
            Recent Activity
          </Text>
          <View style={{alignItems: 'center'}}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator} />
              <View style={{width: 250}}>
                <Text
                  style={[
                    styles.text,
                    {color: '#41444B', fontWeight: '300'},
                  ]}>
                  Started joining in Avengers with{' '}
                  <Text style={{fontWeight: '400'}}>Thor Odinson</Text>{' '}
                  and <Text style={{fontWeight: '400'}}>Steven Rogers</Text>
                </Text>
              </View>
            </View>

            <View style={styles.recentItem}>
              <View style={styles.activityIndicator} />
              <View style={{width: 250}}>
                <Text
                  style={[
                    styles.text,
                    {color: '#41444B', fontWeight: '300'},
                  ]}>
                  Rescued the Earth from{' '}
                  <Text style={{fontWeight: '400'}}>Thanos</Text>
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.btnLogout} onPress={() => { this.props.navigation.navigate('edit') }}>
            <Text style={styles.textButton}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnLogout} onPress={() => { this.Logout() }}>
            <Text style={styles.textButton}>Logout</Text>
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
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    marginBottom: 18
  },
  textButton:{
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    textAlign: 'center'
  }
});