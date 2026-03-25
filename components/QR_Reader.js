// import { Button, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { CameraView, useCameraPermissions } from 'expo-camera'
// import { startArriving } from '../services/VisitService'

// function QR_Reader() {
//     const [permission, requestPermission] = useCameraPermissions()
//     const [scanned, setScanned] = React.useState(false)

//     const handleBarcodeScanned = ({ type, data }) => {
//         setScanned(true)
//         alert("Üzenetem" + data)
//         startArriving()
//     }
//     if (!permission) return <View />
//     if (!permission.granted) {
//         return (
//             <View style={styles.container}>
//                 <Text>Engedély szükséges a kamerához!!!</Text>
//                 <Button
//                     title='Engedélyez'
//                     onPress={requestPermission}
//                 />
//             </View>
//         )
//     }
//     return (
//         <View style={styles.container}>
//             <CameraView
//                 style={StyleSheet.absoluteFill}
//                 facing='back'
//                 onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
//                 barcodeScannerSettings={{
//                     barcodeTypes: ["qr"]
//                 }}
//             />
//             {scanned && (
//                 <View style={styles.buttonContainer}>
//                     <Button title='Vissza' onPress={() => setScanned(false)} />
//                 </View>
//             )}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000",
//         justifyContent: "center",
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 50,
//         left: 20,
//         right: 20,
//         backgroundColor: 'rgba(255,255,255,0.7)',
//         borderRadius: 10,
//     }
// })
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import flvjs from 'flv.js';

function QR_Reader() {
    const videoRef = useRef(null);
    const flvPlayerRef = useRef(null);
    
    // FIGYELEM: Ellenőrizd a portot a Vysorban, ha újraindítottad!
    const VYSOR_FLV_URL = "http://172.16.16.42:55123/flash.flv";

   useEffect(() => {
    if (Platform.OS === 'web' && flvjs.isSupported() && videoRef.current) {
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: VYSOR_FLV_URL,
            isLive: true,
            hasAudio: false,
            enableStashBuffer: false, // Fontos: ne puffereljen!
            stashInitialSize: 128,    // Azonnali indítás
        });

        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();

        // Eseményfigyelő a hibákhoz
        flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
            console.error("FLV Hiba:", errType, errDetail);
        });

        videoRef.current.play().catch(() => {
            console.log("Kattints a videóra az indításhoz!");
        });

        return () => {
            flvPlayer.destroy();
        };
    }
}, [VYSOR_FLV_URL]);

    // WEB-ES MEGJELENÍTÉS
    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <Text style={styles.webTitle}>Vysor Élő Stream (FLV)</Text>
                
                {/* A div-re tett onClick segít, ha a böngésző blokkolná az autostartot */}
                <div 
                    style={styles.webVideoWrapper} 
                    onClick={() => videoRef.current?.play()}
                >
                    <video
                        ref={videoRef}
                        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
                        autoPlay
                        muted
                        playsInline
                    />
                </div>
                
                <Text style={styles.helpText}>
                    Kattints a videóra, ha nem indulna el automatikusan!
                </Text>
            </View>
        );
    }

    // NATIVE (Mobil) MEGJELENÍTÉS
    return (
        <View style={styles.container}>
            <Text style={styles.webTitle}>A mobil nézet nem támogatja az FLV-t közvetlenül.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: 'center',
        justifyContent: 'center'
    },
    webTitle: {
        color: '#fff',
        padding: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    webVideoWrapper: {
        width: '90%',
        maxWidth: 800,
        aspectRatio: 16 / 9,
        backgroundColor: '#1a1a1a',
        cursor: 'pointer',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #333'
    },
    helpText: {
        color: '#888',
        fontSize: 12,
        marginTop: 15
    }
});

export { QR_Reader };