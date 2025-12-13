import { StyleSheet, View, Button, Text, Alert, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { router, useLocalSearchParams, Href } from "expo-router"; // Importe useLocalSearchParams
import { globalStyle } from "../../constants/globalStyles";
import { salvarPacienteQrCode } from "../services/pacienteServices"; // Ajuste o caminho se necessário

export default function LerQrCode() {
    const [permission, requestPermission] = useCameraPermissions();
    const [loading, setLoading] = useState(false);

    // Recupera o destino (se houver)
    const { proximaTela } = useLocalSearchParams();

    const qrCodeLock = useRef(false);

    useEffect(() => {
        if (permission && !permission.granted) {
            requestPermission();
        }
    }, [permission]);

    async function handleQRCodeRead(data: string) {
        try {
            // 1. Tenta converter o texto do QR Code para JSON
            const dadosPaciente = JSON.parse(data);
            console.log("Dados lidos do QR:", dadosPaciente);

            // 2. Validação básica dos campos OBRIGATÓRIOS
            if (!dadosPaciente.nome || !dadosPaciente.cns) {
                throw new Error("O QR Code não tem Nome ou CNS.");
            }

            setLoading(true); 

            console.log(" Enviando para o backend...");
            await salvarPacienteQrCode(dadosPaciente);
            console.log("Salvo com sucesso!");


            const destino = proximaTela ? (proximaTela as string) : "./dados_paciente";

            router.replace({
                pathname: destino as any,
                params: {
                    cns: dadosPaciente.cns,
                    dadosIniciais: JSON.stringify(dadosPaciente)
                }
            });

        } catch (error: any) {
            setLoading(false);
            console.error("ERRO DETALHADO:", error); // OLHE O TERMINAL PARA VER ESSE ERRO

            let mensagemErro = "Não foi possível processar o código.";

            // Tenta descobrir o tipo de erro para ajudar o usuário
            if (error instanceof SyntaxError) {
                mensagemErro = "O formato do QR Code não é um JSON válido.";
            } else if (error.message.includes("Network Error") || error.message.includes("failed")) {
                mensagemErro = "Erro de conexão com o servidor. Verifique se o backend está rodando.";
            } else if (error.response) {
                // Erro que veio do backend (ex: erro 500)
                mensagemErro = `Erro do Servidor: ${error.response.status}`;
            }

            Alert.alert(
                "Erro na Leitura",
                mensagemErro,
                [
                    { text: "Tentar Novamente", onPress: () => { qrCodeLock.current = false } }
                ]
            );
        }
    }

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={[globalStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ marginBottom: 20, textAlign: 'center' }}>
                    Precisamos de acesso à câmera.
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
                    if (data && !qrCodeLock.current && !loading) {
                        qrCodeLock.current = true;
                        handleQRCodeRead(data);
                    }
                }}
            />

            {/* Loading Overlay */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={{ color: 'white', marginTop: 10 }}>Processando...</Text>
                </View>
            )}

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
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    }
});