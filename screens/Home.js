import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { QR_Reader } from '../components/QR_Reader'
import { Button } from 'react-native'

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
        <Text>Home</Text>
        <QR_Reader />
        <Button title='Regisztrálás' onPress={()=>navigation.navigate("Reg")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:10
    }
})