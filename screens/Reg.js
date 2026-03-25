import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-web'
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {save} from '../services/VisitService'

export default function Reg({ navigation }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState(0)
    return (
        <View style={styles.container}>
            <Button title='Főoldal' onPress={() => navigation.navigate("Home")} />
            <Text>Eseményre való regisztrálás</Text>
            <Input title="Név" onChangeText={setName}/>
            <Input title="Email" onChangeText={setEmail}/>
            <View style={styles.button}>
                <Button  title='Mentés' onPress={() => save(name, email)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:0.3, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    button: {
        marginTop: "10px"
    }
})