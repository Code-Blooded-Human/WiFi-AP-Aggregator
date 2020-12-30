import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import Detail from '../screens/Detail'
import ScanAP from '../screens/scanAP/ScanAP'
import ShowAP from '../screens/scanAP/ShowAP'
import ViewAPMap from '../screens/ViewAPMap'
import SelectNearbyAP from '../screens/SelectNearbyAP'
import FindLocation from '../screens/FindLocation'
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator 
        >
        <Stack.Screen 
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ title: 'Detail Screen' }}
        />
        <Stack.Screen
          name='ScanAP'
          component={ScanAP}
          options={{ title: 'Scan AP' }}
        />
        <Stack.Screen
        name='ShowAP'
        component={ShowAP}
        options={{ title: 'Show AP' }}
      />
      <Stack.Screen
      name='ViewAPMap'
      component={ViewAPMap}
      options={{ title: 'ViewAPMap' }}
    />
    <Stack.Screen 
      name="SelectNearbyAP"
      component={SelectNearbyAP}
      options={{title:'Select Nearby AP'}}
    />
    <Stack.Screen 
    name="FindLocation"
    component={FindLocation}
    options={{title:'FindLocation by WiFi'}}
  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator