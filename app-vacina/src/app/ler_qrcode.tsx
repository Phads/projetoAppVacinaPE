import { StyleSheet, View, Button, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useEffect } from 'react';
import { router } from "expo-router";
import { globalStyle } from "../../constants/globalStyles";

export default function LerQrCode() {
    const [permission, requestPermission] = useCameraPermissions();
    
    const qrCodeLock = useRef(false);

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    function handleQRCodeRead(data: string) {
        console.log("QR Code Lidas:", data);
        
        // LÓGICA DO QUE FAZER COM O DADO
    }

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={[globalStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ marginBottom: 20, textAlign: 'center' }}>
                    Precisamos de acesso à câmera para ler o cartão SUS.
                </Text>
                <Button title="Permitir Câmera" onPress={requestPermission} />
                <Button title="Voltar" onPress={() => router.back()} color="red" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView 
                style={StyleSheet.absoluteFillObject}
                facing="back" 
                onBarcodeScanned={({ data }) => {
                    if(data && !qrCodeLock.current){
                        qrCodeLock.current = true;
                        handleQRCodeRead(data);
                    }
                }}
            />

            <View style={styles.footer}>
                <Button title="Cancelar" color="#EF4444" onPress={() => router.back()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 50,
        left: 32,
        right: 32,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        padding: 10,
    },
});