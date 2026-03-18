import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Reg from './screens/Reg'

const Stack = createNativeStackNavigator()
export default function RendiStack() {
  return (
    <Stack.Navigator >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Reg' component={Reg}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})