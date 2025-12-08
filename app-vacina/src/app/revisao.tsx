import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

// Simulando os dados que viriam via props/route
const dadosMock = {
  paciente: {
    data: "21/10/2025",
    nascimento: "19/05/2002",
    cns: "123456789012345",
    cpf: "123.456.789-10",
  },
  vacina: {
    nome: "INFLUENZA (H1N1/H3N2/B)",
    dose: "1ª dose",
    lote: "dasa12LK21",
    fabricante: "Butantan",
  },
  aplicacao: {
    via: "Intramuscular(IM)",
    local: "Glúteo",
    data: "21/10/2025",
    horario: "14:54",
    profissional: "Enf. Ana Cascalho P. Souza",
    unidade: "Policlínica Rio Doce IV - Olinda/PE",
    observacao: "Descrição que o profissional digitou na tela de detalhes...",
  },
};

export default function TelaRevisaoFinalizacao() {
  const [isChecked, setIsChecked] = useState(false);

  const handleRegistrar = () => {
    if (!isChecked) return alert("Por favor, confirme os dados antes de prosseguir.");
    console.log("Registrando aplicação...", dadosMock);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#0a76e9"}
        translucent={false}
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Revisão e Finalização</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.warningCard}>
          <MaterialIcons name="error" size={32} color="#F59E0B" />
          <Text style={styles.warningText}>
            Após confirmar, o registro será permanente e não poderá ser editado.
            Verifique todos os dados com atenção.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo da aplicação</Text>

          <View style={[styles.sectionContainer, { backgroundColor: "#E2E8F0" }]}>
            <Text style={styles.sectionTitle}>Paciente</Text>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{dadosMock.paciente.data}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>CNS:</Text>
                <Text style={styles.value}>{dadosMock.paciente.cns}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Nascimento:</Text>
                <Text style={styles.value}>{dadosMock.paciente.nascimento}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>CPF:</Text>
                <Text style={styles.value}>{dadosMock.paciente.cpf}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sectionContainer, { backgroundColor: "#DCFCE7" }]}>
            <Text style={[styles.sectionTitle, { color: "#166534" }]}>Vacina</Text>
            
            <View style={styles.mb2}>
                <Text style={styles.labelGreen}>Nome:</Text>
                <Text style={styles.valueGreenLarge}>{dadosMock.vacina.nome}</Text>
            </View>

            <View style={styles.mb2}>
                <Text style={styles.labelGreen}>Dose:</Text>
                <Text style={styles.valueGreenLarge}>{dadosMock.vacina.dose}</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.labelGreen}>Lote:</Text>
                <Text style={styles.valueGreen}>{dadosMock.vacina.lote}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.labelGreen}>Fabricante:</Text>
                <Text style={styles.valueGreen}>{dadosMock.vacina.fabricante}</Text>
              </View>
            </View>
          </View>

          <View style={[styles.sectionContainer, { backgroundColor: "#E0F2FE" }]}>
            <Text style={[styles.sectionTitle, { color: "#0369A1" }]}>Aplicação</Text>
            
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Via:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.via}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Local:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.local}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Data:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.data}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Horário:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.horario}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Profissional:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.profissional}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.labelBlue}>Unidade:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.unidade}</Text>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
                <Text style={styles.labelBlue}>Observação:</Text>
                <Text style={styles.valueBlue}>{dadosMock.aplicacao.observacao}</Text>
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
                Confirmo a aplicação da vacina e a exatidão dos dados registrados acima. 
                Estou ciente que esse registro é permanente.
            </Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.button, !isChecked && styles.buttonDisabled]} 
            activeOpacity={0.8}
            onPress={() => router.navigate('./confirmacao_registro')}
            disabled={!isChecked}
        >
          <Text style={styles.buttonText}>REGISTRAR APLICAÇÃO</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#0a76e9",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  
  warningCard: {
    backgroundColor: "#FFFBEB", 
    borderColor: "#FCD34D", 
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  warningText: {
    flex: 1,
    color: "#92400E", 
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 18,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  summaryTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 12,
  },

  sectionContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  col: {
    flex: 1,
    paddingRight: 4,
  },
  mb2: {
    marginBottom: 8,
  },
  label: { fontSize: 12, color: "#64748B" },
  value: { fontSize: 14, fontWeight: "bold", color: "#334155" },

  labelGreen: { fontSize: 12, color: "#166534" }, // Verde escuro
  valueGreen: { fontSize: 14, fontWeight: "bold", color: "#14532D" },
  valueGreenLarge: { fontSize: 15, fontWeight: "bold", color: "#14532D" },

  labelBlue: { fontSize: 12, color: "#0369A1" }, // Azul escuro
  valueBlue: { fontSize: 14, fontWeight: "bold", color: "#0C4A6E" },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#374151',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#374151',
    borderColor: '#374151',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
    lineHeight: 18,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#93C5FD",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: 'uppercase'
  },
});