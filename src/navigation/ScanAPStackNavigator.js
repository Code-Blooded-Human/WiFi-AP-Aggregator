import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import SetLocation from '../screens/scanAP/SetLocation'
import ShowAP from '../screens/scanAP/ShowAP'
import FindAP from '../screens/scanAP/FindAP'
import Home from '../screens/Home'
const Stack = createStackNavigator()

function ScanAPStackNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
          name='SetLocation'
          component={SetLocation}
          options={{ title: 'Set Location' }}
        />
        <Stack.Screen
          name='FindAP'
          component={FindAP}
          options={{ title: 'Find AP' }}
        />
        <Stack.Screen
        name='ShowAP'
        component={ShowAP}
        options={{ title: 'Show AP' }}
        />
        <Stack.Screen 
        name='Home'
        component={Home}
        options={{title:'Home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ScanAPStackNavigator