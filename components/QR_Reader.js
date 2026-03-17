import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'

function QR_Reader() {
    const [permission,requestPermission] = useCameraPermissions()
    const [scanned,setScanned] = React.useState(false)
    const handleBarcodeScanned=({type,data})=>{
        setScanned(true)
        alert("Üzenetem"+data)
    }

    if(!permission) return <View />
    if(!permission.granted){
        return(
            <View style={styles.container}>
                <Text>Engedély szükséges a kamerához!!!</Text>
                <Button 
                    title='Engedélyez'
                    onPress={requestPermission}
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <CameraView 
                style={StyleSheet.absoluteFill}
                facing='back'
                onBarcodeScanned={scanned?undefined:handleBarcodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes:["qr"]
                }}
            />
            {scanned && (
                <View style={styles.buttonContainer}>
                    <Button title='Vissza' onPress={()=>setScanned(false)}/>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
    }
})

export {QR_Reader}