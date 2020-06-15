import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import Rectangle_1 from '../../images/advice/Rectangle_1.png';
import icon_music from '../../images/advice/icon_music.png';
import icon_run from '../../images/advice/icon_run.png';
import traning from '../../images/advice/training.png';
import nutrious from '../../images/advice/nutrious.png';

export function AdviceScreen() {
  return (
    <View>
      <List_extend />
      <Text style={styles.small_title}>More advices</Text>
      <Advice_main />
    </View>
  );
}

class Advice_header extends Component {
  constructor(props) {
    super(props);
    this.state = {resize_BG: new Animated.Value(0)};
  }

  render() {
    const {resize_BG} = this.state;
    return (
      <ImageBackground
        source={Rectangle_1}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          margin: 20,
          height: 250,
          borderRadius: 100,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        imageStyle={{borderRadius: 30}}>
        <Text style={styles.content_advice}>
          You have been sitting for along time! Try another activity?
        </Text>
        <View style={styles.border_icon}>
          <TouchableOpacity>
            <Image source={icon_music} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icon_run} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

class Advice_main extends Component {
  render() {
    return (
      <ScrollView>
        <View>
          <View style={styles.list}>
            <TouchableOpacity
              style={styles.list_child}
              onPress={() =>
                Linking.openURL(
                  'http://www.coretenfitness.com/tag/fitness-tutorial/',
                )
              }>
              <View style={styles.box1}>
                <Text style={styles.name_tag}>TRAINNING TUTORIALS</Text>
              </View>
              <Image source={traning} style={styles.icon2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.list_child}
              onPress={() =>
                Linking.openURL('https://nutritionsolutions.com/')
              }>
              <View style={styles.box2}>
                <Text style={styles.name_tag}>Nutrious Solution</Text>
              </View>
              <Image source={nutrious} style={styles.icon2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.list_child}
              onPress={() =>
                Linking.openURL(
                  'http://www.coretenfitness.com/tag/fitness-tutorial/',
                )
              }>
              <View style={styles.box1}>
                <Text style={styles.name_tag}>TRAINNING TUTORIALS</Text>
              </View>
              <Image source={traning} style={styles.icon2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.list_child}
              onPress={() =>
                Linking.openURL('https://nutritionsolutions.com/')
              }>
              <View style={styles.box2}>
                <Text style={styles.name_tag}>Nutrious Solution</Text>
              </View>
              <Image source={nutrious} style={styles.icon2} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

class List_extend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width_change: new Animated.Value(50),
      height_change: new Animated.Value(50),
      fade: new Animated.Value(0),
      state_anim: false,
      opacity_icon: 0,
    };
  }

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.width_change, {
        toValue: 370,
        duration: 500,
      }),
      Animated.timing(this.state.height_change, {
        toValue: 100,
        duration: 500,
      }),
      Animated.timing(this.state.fade, {
        toValue: 1,
        duration: 300,
        delay: 450,
      }),
    ]).start(() => {});
  }

  toggle = () => {
    if (this.state.state_anim == false) {
      this.setState({opacity_icon: 1});
      Animated.parallel([
        Animated.timing(this.state.height_change, {
          toValue: 250,
          duration: 500,
        }),
      ]).start(() => {});
      this.state.state_anim = true;
    } else {
      this.setState({opacity_icon: 0});
      Animated.parallel([
        Animated.timing(this.state.height_change, {
          toValue: 100,
          duration: 500,
        }),
      ]).start(() => {});
      this.state.state_anim = false;
    }
  };

  render() {
    const width = this.state.width_change;
    const height = this.state.height_change;
    const opacity = this.state.fade;
    return (
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width,
          height,
          backgroundColor: 'green',
          margin: 20,
          borderRadius: 30,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={this.toggle}>
          <Animated.View style={{opacity}}>
            <Text style={[styles.content_advice]}>
              You have been sitting for along time! Try another activity?
            </Text>
          </Animated.View>

          <View style={styles.border_icon}>
            <TouchableOpacity>
              <Image
                source={icon_music}
                style={{
                  width: 100,
                  height: 100,
                  opacity: this.state.opacity_icon,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={icon_run}
                style={{
                  width: 100,
                  height: 100,
                  opacity: this.state.opacity_icon,
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
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
    height: 250,
    resizeMode: 'cover',
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
