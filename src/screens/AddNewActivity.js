import * as React from 'react';
import { ScrollView,Text, View, Image, AppRegistry, Button,Navigator,StyleSheet,TouchableOpacity } from 'react-native';
import { CheckBox,Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ScheduleScreen from './ScheduleScreen';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
{/*npm install react-native-picker-select */}

export class AddNewActivity extends React.Component{
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
            activity:"",
            time:'20:00'
        };
      }
    xacnhan(){
        this.props.navigation.goBack();
    }
    render(){
        return (
          <ScrollView>
            <View>
              <Text>Hoạt động</Text>
              <RNPickerSelect
                onValueChange={value =>
                  this.setState({activity: value})
                }
                items={[
                  {label: 'Sport', value: 'football'},
                  {label: 'Gym', value: 'baseball'},
                ]}
              />
              {/* <Input
                        placeholder='input Your Activity'
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='black'
                            />
                        }
                        onChangeText={value => this.setState({ activity: value })}
                    /> */}
            </View>
            <View>
              <Text>Ngày thực hiện</Text>
              <CheckBox
                title="Thứ 2"
                checked={this.state.T2}
                onPress={() => this.setState({T2: !this.state.T2})}
              />
              <CheckBox
                checked={this.state.T3}
                title="Thứ 3"
                onPress={() => this.setState({T3: !this.state.T3})}
              />
              <CheckBox
                checked={this.state.T4}
                title="Thứ 4"
                onPress={() => this.setState({T4: !this.state.T4})}
              />
              <CheckBox
                checked={this.state.T5}
                title="Thứ 5"
                onPress={() => this.setState({T5: !this.state.T5})}
              />
              <CheckBox
                checked={this.state.T6}
                title="Thứ 6"
                onPress={() => this.setState({T6: !this.state.T6})}
              />
              <CheckBox
                checked={this.state.T7}
                title="Thứ 7"
                onPress={() => this.setState({T7: !this.state.T7})}
              />
              <CheckBox
                checked={this.state.CN}
                title="Chủ Nhật"
                onPress={() => this.setState({CN: !this.state.CN})}
              />
            </View>
            <View>
              <Text>Giờ thông báo</Text>
              <DatePicker
                style={{width: 200}}
                date={this.state.time}
                mode="time"
                format="HH:mm"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                minuteInterval={10}
                onDateChange={time => {
                  this.setState({time: time});
                }}
              />
              {/* <Input
                        placeholder='hour:minute'
                        leftIcon={
                            <Icon
                            name='times'
                            size={24}
                            color='black'
                            />
                        }
                        onChangeText={value => this.setState({ time: value })}
                    /> */}
            </View>
            <View>
              <Button
                title="Xác Nhận"
                onPress={() => {
                  this.props.navigation.navigate('list');
                }}
              />
            </View>
          </ScrollView>
        );
    }
}

var style = StyleSheet.create({
});