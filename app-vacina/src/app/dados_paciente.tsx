import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { globalStyle } from '../../constants/globalStyles';
import { router, useLocalSearchParams } from 'expo-router';

export default function ConfirmarDadosScreen() {
    const params = useLocalSearchParams();

    const [cns, setCns] = useState("---");
    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [nomeMae, setNomeMae] = useState("");

    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (params.dadosPaciente) {
            try {
                const dados = JSON.parse(params.dadosPaciente as string);

                setCns(dados.cns || "---")
                setNome(dados.nome || "")
                setDataNascimento(dados.dataNascimento || "---")
                setNomeMae(dados.nomeMae || "---")

                setTelefone(dados.telefone || "---")
                setEmail(dados.email || "---")
            } catch (error) {
                console.log("Erro ao processar dados: ", error);
            }
        }
    }, [params]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={globalStyle.container}
            keyboardVerticalOffset={40}
        >
            <ScrollView >
                <View style={globalStyle.header}>
                    <Text style={globalStyle.headerTitle}>Dados do Paciente</Text>
                </View>

                {/* --- SEÇÃO 1: DADOS PUXADOS (Leitura) --- */}
                <Text style={styles.sectionTitleBlue}>
                    Dados Puxados (CNS:{'\n'}{cns})
                </Text>

                {/* Campo Somente Leitura 1 */}
                <View style={styles.readOnlyInput}>
                    <Text style={styles.labelSmall}>Nome Completo</Text>
                    <Text style={styles.readOnlyValue}>{nome}</Text>
                </View>

                {/* Campo Somente Leitura 2 */}
                <View style={styles.readOnlyInput}>
                    <Text style={styles.labelSmall}>Data de Nascimento</Text>
                    <Text style={styles.readOnlyValue}>{dataNascimento}</Text>
                </View>

                {/* Campo Somente Leitura 3 */}
                <View style={styles.readOnlyInput}>
                    <Text style={styles.labelSmall}>Nome da Mãe</Text>
                    <Text style={styles.readOnlyValue}>{nomeMae}</Text>
                </View>


                {/* SEÇÃO 2: DADOS DE CONTATO (Edição) */}
                <Text style={styles.sectionTitleDark}>
                    Dados de Contato (Atualização)
                </Text>

                {/* Input Editável 1 */}
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholder='(XX) XXXXX-XXXX'
                />

                {/* Input Editável 2 */}
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder='emial@exemplo.com'
                />
                <View style={styles.divider} />

                <Text style={styles.questionText}>
                    Os dados do paciente estão corretos?
                </Text>

                <TouchableOpacity style={[globalStyle.button, styles.btnConfirm]} activeOpacity={0.8} onPress={() => router.push('/carteira_vacinacao')}>
                    <Text style={styles.btnConfirmText}>Confirmar Dados e Avançar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8}>
                    <Text style={styles.btnOutlineText}>Corrigir Dados (Abrir formulário)</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    sectionTitleBlue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2563EB',
        marginBottom: 16,
        lineHeight: 22,
    },
    sectionTitleDark: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4B5563',
        marginTop: 24,
        marginBottom: 16,
    },
    // Campos Somente Leitura (Cinza)
    readOnlyInput: {
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    labelSmall: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 2,
    },
    readOnlyValue: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        color: '#111827',
        marginBottom: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 20,
    },
    questionText: {
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: 16,
    },
    // Botões
    btnConfirm: {
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    btnConfirmText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnOutline: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#16A34A', // Verde
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    btnOutlineText: {
        color: '#16A34A', // Texto Verde
        fontWeight: 'bold',
        fontSize: 16,
    }
});