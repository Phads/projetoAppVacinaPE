import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; // <--- Importante
import api from "../services/api"; 
import { buscarPacientePorCns } from "../services/pacienteServices";

export default function TelaRevisaoFinalizacao() {
  const params = useLocalSearchParams();
  
  // ESTADOS
  const [registros, setRegistros] = useState<any[]>([]);
  const [paciente, setPaciente] = useState<any>(null);
  
  // ESTADO PARA O PROFISSIONAL LOGADO
  const [profissionalLogado, setProfissionalLogado] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    carregarDadosCompletos();
  }, []);

  const carregarDadosCompletos = async () => {
    try {
        //Carrega vacinas (params)
        if (params.registros) {
            setRegistros(JSON.parse(params.registros as string));
        }

        //Carrega paciente (API)
        if (params.cns) {
            const dadosPaciente = await buscarPacientePorCns(params.cns as string);
            setPaciente(dadosPaciente);
        }

        //CARREGA USUÁRIO LOGADO (AsyncStorage)
        const jsonUser = await AsyncStorage.getItem('@app_vacina:usuario');
        if (jsonUser) {
            setProfissionalLogado(JSON.parse(jsonUser));
        } else {
            Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
            router.replace('/');
            return;
        }

    } catch (error) {
        console.error("Erro ao carregar revisão:", error);
        Alert.alert("Erro", "Falha ao carregar dados.");
    } finally {
        setLoading(false);
    }
  };

  const handleRegistrar = async () => {
    if (!isChecked) return Alert.alert("Confirmação", "Marque a caixa de confirmação.");
    if (!profissionalLogado) return Alert.alert("Erro", "Profissional não identificado.");

    setSending(true);

    try {
        const promessas = registros.map(registro => {
            const payload = {
                vacinaId: registro.vacinaId,
                profissionalId: profissionalLogado.id, 
                
                fabricante: registro.fabricante,
                doseAplicada: registro.dose,
                localAplicacao: registro.localAplicacao || "Não informado",
                observacoes: registro.observacoes,
                unidadeSaude: profissionalLogado.unidade || "Unidade Padrão"
            };

            return api.post('/api/vacinas/aplicar', payload);
        });

        await Promise.all(promessas);

        Alert.alert("Sucesso!", "Vacinas registradas com sucesso!", [
            { text: "OK", onPress: () => router.push('/home') }
        ]);

    } catch (error) {
        console.error("Erro backend:", error);
        Alert.alert("Erro", "Falha ao registrar. Tente novamente.");
    } finally {
        setSending(false);
    }
  };

  if (loading || !profissionalLogado) {
      return (
          <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
              <ActivityIndicator size="large" color="#0a76e9"/>
              <Text style={{marginTop: 10, color: '#666'}}>Carregando dados...</Text>
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#0a76e9"} translucent={false} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Revisão e Finalização</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        
        {/* Card de Aviso */}
        <View style={styles.warningCard}>
          <MaterialIcons name="error" size={32} color="#F59E0B" />
          <Text style={styles.warningText}>
            Registro permanente. Verifique os dados abaixo.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da Aplicação</Text>

          {/* DADOS DO PACIENTE */}
          <View style={[styles.sectionContainer, { backgroundColor: "#E2E8F0" }]}>
            <Text style={styles.sectionTitle}>Paciente</Text>
            {paciente && (
                <>
                    <View style={styles.mb2}>
                        <Text style={styles.label}>Nome:</Text>
                        <Text style={styles.valueLarge}>{paciente.nomeCompleto || paciente.nome}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>CNS:</Text>
                            <Text style={styles.value}>{paciente.cns}</Text>
                        </View>
                         <View style={styles.col}>
                            <Text style={styles.label}>CPF:</Text>
                            <Text style={styles.value}>{paciente.cpf}</Text>
                        </View>
                    </View>
                </>
            )}
          </View>

          {/* LISTA DE VACINAS */}
          {registros.map((reg, index) => (
             <View key={index} style={[styles.sectionContainer, { backgroundColor: "#F0FDF4", borderColor: '#BBF7D0', borderWidth: 1, marginTop: 10 }]}>
                <Text style={[styles.sectionTitle, { color: "#166534" }]}>
                    Vacina: {reg.nomeVacina}
                </Text>
                
                <View style={styles.dividerGreen} />

                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.labelGreen}>Dose:</Text>
                        <Text style={styles.valueGreen}>{reg.dose}</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.labelGreen}>Via:</Text>
                        <Text style={styles.valueGreen}>{reg.viaAplicacao}</Text>
                    </View>
                </View>

                <View style={styles.mb2}>
                    <Text style={styles.labelGreen}>Fabricante:</Text>
                    <Text style={styles.valueGreen}>{reg.fabricante}</Text>
                </View>
             </View>
          ))}

          {/* DADOS DO PROFISSIONAL LOGADO */}
          <View style={[styles.sectionContainer, { backgroundColor: "#E0F2FE", marginTop: 10 }]}>
            <Text style={[styles.sectionTitle, { color: "#0369A1" }]}>Responsável Técnico</Text>
            
            <View style={styles.mb2}>
                <Text style={styles.labelBlue}>Profissional:</Text>
                <Text style={styles.valueBlue}>{profissionalLogado.nome}</Text>
            </View>

             <View style={styles.row}>
                 <View style={styles.col}>
                    <Text style={styles.labelBlue}>COREN:</Text>
                    <Text style={styles.valueBlue}>{profissionalLogado.coren}</Text>
                </View>
            </View>

            <View style={styles.mb2}>
                <Text style={styles.labelBlue}>Unidade:</Text>
                <Text style={styles.valueBlue}>{profissionalLogado.unidade || "Unidade Padrão"}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
            style={styles.checkboxContainer} 
            activeOpacity={0.8}
            onPress={() => setIsChecked(!isChecked)}
        >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <MaterialIcons name="check" size={18} color="#FFF" />}
            </View>
            <Text style={styles.checkboxLabel}>
                Confirmo a aplicação e assumo a responsabilidade pelos dados.
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button, (!isChecked || sending) && styles.buttonDisabled]} 
            activeOpacity={0.8}
            onPress={handleRegistrar}
            disabled={!isChecked || sending}
        >
          {sending ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>FINALIZAR REGISTRO</Text>}
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: { backgroundColor: "#0a76e9", height: 60, justifyContent: "center", alignItems: "center", elevation: 3 },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  content: { flex: 1, padding: 16 },
  
  warningCard: { backgroundColor: "#FFFBEB", borderColor: "#FCD34D", borderWidth: 1, borderRadius: 12, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 12 },
  warningText: { flex: 1, color: "#92400E", fontWeight: "bold", fontSize: 13 },

  summaryCard: { backgroundColor: "#FFFFFF", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#E5E7EB", marginBottom: 20 },
  summaryTitle: { textAlign: "center", fontWeight: "bold", fontSize: 16, color: "#4B5563", marginBottom: 12 },

  sectionContainer: { borderRadius: 8, padding: 12, marginBottom: 4 },
  sectionTitle: { fontWeight: "bold", fontSize: 15, color: "#4B5563", marginBottom: 8, textTransform: 'uppercase' },
  dividerGreen: { height: 1, backgroundColor: '#BBF7D0', marginBottom: 8 },
  
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  col: { flex: 1, paddingRight: 4 },
  mb2: { marginBottom: 8 },
  
  label: { fontSize: 12, color: "#64748B" },
  value: { fontSize: 14, fontWeight: "bold", color: "#334155" },
  valueLarge: { fontSize: 15, fontWeight: "bold", color: "#1E293B" },

  labelGreen: { fontSize: 12, color: "#166534" },
  valueGreen: { fontSize: 14, fontWeight: "bold", color: "#14532D" },

  labelBlue: { fontSize: 12, color: "#0369A1" },
  valueBlue: { fontSize: 14, fontWeight: "bold", color: "#0C4A6E" },

  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', padding: 12, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: '#374151', marginRight: 12, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkboxChecked: { backgroundColor: '#374151', borderColor: '#374151' },
  checkboxLabel: { flex: 1, fontSize: 13, color: '#1F2937' },

  button: { backgroundColor: "#2563EB", paddingVertical: 14, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  buttonDisabled: { backgroundColor: "#93C5FD" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
});