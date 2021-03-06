import React, {Component, Fragment} from 'react';
import { Platform, ScrollView, Text, View, Image, AppRegistry, Button, Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

export class Screen2 extends React.Component {
  render(){
    return(
      <Fragment>

        <View style={{justifyContent: 'center',flexDirection: 'row', backgroundColor: 'gray',alignItems: 'center', marginLeft: 290, marginTop:10, width:90, height: 30, borderRadius:20}}>

          <View style = {{width:60, height:30, justifyContent: 'center', alignItems: 'center',}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('s1')}>
            <Text> Spec
            </Text>
          </TouchableOpacity>
          </View>
          <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('s1')}>
            <Image
              source={require('../../images/healthimage/charticon.png')}
              style={{width:30, height:30}}
            />
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          {/* View container */}

          <View style={styles.up}>
            {/* View tren */}

            <View style={styles.miniup}>
              {/* View tren ben trai */}
              <Text style={styles.text1}>
              Heart rate
              </Text>
              <Text style={styles.text2}>
              LOW
              </Text>

            </View>

            <View style={styles.miniup}>
              {/* View tren o giua */}
              <Image
                source={require('../../images/healthimage/layer3.png')}
                style={styles.heartlogo}
                />
            </View>

            <View style={styles.miniup}>
              {/* View tren ben phai */}
              <Text style={styles.text1}>
              Blood pressure
              </Text>
              <Text style={styles.text2}>
              GOOD
              </Text>

            </View>
          </View>
          <View style={styles.down}>
            {/* View duoi */}

            <View style={styles.minidown}>
                {/* View duoi cot 1 */}

              <View style={styles.view14}>
                  {/* View duoi cot 1.1 */}
                <View style={styles.miniview}>
                  <Image
                  source={require('../../images/healthimage/step.png')}
                  style={styles.tinylogo}
                  />
                </View>
                <View style={styles.normalview}>
                  <Text style={styles.text1}>
                  current
                  </Text>
                  <Text style={styles.text2}>
                  GOOD
                  </Text>

                </View>
              </View>

              <View style={styles.view14}>
                {/* View duoi cot 1.2 */}
                <View style={styles.miniview}>
                  <Image
                  source={require('../../images/healthimage/images.png')}
                  style={styles.tinylogo}
                  />
                </View>
                <View style={styles.normalview}>
                  <Text style={styles.text1}>
                  distance
                  </Text>
                  <Text style={styles.text2}>
                  NORMAL
                  </Text>

                </View>
              </View>
            </View>

            <View style={styles.minidown}>
            {/* View duoi cot 2 */}

              <View style={styles.view14}>
              {/* View duoi cot 2.1 */}
                <View style={styles.miniview}>
                <Image
                  source={require('../../images/healthimage/layer4.png')}
                  style={styles.tinylogo}
                  />
                </View>
                <View style={styles.normalview}>
                  <Text style={styles.text1}>
                  resting energy
                  </Text>
                  <Text style={styles.text2}>
                  PERFECT
                  </Text>

                </View>
              </View>

              <View style={styles.view14}>
              {/* View duoi cot 2.2 */}
                <View style={styles.miniview}>
                <Image
                  source={require('../../images/healthimage/service.png')}
                  style={styles.tinylogo}
                  />
                </View>
                <View style={styles.normalview}>
                  <Text style={styles.text1}>
                  sleep time
                  </Text>
                  <Text style={styles.text2}>
                  FEW
                  </Text>

              </View>
            </View>
            </View>
          </View>
        </View>
          </Fragment>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 2,
    marginLeft:30,
    marginRight:30,
    marginTop:10,
    borderRadius: 40,
    height:500,
  },
  view14:{
    flex:1,    backgroundColor: 'rgb(250, 229, 211)',
        borderRadius: 15, flexDirection: 'row', marginLeft: 5,
        marginRight: 5,
        marginTop:10,
  },
  miniup:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    borderRadius: 20,
  },
  up:{
    flex:1,
    backgroundColor: 'rgb(246, 221, 204)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  minidown:{
    flex:1,

  },
  down:{
    flex:1,
    flexDirection: 'row',
    borderRadius: 40,
    borderRadius:15,
  },
  heartlogo:{
    width: 120,
    height: 120,
  },
  tinylogo:{
    width: 30,
    height: 30,
    borderRadius: 40,
    backgroundColor:'white'
  },
  miniview:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:0,
  },
  normalview:{
    flex:3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1:{
    fontSize:15,
    marginTop: 10,
    textAlign: 'center',
    color:'rgb(205, 97, 85 )',
    fontWeight: 'bold'
  },
  text2:{
    marginTop: 10,
    textAlign: 'center',
    fontSize:20,
    fontWeight: 'bold',
    color:'rgb(21, 67, 96)'
  },
  
  chart:{
    marginLeft:30,
    marginRight:30,
    width:350,
    height:350,
  },
})
