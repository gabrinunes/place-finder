import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native'
const AppStack = createStackNavigator();

import Places from './pages/Places'

export default function Routes(){
    return (
     <NavigationContainer>
         <AppStack.Navigator>
             <AppStack.Screen name="Places" component={Places}/>
         </AppStack.Navigator>
     </NavigationContainer>
    )
}