
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import chart from '../../images/sportscreen/chart.png'
import stopWatch from '../../images/sportscreen/unnamed.gif'

export function SportScreen() {
  return (
    <ImageBackground style={styles.container}>
      <Sport />
      
    </ImageBackground>
  );
}

class Sport extends Component {
  render() {
    return (
      <ScrollView>
          <View style={styles.box1}>
            <View style={styles.box1__line1}>
                <Text  style={styles.title1}>Duration</Text>
            </View>
            <View style={styles.box1__line2}>
            </View>
            <View style={styles.box1__line3}>
                {/* <View style={styles.box1__line3__stopWatch}>
                <Text style={styles.title1}>01:00:00</Text>
                </View> */}
                <Image  source={stopWatch} style={styles.stopWatch}/>
            </View>
          </View>
          
        {/* end1 */}
          <View style={styles.box2}>
            <View style={styles.box2__line1}>
                <Text style={styles.title1}>Distance</Text>
            </View>
            <View style={styles.box2__line2}>
                <View style={styles.box2__line2__left}>
                    <Text style={styles.title2}>Medium</Text>
                    <Text style={styles.title1}>2.5 km</Text>
                </View>
                <View style={styles.box2__line2__right}> 
                  <View style={styles.box2__line2__right__1}>
                      <Text style={styles.title2}>Calorines: </Text>
                      <Text style={styles.title1}>5.6 kcal</Text>
                  </View>
                  <View style={styles.box2__line2__right__1}>
                      <Text style={styles.title2}>Heart rate:</Text>
                      <Text style={styles.title1}>174 bpm/R</Text>
                  </View>
                </View>
            </View>
          </View>
        {/* end2 */}
          <View style={styles.box3}> 
            <View style={styles.box3__line1}>
                <Text style={styles.title1}>Satistic</Text>
            </View>
            <View style={styles.box3__line2}>
                <Image source={chart} style={styles.image}/>
            </View>
          </View>
        {/* end3 */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
          {/* end4 */}
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
container : {
     marginHorizontal: 20,
     flex: 1,
     fontSize : 40, 
     marginTop: 20
},
stopWatch : {
    height: 250,
    width :250
},
title : {
    fontSize: 45,
    margin: 25,
    textAlign: 'right',
    color: '#000000'
},
title1 : {
  fontSize: 25,
  color: '#ffffff',
  

},
title2 : {
  color: '#ffffff',
  marginTop: 10,
  marginBottom : 10

},
title3 : {
  color: '#ffffff',
  fontSize : 30,
  marginTop: 20,
},
title4: {
  fontSize: 25,
  color: '#ffffff',

},
image : {
    width: '100%',
    height: '70%', 
    marginTop: 40
     
},

box1 :{
    color :'white',
    marginTop : 10
        
},
box1__line1 : {
    backgroundColor :'#7AC5CD',
    alignItems: 'center',
    paddingVertical : 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    
},
box1__line3 : {
    // paddingVertical : 20,
    backgroundColor : '#fff',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
},
box1__line3__stopWatch : {
  justifyContent: 'center',
  alignItems: 'center',
  height : 150,
  width: 150,
  borderRadius : 150,
  borderWidth: 10, 
  borderColor : '#DCE5F1',
  
},


box2 : {
    marginTop : 10
},
box2__line1 : {
    alignItems :'center',
    backgroundColor : '#698B22',
    paddingVertical : 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
},
box2__line2 : {
    display:'flex',
    flexDirection :'row',
    flex: 1,
    backgroundColor : '#556B2F',
    paddingVertical : 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingHorizontal : 10

},
box2__line2__left : {
    flex : 1,
    alignItems :'center',
    borderRightWidth : 1.5,
    borderRightColor : '#ffffff',
    marginTop : 11
},
box2__line2__right : {
    flex : 2,
    // alignItems :'center',
    paddingLeft : 30,
    display : 'flex',
    flexDirection :'column',
},
box2__line2__right__1 : {
  display :'flex',
  flexDirection :'row',
  marginTop : 10
},

box3 :{
    marginTop : 10,
},
box3__line1 : {
    backgroundColor :'#CDC673',
    alignItems: 'center',
    paddingVertical : 8,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
},
box3__line2 : {
  justifyContent: 'center',
  alignItems: 'center',
  height: 175,
  backgroundColor :'#8B864E',

    
},
button :{
    width: '50%',
    alignItems : 'center',
    marginLeft: 95,
    paddingVertical : 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor : '#8B1A1A',
    marginTop : 10
    
},
buttonText : {
  fontSize : 20,
  color: '#ffffff',
}
});
