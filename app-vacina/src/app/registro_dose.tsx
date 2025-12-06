import {
    View,
    Text,
    TextInput,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import React, { useState, useEffect } from "react"
import { globalStyle } from "../../constants/globalStyles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function FormRegistrarDoseAplicada() {

    const [selectedFabricante, setSelectedFabricante] = useState();
    const [selectedDose, setSelectedDose] = useState();
    const [selectedViaAplicacao, setSelectedViaAplicacao] = useState();
    const [selectedLocalAplicacao, setSelectedLocalAplicacao] = useState();

    const [dataAtual, setDataAtual] = useState("");
    const [horaAtual, setHoraAtual] = useState("");

    useEffect(() => {
        const now = new Date();
        setDataAtual(now.toLocaleDateString('pt-BR'));
        setHoraAtual(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, []);

    return (
        // Wrapper principal flex: 1 é essencial
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={"#0a76e9"}
                translucent={false}
            />

            {/* ESTRATÉGIA BLINDADA:
               1. O KeyboardAvoidingView envolve TUDO abaixo da StatusBar.
               2. No Android, usamos 'undefined' ou 'height'. Se seu app.json estiver como 'resize', 
                  usar 'padding' no Android quebra tudo. Vamos tentar deixar o OS lidar com isso no Android.
            */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled={true}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={globalStyle.container}>
                            
                            <View style={globalStyle.header}>
                                <Text style={globalStyle.headerTitle}>Vacina: Dados de aplicação</Text>
                            </View>

                            <View style={styles.inputWrapperLarge}>
                                <Text style={styles.labelInside}>Fabricante *</Text>
                                <Picker
                                    selectedValue={selectedFabricante}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setSelectedFabricante(itemValue)}
                                >
                                    <Picker.Item label="Selecione uma opção" value="" color="#9CA3AF" />
                                    <Picker.Item label="Instituto Butantan" value="butantan" />
                                    <Picker.Item label="Fiocruz" value="fiocruz" />
                                    <Picker.Item label="Pfizer / Wyeth" value="pfizer_wyeth" />
                                    <Picker.Item label="AstraZeneca" value="astraz" />
                                    <Picker.Item label="Janssen" value="janssen" />
                                    <Picker.Item label="Sanofi" value="sanofi" />
                                </Picker>
                                <View style={styles.divider} />
                                <TouchableOpacity style={styles.scanButton}>
                                    <MaterialIcons name="qr-code-scanner" size={24} color="#0a76e9" />
                                    <Text style={styles.scanButtonText}>Escanear Lote/Fabricante</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Dose *</Text>
                                    <Picker
                                        selectedValue={selectedDose}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setSelectedDose(itemValue)}
                                    >
                                        <Picker.Item label="Selecione..." value="" color="#9CA3AF" />
                                        <Picker.Item label="1ª Dose" value="d1" />
                                        <Picker.Item label="2ª Dose" value="d2" />
                                        <Picker.Item label="Dose Única" value="du" />
                                        <Picker.Item label="1º Reforço" value="r1" />
                                        <Picker.Item label="2º Reforço" value="r2" />
                                        <Picker.Item label="Dose Adicional" value="da" />
                                    </Picker>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Via de Aplicação *</Text>
                                    <Picker
                                        selectedValue={selectedViaAplicacao}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setSelectedViaAplicacao(itemValue)}
                                    >
                                        <Picker.Item label="Selecione..." value="" color="#9CA3AF" />
                                        <Picker.Item label="Intramuscular (IM)" value="im" />
                                        <Picker.Item label="Oral (VO)" value="vo" />
                                        <Picker.Item label="Subcutânea" value="sc" />
                                        <Picker.Item label="Intradérmica (ID)" value="id" />
                                    </Picker>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Local da aplicação</Text>
                                    <Picker
                                        selectedValue={selectedLocalAplicacao}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setSelectedLocalAplicacao(itemValue)}
                                    >
                                        <Picker.Item label="Selecione..." value="" color="#9CA3AF" />
                                        <Picker.Item label="Braço Direito" value="braco_d" />
                                        <Picker.Item label="Braço Esquerdo" value="braco_e" />
                                        <Picker.Item label="Coxa Direita" value="coxa_d" />
                                        <Picker.Item label="Coxa Esquerda" value="coxa_e" />
                                        <Picker.Item label="Glúteo" value="gluteo" />
                                        <Picker.Item label="Boca" value="boca" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.textAreaWrapper}>
                                <Text style={styles.labelInside}>Observação</Text>
                                <TextInput
                                    placeholder="Anotações adicionais..."
                                    multiline={true}
                                    style={styles.textAreaInput} 
                                />
                            </View>

                            <View style={styles.autoInfoCard}>
                                <View style={styles.autoInfoHeader}>
                                    <MaterialIcons name="info-outline" size={20} color="#0a76e9" />
                                    <Text style={styles.autoInfoTitle}>Registro Automático</Text>
                                </View>
                                <View style={styles.autoInfoRow}>
                                    <Text style={styles.autoInfoLabel}>Data:</Text>
                                    <Text style={styles.autoInfoValue}>{dataAtual}</Text>
                                </View>
                                <View style={styles.autoInfoRow}>
                                    <Text style={styles.autoInfoLabel}>Horário:</Text>
                                    <Text style={styles.autoInfoValue}>{horaAtual}</Text>
                                </View>
                                <View style={styles.autoInfoRow}>
                                    <Text style={styles.autoInfoLabel}>Local:</Text>
                                    <Text style={styles.autoInfoValue}>exemplo (Padrão)</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={globalStyle.button} activeOpacity={0.8}>
                                <Text style={styles.buttonText}>Confirmar e avançar</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "column",
        gap: 16,
        marginBottom: 16,
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingTop: 8,
        height: 75,
        justifyContent: 'center',
    },
    inputWrapperLarge: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingTop: 8,
        marginBottom: 16,
        marginTop: 10,
    },
    labelInside: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B7280',
        marginLeft: 14,
        marginBottom: -8,
        zIndex: 1,
    },
    picker: {
        width: '100%',
        color: '#111827',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 10,
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#F0F9FF',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    scanButtonText: {
        color: '#0a76e9',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    textAreaWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        height: 120,
        marginBottom: 20,
    },
    textAreaInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        marginTop: 5,
    },
    autoInfoCard: {
        backgroundColor: '#E0F2FE',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#BAE6FD',
    },
    autoInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 6,
    },
    autoInfoTitle: {
        color: '#0369A1',
        fontWeight: 'bold',
        fontSize: 16,
    },
    autoInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    autoInfoLabel: {
        color: '#525252',
        fontWeight: '600',
    },
    autoInfoValue: {
        color: '#000',
        fontWeight: 'bold',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 14,
    }
});