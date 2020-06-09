import * as React from 'react';
import { Platform, ScrollView, Text, View, Image, AppRegistry, Button, Navigator, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

export class AddNewActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            T2: false,
            T3: false,
            T4: false,
            T5: false,
            T6: false,
            T7: false,
            CN: false,
            activity: "",
            time: '00:00',
            date: new Date(1598051730000),
            more:'time',
            show:false
            
        };
    }
    onChange =(event, date) =>{
        date = date||this.state.state;
        let hours ;
        let minute;
        if(date.getHours().toString().length==1){
            hours = "0"+date.getHours();
        }
        else{
            hours = date.getHours();
        }
        if(date.getMinutes().toString().length==1){
            minute = "0"+date.getMinutes();
        }
        else{
            minute = date.getMinutes();
        }
        let selectedTime = hours +":" + minute;
        console.log(selectedTime);
        this.setState({
            show: Platform.OS === 'ios'?true:false,
            date,
            time:selectedTime
        });
        // selectedTime => this.setState({time : selectedTime})
        console.log(this.state.time)
    }
    show = mode =>{
        this.setState({
            show:true,
            mode    
        });
    }
    datepicker=()=>{
        this.show('date');
    }
    timepicker=()=>{
        this.show('time');
    }
    render() {
        const show = this.state.show;
        const date =this.state.date;
        const mode = this.state.more;
        console.log(date);
        return (
            <ScrollView>
                <View>
                    <Text>Hoạt động</Text>
                    <RNPickerSelect
                        onValueChange={value => this.setState({ activity: value })}
                        items={[
                            { label: 'Sport', value: 'football' },
                            { label: 'Gym', value: 'baseball' }
                        ]}
                    />

                </View>
                <View>
                    <Text>Ngày thực hiện</Text>
                    <CheckBox
                        title='Thứ 2'
                        checked={this.state.T2}
                        onPress={() => this.setState({ T2: !this.state.T2 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.T3}
                        title='Thứ 3'
                        onPress={() => this.setState({ T3: !this.state.T3 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.T4}
                        title='Thứ 4'
                        onPress={() => this.setState({ T4: !this.state.T4 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.T5}
                        title='Thứ 5'
                        onPress={() => this.setState({ T5: !this.state.T5 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.T6}
                        title='Thứ 6'
                        onPress={() => this.setState({ T6: !this.state.T6 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.T7}
                        title='Thứ 7'
                        onPress={() => this.setState({ T7: !this.state.T7 })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                    <CheckBox
                        checked={this.state.CN}
                        title='Chủ Nhật'
                        onPress={() => this.setState({ CN: !this.state.CN })}
                        checkedIcon={<Image source={require('../../images/schedule/checked.png')} style={{ height: 20, width: 20 }} />}
                        uncheckedIcon={<Image source={require('../../images/schedule/unchecked.png')} style={{ height: 20, width: 20 }} />}
                    />
                </View>
                <View>
                    <Text>Giờ thông báo</Text>
                    <Input
                        placeholder='hour:minute'
                        leftIcon={
                            <Image source={require('../../images/schedule/run_icon.png')} style={{ width: 20, height: 20 }} />
                        }
                        onFocus = {this.timepicker}
                        value = {this.state.time}
                    />
                    {
                        show &&(
                        <DateTimePicker 
                        value = {date}
                        mode = {mode}
                        is24Hour = {true}
                        display = {'default'}
                        onChange = {this.onChange}
                        />
                        )}
                </View>
                <View>
                    <Button
                        title="Xác Nhận"
                        onPress={() => {
                            this.props.navigation.navigate('list')
                            }
                        }
                    />
                </View>
            </ScrollView>
        );
    }
}

var style = StyleSheet.create({
});