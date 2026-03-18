import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-web'
import Input from '../components/Input'

function save() {
    console.log("Mentés folyamatban...")
}

export default function Reg({ navigation }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Főoldal' onPress={() => navigation.navigate("Home")} />
            <Text>Reg</Text>
            <Input title="Név" onChangeText={setName}/>
            <Input title="Email" onChangeText={setEmail}/>
            <View style={styles.button}>
                <Button  title='Mentés' onPress={() => save()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button: {
        marginTop: "10px"
    }
})