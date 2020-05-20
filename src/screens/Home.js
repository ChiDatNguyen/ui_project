import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { HealthScreen } from './HealthScreen'
import { SportScreen } from './SportScreen'
import {ScheduleScreen } from './ScheduleScreen'
import {AdviceScreen} from './AdviceScreen'
import { AddNewActivity } from './AddNewActivity';
import { View } from 'react-native';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export function Home() {
    return(
        <Tab.Navigator>
            <Tab.Screen name='sport' component={SportScreen}/>
            <Tab.Screen name='health' component={HealthScreen}/>
            <Tab.Screen name='schedule' component={ScheduleScreen}/>
            <Tab.Screen name='advice' component={AdviceScreen}/>
        </Tab.Navigator>
    )

}
