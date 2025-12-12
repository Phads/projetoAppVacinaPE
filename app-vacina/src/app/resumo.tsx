import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { globalStyle } from "../../constants/globalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResumoScreen() {

    const [profissional, setProfissional] = useState<any>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('usuario_logado');
            if (jsonValue !== null) {
                const dados = JSON.parse(jsonValue);
                setProfissional(dados);
            }
        } catch (e) {
            console.log("Erro ao recuperar dados. Limpando sessão corrompida.", e);

            await AsyncStorage.removeItem('usuario_logado');
            setProfissional(null);
        }
    };

    const onPressNovoPaciente = () => {
        return router.push('/home');
    }

    return (
        <ScrollView contentContainerStyle={globalStyle.container}>
            <StatusBar
                barStyle={"light-content"}
                backgroundColor={"#0a76e9ff"}
                translucent={false}
            />
            <View style={globalStyle.header}>
                <Text style={globalStyle.headerTitle}>
                    Resumo do Plantão
                </Text>
            </View>
            <Text style={styles.headerText}>
                {profissional ? profissional.nome : "Carregando..."}
            </Text>

            <View style={styles.card}>
                <View style={styles.greenAccentBar} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Total de Doses Aplicadas Hoje:</Text>
                    <Text style={styles.cardValue}>0</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.greenAccentBar} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Pacientes atendidos:</Text>
                    <Text style={styles.cardValue}>0</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Vacinas mais aplicadas</Text>
                    <Text style={styles.placeholderText}>Nenhum paciente atendido ainda</Text>
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Últimos 5 pacientes atendidos:</Text>
                    <Text style={styles.placeholderText}>Nenhum paciente atendido ainda</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={onPressNovoPaciente}>
                <Text style={styles.buttonText}>Novo paciente</Text>
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E88E5',
        textAlign: 'center',
        marginBottom: 25,
        marginTop: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 15,
        minHeight: 100,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    greenAccentBar: {
        width: 8,
        backgroundColor: '#4CAF50',
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    placeholderText: {
        fontSize: 14,
        color: '#9E9E9E',
        fontStyle: 'italic',
        marginTop: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1E88E5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
        shadowColor: '#1E88E5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});

