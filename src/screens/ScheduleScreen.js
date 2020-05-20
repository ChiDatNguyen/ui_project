import * as React from 'react';
import { Text, View, Image, AppRegistry, Button,Navigator,ScrollView,StyleSheet,TouchableOpacity,SafeAreaView,FlatList } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewActivity } from './AddNewActivity';
import PropTypes from 'prop-types';

const ScheduleStack = createStackNavigator();
export class ScheduleScreen extends React.Component{
    render(){
        return(
            <ScheduleStack.Navigator>
                <ScheduleStack.Screen name="list" component={ListActivity} options={{headerShown: false}} />
                <ScheduleStack.Screen name="add" component={AddNewActivity} options={{headerShown: false}}/>
            </ScheduleStack.Navigator>
        );
    }
}
class ListActivity extends React.Component{
    // constructor(props) {
    //     super(props);
    //     this.state = { 
    //         thu:[false,true,false,true,true,false,false],
    //         activity:"",
    //         time:'20:00'
    //     };
    //   }
    // renderItem = () => {
    //     let allThu = "";
    //     for (let index = 0; index < this.state.thu; index++) {
    //         if(this.state.thu[index]==true){
    //             allThu+=(string)(index);
    //             allThu+=" ";
    //         }
    //     }
    //     return (
    //         <View style={style.activelist}>
    //             <Image 
    //                 style={style.imageactive}
    //                 source={require('./assets/run_icon.png')}
    //                 style={{width: 40, height: 40}} 
    //             />
    //             <View style={style.active}>
    //                 <Text style={style.activename}>
    //                     {this.state.activity}
    //                 </Text>
    //                 <Text style={style.activeDate}>
    //                     {allThu}
    //                 </Text>
    //             </View>
    //             <Text style={style.time}>
    //                 {this.state.time}
    //             </Text>
    //         </View>
    //     );
    // }
    render(){
        // const { navigation } = this.props.navigation;
        return(
            <View style={{ flex: 1}}>
        
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('add')}>
                    <View style={{ flexDirection:'row-reverse'}}>
                        <Text>Thêm mới</Text>
                        <Image 
                            source={require('./assets/add.png')} 
                            style={{width: 20, height: 20}}
                        />
                    </View>
                </TouchableOpacity>
                       <View style={style.activelist}>
                            <Image 
                                style={style.imageactive}
                                source={require('./assets/run_icon.png')}
                                style={{width: 40, height: 40}} 
                            />
                            <View style={style.active}>
                                <Text style={style.activename}>
                                    Sport Time 1
                                </Text>
                                <Text style={style.activeDate}>
                                    T2  T3 T4
                                </Text>
                            </View>
                            <Text style={style.time}>
                                17:30
                            </Text>
                        </View>
                        <View style={style.activelist}>
                            <Image 
                                style={style.imageactive}
                                source={require('./assets/gym_icon.png')}
                                style={{width: 40, height: 40}} 
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
                        </View>
            </View>
        );
    }
}
ScheduleScreen.propTypes = {
    infomation:PropTypes.object
}
// export function ScheduleScreen({navigation}){
//     return <ScheduleS navigation={navigation} />;
// }
var style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
      },
    activelist:{
        height:'20%',
        flexDirection:'row',
        borderBottomWidth:1,
        alignItems: 'center', justifyContent: 'center'
    },
    imageactive:{
        flex:1,
    },
    time:{
        flex:1,
        fontSize:30
    },
    active:{
        flex:2,
        alignItems: 'center', justifyContent: 'center'
    },
    activename:{
        flex:1,
        fontSize:20
    },
    activeDate:{
        flex:1
    }
});