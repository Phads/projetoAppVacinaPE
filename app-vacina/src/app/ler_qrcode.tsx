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
        try {
            const dadosPaciente = JSON.parse(data);
            console.log("Dados identificados: ", dadosPaciente);

            if (!dadosPaciente.nome || !dadosPaciente.cns) {
                throw new Error("QR Code incompleto ou inválido");
            }

            router.push({
                pathname: "./dados_paciente",
                params: {
                    dadosPaciente: JSON.stringify(dadosPaciente)
                }
            });

        } catch (error) {
            Alert.alert(
                "QR Code Inválido",
                "Esta código não contem os dados do paciente esperados.",
                [
                    { text: "Tentar Novamente", onPress: () => { qrCodeLock.current = false } }
                ]
            );
        }

        {
            // Gere o qrCode, em texto, cole exatamente neste formato q e um JSON use o link abaixo para gerar o qr code (TEXTO)
            // Acesse: https://qr.io/pt/?gad_source=1&gad_campaignid=22781241288&gbraid=0AAAAAC6IOXL3EdscnKB4tYYMxyshR_2Id&gclid=Cj0KCQiAuvTJBhCwARIsAL6DemhyHmbUMti51YeHqyVe5CBZNVQ_fYkYMfjdm0hnSqOnp4hbGZMRungaAme7EALw_wcB
            //{
            //   "cns": "700543219876543",
            //   "nome": "MARIA DAS GRAÇAS SILVA",
            //   "dataNascimento": "15/03/1980",
            //   "nomeMae": "JOSEFA DA SILVA",
            //   "telefone": "(81) 98888-7777",
            //   "email": "maria.graca@email.com"
            //}
        }
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
                    if (data && !qrCodeLock.current) {
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