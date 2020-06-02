import * as React from 'react';
import { Text, View, Image, ImageBackground, Button, Navigator, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewActivity } from './AddNewActivity';
import PropTypes from 'prop-types';

const ScheduleStack = createStackNavigator();
export class ScheduleScreen extends React.Component {
    render() {
        return (
            <ScheduleStack.Navigator>
                <ScheduleStack.Screen name="list" component={ListActivity} options={{ headerShown: false }} />
                <ScheduleStack.Screen name="add" component={AddNewActivity} options={{ headerShown: false }} />
            </ScheduleStack.Navigator>
        );
    }
}
class ListActivity extends React.Component {
    render() {
        // const { navigation } = this.props.navigation;
        return (
            <ScrollView>
                <View style={{ flex: 1, margin: 10 }}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('add')}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ color: 'blue', borderWidth: 1, borderRadius: 5 }}>Thêm mới</Text>
                            <Image
                                source={require('../../images/schedule/add.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <Image
                        style={style.imageactive}
                        source={require('../../images/schedule/vachke.png')}
                        style={{ width: '100%' }}
                    />
                    <ImageBackground
                        style={style.activelist}
                        source={require('../../images/schedule/bgr_running2.png')}
                        imageStyle={{ borderRadius: 25 }}
                    >
                        {/* <View style={style.activelist} > */}
                        <Image
                            style={style.imageactive}
                            source={require('../../images/schedule/run_icon.png')}
                            style={{ width: 60, height: 60 }}
                        />
                        <View style={style.active}>
                            <Text style={style.activename}>
                                Running
                                    </Text>
                            <Text style={style.activeDate}>
                                T2  T3 T4
                                    </Text>
                        </View>
                        <Text style={style.time}>
                            17:30
                                </Text>
                        {/* </View> */}
                    </ImageBackground>
                    <Image
                        style={style.imageactive}
                        source={require('../../images/schedule/vachke.png')}
                        style={{ width: '100%' }}
                    />

                    <ImageBackground
                        style={style.activelist}
                        source={require('../../images/schedule/bgr_running2.png')}
                        imageStyle={{ borderRadius: 25 }}
                    >
                        {/* <View style={style.activelist} > */}
                        <Image
                            style={style.imageactive}
                            source={require('../../images/schedule/gym_icon.png')}
                            style={{ width: 60, height: 60 }}
                        />
                        <View style={style.active}>
                            <Text style={style.activename}>
                                Gymtime
                                    </Text>
                            <Text style={style.activeDate}>
                                T2  T3 T4
                                    </Text>
                        </View>
                        <Text style={style.time}>
                            17:30
                                </Text>
                        {/* </View> */}
                    </ImageBackground>
                    <Image
                        style={style.imageactive}
                        source={require('../../images/schedule/vachke.png')}
                        style={{ width: '100%' }}
                    />
                    <ImageBackground
                        style={style.activelist}
                        source={require('../../images/schedule/bgr_running2.png')}
                        imageStyle={{ borderRadius: 25 }}
                    >
                        {/* <View style={style.activelist} > */}
                        <Image
                            style={style.imageactive}
                            source={require('../../images/schedule/run_icon.png')}
                            style={{ width: 60, height: 60 }}
                        />
                        <View style={style.active}>
                            <Text style={style.activename}>
                                Running
                                    </Text>
                            <Text style={style.activeDate}>
                                T2  T3 T4
                                    </Text>
                        </View>
                        <Text style={style.time}>
                            17:30
                                </Text>
                        {/* </View> */}
                    </ImageBackground>
                    <Image
                        style={style.imageactive}
                        source={require('../../images/schedule/vachke.png')}
                        style={{ width: '100%' }}
                    />
                </View>
            </ScrollView>
        );
    }
}
ScheduleScreen.propTypes = {
    infomation: PropTypes.object
}
// export function ScheduleScreen({navigation}){
//     return <ScheduleS navigation={navigation} />;
// }
var style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    activelist: {
        // marginTop:20,
        height: 100,
        flexDirection: 'row',
        // borderBottomWidth:1,
        // borderTopWidth:1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'cover',
        width: '100%',
        borderTopRightRadius: 50,
    },
    imageactive: {

    },
    time: {
        flex: 1,
        fontSize: 30
    },
    active: {
        flex: 2,
        alignItems: 'center', justifyContent: 'center',
    },
    activename: {
        flex: 1,
        fontSize: 20
    },
    activeDate: {
        flex: 1
    }
});