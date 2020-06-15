import * as React from 'react';
import {Image,Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HealthScreen } from './HealthScreen'
import { SportScreen } from './SportScreen'
import {ScheduleScreen } from './ScheduleScreen'
import {AdviceScreen} from './AdviceScreen'
import {ProfileScreen} from './ProfileScreen'
const Tab = createBottomTabNavigator();
const DEVICE_HEIGHT = Dimensions.get('window').height;

export function Home() {
    return(
        
        <Tab.Navigator tabBarOptions={{style:{height: DEVICE_HEIGHT/12.5}}}>
            <Tab.Screen name='sport' component={SportScreen} 
                options={{
                    tabBarLabel: 'Sport',
                    tabBarIcon:() => (
                        <Image 
                            style={{height:40, width:50}}
                            source={require('../../images/tabhome/run.png')}
                        />
                    )
                }}
            />
            <Tab.Screen name='health' component={HealthScreen}
                options={{
                    tabBarLabel: 'Health',
                    tabBarIcon:() => (
                        <Image 
                            style={{height:40, width:50}}
                            source={require('../../images/tabhome/health.png')}
                        />
                    )
                }}
            />
            <Tab.Screen name='schedule' component={ScheduleScreen}
                options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon:() => (
                        <Image 
                            style={{height:40, width:50}}
                            source={require('../../images/tabhome/schedule.png')}
                        />
                    )
                }}
            />
            <Tab.Screen name='advice' component={AdviceScreen}
                options={{
                    tabBarLabel: 'Advice',
                    tabBarIcon:() => (
                        <Image 
                            style={{height:40, width:50}}
                            source={require('../../images/tabhome/advice.png')}
                        />
                    )
                }}
            />
            <Tab.Screen name='profile' component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon:() => (
                        <Image 
                            style={{height:40, width:50}}
                            source={require('../../images/tabhome/profileicon.png')}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    
    )

}
