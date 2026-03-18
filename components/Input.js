import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native'

export default function Input({title="",onChangeText,value}) {
  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>{title}</Text>
      <TextInput onChangeText={onChangeText}
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"pink",
        padding:"5px",
        borderRadius:"10px",
        marginTop:10
    },
    containerText:{
        fontWeight:"bold",
        color:"white",
        alignSelf:"center",
        textDecorationLine:"underline",
        marginBottom:5
    },
    textInput:{
        backgroundColor:"brown",
        border:"1px solid green",
        borderRadius:20,
        color:"white",
        fontSize:20,
        textAlign:"center"
    }
})