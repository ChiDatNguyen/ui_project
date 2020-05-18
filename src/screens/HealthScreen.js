import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

export class HealthScreen extends Component{
  render(){
    return(

        <View style={styles.container}>
        {/* View container */}

          <View style={styles.up}>
          {/* View tren */}
            <View style={{flex:1, backgroundColor: 'white'}}>
            {/* View tren ben trai */}
              <Text style={styles.text1}>
              Heart rate
              </Text>
              <Text style={styles.text2}>
              59
              </Text>
              <Text style={styles.text3}>
              bpm
              </Text>
            </View>

            <View style={{flex:1, backgroundColor: 'white'}}>
            {/* View tren o giua */}
              <Image
                source={require('.\\images\\healthimage\\layer3.png')}
                style={styles.heartlogo}
                />
            </View>

            <View style={{flex:1, backgroundColor: 'white'}}>
            {/* View tren ben phai */}
              <Text style={styles.text1}>
              Blood pressure
              </Text>
              <Text style={styles.text2}>
              120/81
              </Text>
              <Text style={styles.text3}>
              mmHG
              </Text>
            </View>

        </View>
        <View style={styles.down}>
        {/* View duoi */}

          <View style={{flex:1, backgroundColor: 'white',borderRightColor: 'black',
          borderRightWidth: 1,}}>
          {/* View duoi cot 1 */}

            <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            {/* View duoi cot 1.1 */}
              <View style={styles.miniview}>
              <Image
                source={require('.\\images\\healthimage\\step.png')}
                style={styles.tinylogo}
                />
              </View>
              <View style={styles.normalview}>
                <Text style={styles.text1}>
                current
                </Text>
                <Text style={styles.text2}>
                1025
                </Text>
                <Text style={styles.text3}>
                steps
                </Text>
              </View>
            </View>

            <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            {/* View duoi cot 1.2 */}
              <View style={styles.miniview}>
              <Image
                source={require('.\\images\\healthimage\\images.png')}
                style={styles.tinylogo}
                />
              </View>
              <View style={styles.normalview}>
                <Text style={styles.text1}>
                distance
                </Text>
                <Text style={styles.text2}>
                1.2
                </Text>
                <Text style={styles.text3}>
                km
                </Text>
              </View>
            </View>
          </View>

          <View style={{flex:1, backgroundColor: 'white',}}>
          {/* View duoi cot 2 */}

            <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            {/* View duoi cot 2.1 */}
              <View style={styles.miniview}>
              <Image
                source={require('.\\images\\healthimage\\layer4.png')}
                style={styles.tinylogo}
                />
              </View>
              <View style={styles.normalview}>
                <Text style={styles.text1}>
                resting enery
                </Text>
                <Text style={styles.text2}>
                965
                </Text>
                <Text style={styles.text3}>
                kcal
                </Text>
              </View>
            </View>

            <View style={{flex:1, backgroundColor: 'white', flexDirection: 'row'}}>
            {/* View duoi cot 2.2 */}
              <View style={styles.miniview}>
              <Image
                source={require('.\\images\\healthimage\\service.png')}
                style={styles.tinylogo}
                />
              </View>
              <View style={styles.normalview}>
                <Text style={styles.text1}>
                sleep time
                </Text>
                <Text style={styles.text2}>
                6.5
                </Text>
                <Text style={styles.text3}>
                hours
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },

  up:{
    flex:1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,

  },
  down:{
    flex:1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  heartlogo:{
    width: 130,
    height: 130,
  },
  tinylogo:{
    width: 30,
    height: 30,
  },
  miniview:{
    flex:1, backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalview:{
    flex:2, backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1:{
    fontSize:20,
    marginTop: 10,
    textAlign: 'center',
  },
  text2:{
    marginTop: 10,
    textAlign: 'center',
    fontSize:30,
    fontWeight: 'bold',
  },
  text3:{
    fontSize:15,
    marginTop: 10,
    textAlign: 'center',
  }
})
