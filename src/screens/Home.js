import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HealthScreen } from './HealthScreen'
import { SportScreen } from './SportScreen'
import {ScheduleScreen } from './ScheduleScreen'
import {AdviceScreen} from './AdviceScreen'
const Tab = createBottomTabNavigator();
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
