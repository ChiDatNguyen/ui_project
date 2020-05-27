import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

export class HealthScreen extends Component{
  render(){
    return(
      <ScrollView>
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
              59
              </Text>
              <Text style={styles.text3}>
              bpm
              </Text>
            </View>

            <View style={styles.miniup}>
              {/* View tren o giua */}
              <Image
                source={require('.\\images\\healthimage\\layer3.png')}
                style={styles.heartlogo}
                />
            </View>

            <View style={styles.miniup}>
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

            <View style={styles.minidown}>
                {/* View duoi cot 1 */}

              <View style={styles.view14}>
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

              <View style={styles.view14}>
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

            <View style={styles.minidown}>
            {/* View duoi cot 2 */}

              <View style={styles.view14}>
              {/* View duoi cot 2.1 */}
                <View style={styles.miniview}>
                <Image
                  source={require('.\\images\\healthimage\\layer4.png')}
                  style={styles.tinylogo}
                  />
                </View>
                <View style={styles.normalview}>
                  <Text style={styles.text1}>
                  resting energy
                  </Text>
                  <Text style={styles.text2}>
                  965
                  </Text>
                  <Text style={styles.text3}>
                  kcal
                  </Text>
                </View>
              </View>

              <View style={styles.view14}>
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
        <View style={{flex:2,justifyContent: 'center',
        alignItems: 'center',height: 500}}>
        <Text style={{fontSize:30, color:'rgb(169, 50, 38)', fontWeight:'bold'}}>
        Chart
        </Text>
          <Image
          source={require('.\\images\\healthimage\\line_chart.png')}
          style= {styles.chart}
          />
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 2,
    marginLeft:30,
    marginRight:30,
    marginTop:30,
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
    fontSize:30,
    fontWeight: 'bold',
    color:'rgb(21, 67, 96)'
  },
  text3:{
    fontSize:15,
    marginTop: 10,
    textAlign: 'center',
    color: 'rgb(236, 112, 99)'
  },
  chart:{
    marginLeft:30,
    marginRight:30,
    width:350,
    height:350,
  },
})
