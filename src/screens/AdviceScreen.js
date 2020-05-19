import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Rectangle_1 from '../images/Rectangle_1.png';
import icon_music from '../images/icon_music.png';
import icon_run from '../images/icon_run.png';
import traning from '../images/training.png';
import nutrious from '../images/nutrious.png';

export function AdviceScreen() {
  return (
    <View>
      <View>
        <Text style={styles.title}>Advices</Text>
      </View>
      <Advice_main />
    </View>
  );
}

class Advice_main extends Component {
  render() {
    return (
      <ScrollView>
        <ImageBackground
          source={Rectangle_1}
          style={styles.image}
          imageStyle={{borderRadius: 40}}>
          <Text style={styles.content_advice}>
            You have been sitting for along time! Try another activity?
          </Text>
          <View style={styles.border_icon}>
            <Image source={icon_music} style={styles.icon} />
            <Image source={icon_run} style={styles.icon} />
          </View>
        </ImageBackground>

        <View>
          <Text style={styles.small_title}>More advices</Text>

          <View style={styles.list}>
            <View style={styles.list_child}>
              <View style={styles.box1}>
                <Text style={styles.name_tag}>TRAINING TUTORIALS</Text>
              </View>
              <Image source={traning} style={styles.icon2} />
            </View>
            <View style={styles.list_child}>
              <View style={styles.box2}>
                <Text style={styles.name_tag}>Nutrious Solution</Text>
              </View>
              <Image source={nutrious} style={styles.icon2} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 40,
    margin: 20,
    textAlign: 'right',
  },
  content_advice: {
    color: 'white',
    marginBottom: 40,
    padding: 20,
    fontSize: 20,
  },
  image: {
    margin: 20,
    height: 350,
    borderRadius: 100,
  },
  border_icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    width: 100,
    height: 100,
  },
  more_advice: {
    textAlign: 'right',
    marginRight: 30,
    fontSize: 24,
    color: '#5b80f7',
  },
  small_title: {
    textAlign: 'center',
    marginBottom: 15,
    backgroundColor: '#d2d2d2',
  },
  icon2: {
    marginTop: -10,
    width: 350,
    height: 250,
    resizeMode: 'cover',
  },
  list: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  list_child: {
    padding: 10,
    backgroundColor: '#FFF',
  },
  box1: {
    backgroundColor: '#c4df9b',
    width: 350,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  box2: {
    backgroundColor: '#74c681',
    width: 350,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  name_tag: {
    color: '#2c2c2c',
    fontSize: 18,
  },
  container: {},
});
