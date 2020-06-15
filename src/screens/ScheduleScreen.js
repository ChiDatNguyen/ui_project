import * as React from 'react';
import { Text, View, Image, ImageBackground, Button, Navigator, ScrollView, StyleSheet, TouchableOpacity, List, FlatList, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddNewActivity } from './AddNewActivity';
import PropTypes from 'prop-types';
import Swipeout from 'react-native-swipeout';

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
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey :null,
        });
    }
    DATA = [{
        key: 0,
        activity: "Gym",
        icon_activity: require('../../images/schedule/gym_icon.png'),
        thu: "CN",
        time: "00:00"
    },
    {
        key: 1,
        activity: "Gym",
        icon_activity: require('../../images/schedule/gym_icon.png'),
        thu: "CN",
        time: "00:00"
    },
    ]
    pushDataActivity = (dataActivity) => {
        this.DATA = this.DATA.concat(dataActivity);
        
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              marginLeft: "14%"
            }}
          />
        );
    };
    refreshFlatList = (deletedKey) =>{
        this.setState((prevState)=>{
            return {
                deletedRowKey: deletedKey
            };
        });
    }
    render() {
        // console.log(this.props.route.params);
        // console.log(this.DATA);
        // }
        let sothutu;
        if(this.DATA.length != 0){
            sothutu = this.DATA[this.DATA.length - 1].key;
        }
        else{
            sothutu = -1;
        }
        
        return (
            // <ScrollView>
                <View style={{ flex: 1, margin: 10 }}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('add', {stt:sothutu,parent: this})}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Text style={{ color: 'blue', borderWidth: 1, borderRadius: 5 }}>Thêm mới</Text>
                            <Image
                                source={require('../../images/schedule/add.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{marginBottom:30}}>
                        <FlatList
                            data={this.DATA}
                            renderItem={({ item , index}) =>
                                <ElementActivity
                                    icon_activity={item.icon_activity}
                                    activity={item.activity}
                                    time={item.time}
                                    thu={item.thu}
                                    index = {index}
                                    item = {item}
                                    parentFlatlist = {this}

                                />
                            }
                            // keyExtractor={item => item.key}
                            ItemSeparatorComponent={this.renderSeparator}
                            ListEmptyComponent={() => {return (<View></View>);}}
                        />
                    </View>
                </View>
            // </ScrollView>
        );
    }
}
class ElementActivity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeRowKey:null
        };
    }
    render() {

        // console.log(this.props.icon_activity);
        const swipeoutSettings = {
            autoClose: true,
            onClose: (secId, rowId, derection) =>{
                if(this.state.activeRowKey!=null){
                    this.setState({activeRowKey:null});
                }
            },
            onOpen: (secId, rowId, derection) =>{
                this.setState({activeRowKey:this.props.item.key});
            },
            right:[
                {
                    onPress:()=>{
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                                {text:"No",onPress:() => console.log("Cancel Pressed"), style:'cancel'},
                                {text:'Yes',onPress:()=>{
                                    console.log(this.props.index);
                                    this.props.parentFlatlist.DATA.splice(this.props.index,1);
                                    //refresh flatlist
                                    this.props.parentFlatlist.refreshFlatList(deletingRow);
                                }}
                            ],
                            {cancelable:true}
                        );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId:1
        };
        return (
            <Swipeout {...swipeoutSettings}>
            <View>
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
                        source={this.props.icon_activity}
                        style={{ width: 60, height: 60 }}
                    />
                    <View style={style.active}>
                        <Text style={style.activename}>
                            {this.props.activity}
                        </Text>
                        <Text style={style.activeDate}>
                            {this.props.thu}
                        </Text>
                    </View>
                    <Text style={style.time}>
                        {this.props.time}
                    </Text>
                    {/* </View> */}
                </ImageBackground>
            </View>
            </Swipeout>
        );
    }
}
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