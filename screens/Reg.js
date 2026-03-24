import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-web'
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage';

async function save(name, email) {
    console.log("Mentés folyamatban...")
    const url = "http://localhost:8000/api/visits"
    try {
       let response = await fetch(url, {
           method: "post",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               name: name,
               email: email,
               eventId:1
           })
       })
       let res = await response.json()
       console.log("Hozzáadás sikeres: \n",res.data)
       AsyncStorage.setItem("rendiId",res.data.id)
    } catch (error) {
        console.error("Hozzáadás sikertelen: \n",error)
    }
}

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