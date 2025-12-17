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
    Alert,
} from "react-native"
import { Picker } from "@react-native-picker/picker"
import React, { useState, useEffect } from "react"
import { globalStyle } from "../../constants/globalStyles"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router, useLocalSearchParams } from "expo-router";

export default function FormRegistrarDoseAplicada() {
    const params = useLocalSearchParams();

    // ESTADOS DE CONTROLE DO FLUXO
    const [listaVacinas, setListaVacinas] = useState<any[]>([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [registrosProntos, setRegistrosProntos] = useState<any[]>([]);

    // ESTADOS DO FORMULÁRIO (Inputs)
    const [fabricante, setFabricante] = useState("");
    const [dose, setDose] = useState("");
    const [via, setVia] = useState("");
    const [local, setLocal] = useState("");
    const [obs, setObs] = useState("");

    const [dataAtual, setDataAtual] = useState("");
    const [horaAtual, setHoraAtual] = useState("");

    useEffect(() => {
        if (params.vacinas) {
            try {
                const parsed = JSON.parse(params.vacinas as string);
                setListaVacinas(parsed);
            } catch (e) {
                console.error("Erro ao ler vacinas", e);
            }
        }

        const now = new Date();
        setDataAtual(now.toLocaleDateString('pt-BR'));
        setHoraAtual(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    }, []);

    const vacinaAtual = listaVacinas[indiceAtual];
    const isUltimaVacina = indiceAtual === listaVacinas.length - 1;

    const handleProximo = () => {
        if (!fabricante || !dose || !via) {
            Alert.alert("Atenção", "Preencha Fabricante, Dose e Via de aplicação.");
            return;
        }

        const registroAtual = {
            vacinaId: vacinaAtual._id,
            nomeVacina: vacinaAtual.nome,
            fabricante,
            dose,
            viaAplicacao: via,
            localAplicacao: local,
            observacoes: obs,
            dataAplicacao: new Date().toISOString(),
        };

        const novosRegistros = [...registrosProntos, registroAtual];
        setRegistrosProntos(novosRegistros);

        if (isUltimaVacina) {
            console.log("Todos os registros:", novosRegistros);

            router.push({
                pathname: '/revisao',
                params: {
                    registros: JSON.stringify(novosRegistros),
                    cns: params.cns
                }
            });
        } else {
            setIndiceAtual(indiceAtual + 1);
            limparFormulario();
        }
    };

    const limparFormulario = () => {
        setFabricante("");
        setDose("");
        setVia("");
        setLocal("");
        setObs("");
    };

    if (!vacinaAtual) return null;

    return (
        <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#0a76e9"} translucent={false} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled={true}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={globalStyle.container}>

                            <View style={globalStyle.header}>
                                <Text style={globalStyle.headerTitle}>Registrar Aplicação</Text>
                            </View>

                            <View style={styles.progressContainer}>
                                <Text style={styles.progressText}>
                                    Vacina {indiceAtual + 1} de {listaVacinas.length}
                                </Text>
                                <View style={styles.progressBarBg}>
                                    <View
                                        style={[
                                            styles.progressBarFill,
                                            { width: `${((indiceAtual + 1) / listaVacinas.length) * 100}%` }
                                        ]}
                                    />
                                </View>
                            </View>

                            <View style={styles.vacinaTitleCard}>
                                <MaterialIcons name="vaccines" size={28} color="#0a76e9" />
                                <Text style={styles.vacinaTitleText}>{vacinaAtual.nome}</Text>
                            </View>

                            {/* --- FORMULÁRIO --- */}
                            <View style={styles.inputWrapperLarge}>
                                <Text style={styles.labelInside}>Fabricante *</Text>
                                <Picker
                                    selectedValue={fabricante}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setFabricante(itemValue)}
                                >
                                    <Picker.Item label="Selecione uma opção" value="" color="#9CA3AF" />
                                    <Picker.Item label="Instituto Butantan" value="Butantan" />
                                    <Picker.Item label="Fiocruz" value="Fiocruz" />
                                    <Picker.Item label="Pfizer / Wyeth" value="Pfizer" />
                                    <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                                    <Picker.Item label="Janssen" value="Janssen" />
                                </Picker>
                                <View style={styles.divider} />
                                <TouchableOpacity style={styles.scanButton}>
                                    <MaterialIcons name="qr-code-scanner" size={24} color="#0a76e9" />
                                    <Text style={styles.scanButtonText}>Escanear Lote</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Dose *</Text>
                                    <Picker
                                        selectedValue={dose}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setDose(itemValue)}
                                    >
                                        <Picker.Item label="Selecione..." value="" color="#9CA3AF" />
                                        <Picker.Item label="1ª Dose" value="1ª Dose" />
                                        <Picker.Item label="2ª Dose" value="2ª Dose" />
                                        <Picker.Item label="Dose Única" value="Dose Única" />
                                        <Picker.Item label="1º Reforço" value="1º Reforço" />
                                        <Picker.Item label="2º Reforço" value="2º Reforço" />
                                        <Picker.Item label="Dose Adicional" value="Dose Adicional" />
                                    </Picker>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Via de Aplicação *</Text>
                                    <Picker
                                        selectedValue={via}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setVia(itemValue)}
                                    >
                                        <Picker.Item label="Selecione..." value="" color="#9CA3AF" />
                                        <Picker.Item label="Intramuscular (IM)" value="Intramuscular" />
                                        <Picker.Item label="Oral (VO)" value="Oral" />
                                        <Picker.Item label="Subcutânea (SC)" value="Subcutanea" />
                                    </Picker>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <Text style={styles.labelInside}>Local</Text>
                                    <Picker
                                        selectedValue={local}
                                        style={styles.picker}
                                        onValueChange={(itemValue) => setLocal(itemValue)}
                                    >
                                        <Picker.Item label="Padrão/Não Espec." value="Padrao" color="#9CA3AF" />
                                        {/* O erro dizia que 'BE' não servia. Use o texto completo */}
                                        <Picker.Item label="Braço Direito" value="Braço Direito" />
                                        <Picker.Item label="Braço Esquerdo" value="Braço Esquerdo" />
                                        <Picker.Item label="Vasto Lateral D." value="Vasto Lateral Direito" />
                                        <Picker.Item label="Vasto Lateral E." value="Vasto Lateral Esquerdo" />
                                        <Picker.Item label="Glúteo" value="Glúteo" />
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.textAreaWrapper}>
                                <Text style={styles.labelInside}>Observação</Text>
                                <TextInput
                                    placeholder="Anotações adicionais..."
                                    multiline={true}
                                    style={styles.textAreaInput}
                                    value={obs}
                                    onChangeText={setObs}
                                />
                            </View>

                            <View style={styles.autoInfoCard}>
                                <View style={styles.autoInfoHeader}>
                                    <MaterialIcons name="info-outline" size={20} color="#0a76e9" />
                                    <Text style={styles.autoInfoTitle}>Registro Automático</Text>
                                </View>
                                <View style={styles.autoInfoRow}>
                                    <Text style={styles.autoInfoLabel}>Data:</Text>
                                    <Text style={styles.autoInfoValue}>{dataAtual} às {horaAtual}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[globalStyle.button, isUltimaVacina ? { backgroundColor: '#059669' } : {}]}
                                activeOpacity={0.8}
                                onPress={handleProximo}
                            >
                                <Text style={styles.buttonText}>
                                    {isUltimaVacina ? "Finalizar e Revisar" : "Próxima Vacina →"}
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    progressContainer: {
        marginBottom: 16,
        paddingHorizontal: 4
    },
    progressText: {
        fontSize: 14,
        color: '#4B5563',
        marginBottom: 6,
        fontWeight: '600'
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#0a76e9',
        borderRadius: 3
    },
    vacinaTitleCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 1,
        borderLeftWidth: 4,
        borderLeftColor: '#0a76e9'
    },
    vacinaTitleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginLeft: 10,
        flex: 1
    },
    inputContainer: {
        flexDirection: "column",
        gap: 16,
        marginBottom: 16
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingTop: 8,
        height: 75,
        justifyContent: 'center'
    },
    inputWrapperLarge: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingTop: 8,
        marginBottom: 16,
        marginTop: 10
    },
    labelInside: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B7280',
        marginLeft: 14,
        marginBottom: -8,
        zIndex: 1
    },
    picker: {
        width: '100%',
        color: '#111827'
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 10
    },
    scanButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#F0F9FF',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    scanButtonText: {
        color: '#0a76e9',
        fontWeight: 'bold',
        marginLeft: 8
    },
    textAreaWrapper: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        height: 120,
        marginBottom: 20
    },
    textAreaInput: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        marginTop: 5
    },
    autoInfoCard: {
        backgroundColor: '#E0F2FE',
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#BAE6FD'
    },
    autoInfoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 6
    },
    autoInfoTitle: {
        color: '#0369A1',
        fontWeight: 'bold',
        fontSize: 16
    },
    autoInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    autoInfoLabel: {
        color: '#525252',
        fontWeight: '600'
    },
    autoInfoValue: {
        color: '#000',
        fontWeight: 'bold'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        paddingVertical: 14
    },
});