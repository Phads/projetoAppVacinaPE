import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { globalStyle } from '../../constants/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NovoAtendimentoScreen() {
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

  const onPressResumo = () => {
    return router.push('./resumo');
  }

  return (
    <ScrollView contentContainerStyle={globalStyle.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#0a76e9ff"}
        translucent={false}
      />
      <View style={globalStyle.header}>
        <Text style={globalStyle.headerTitle}>Início / Novo Atendimento</Text>
      </View>

      <View style={styles.profCard}>
        <View style={styles.profCardHeader}>
          <Text style={styles.profLabel}>Profissional Logado:</Text>
          <TouchableOpacity style={styles.resumoButton} onPress={onPressResumo}>
            <Text style={styles.resumoText}>Resumo Plantão</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.profName}>
          {profissional ? profissional.nome : "Carregando..."}
        </Text>
        <Text style={styles.profCoren}>
          COREN: {profissional ? profissional.coren : "---"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Identificação Rápida</Text>

      <TouchableOpacity style={styles.scanCard} activeOpacity={0.8} onPress={() => router.navigate('./ler_qrcode')}>
        <Text style={styles.scanTitle}>Iniciar Leitura do Cartão SUS</Text>
        <Text style={styles.scanSubtitle}>Mais rápido e com menos erros.</Text>

        <View style={styles.iconContainer}>
          <Ionicons name="scan-outline" size={40} color="#FFF" />
        </View>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Busca Manual</Text>

      <TextInput
        style={globalStyle.input}
        placeholder="Digitar número do SUS ou CPF"
        placeholderTextColor="#9CA3AF"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.searchButton} activeOpacity={0.8} onPress={() => router.navigate('./dados_paciente')}>
        <Text style={styles.searchButtonText}>Buscar Paciente</Text>
      </TouchableOpacity>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Status do Plantão</Text>
        <Text style={styles.statusNumber}>45</Text>
        <Text style={styles.statusLabel}>Pacientes Registrados Hoje</Text>
        {/* <--- OBSERVAÇÃO: Lembre-se de implementar a lógica real de contagem depois */}
        <Text style={styles.statusLabel}>Contagem de pacientes</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profCard: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  profLabel: {
    color: '#BFDBFE',
    fontSize: 14,
  },
  resumoButton: {
    height: 30,
    justifyContent: "center",
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  resumoText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profCoren: {
    color: '#FFF',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 12,
    marginTop: 8,
  },
  scanCard: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  scanTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scanSubtitle: {
    color: '#BFDBFE',
    fontSize: 12,
    marginBottom: 16,
  },
  iconContainer: {
    marginTop: 8,
  },
  searchButton: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statusCard: {
    backgroundColor: '#E0F2FE',
    borderRadius: 16,
    padding: 24,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  statusNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#16A34A',
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: 14,
    color: '#4B5563',
  }
});