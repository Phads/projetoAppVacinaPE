import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { globalStyle } from "../../constants/globalStyles";

export default function CarteiraVacinacao() {
  return (
    <ScrollView contentContainerStyle={globalStyle.container}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#0a76e9ff"}
        translucent={false}
      />
      <View style={globalStyle.header}>
        <Text style={globalStyle.headerTitle}>Carteira de Vacinação Digital</Text>
      </View>

      {/* HISTÓRICO - Nome */}
      <Text style={styles.sectionTitle}>Histórico de PEDRO</Text>

      {/* VACINAS INDICADAS */}
      <View style={styles.cardYellow}>
        <Text style={styles.cardYellowTitle}>Vacinas Indicadas para Hoje</Text>
        <Text style={styles.cardYellowSubtitle}>
          Com base na idade e histórico:
        </Text>

        <View style={styles.vacinaItem}>
          <View>
            <Text style={styles.vacinaNome}>INFLUENZA (H1N1+H3N2+B)</Text>
            <Text style={styles.vacinaDesc}>Dose Anual · Campanha 2024</Text>
          </View>
          <View style={styles.tagAplicar}>
            <Text style={styles.tagText}>Apl</Text>
          </View>
        </View>

        <View style={styles.vacinaItem}>
          <View>
            <Text style={styles.vacinaNome}>FEBRE AMARELA</Text>
            <Text style={styles.vacinaDesc}>Reforço · Rotina</Text>
          </View>
          <View style={styles.tagAplicar}>
            <Text style={styles.tagText}>Apl</Text>
          </View>
        </View>
      </View>

      {/* HISTÓRICO COMPLETO */}
      <Text style={styles.sectionTitle}>Histórico Completo</Text>

      <View style={styles.listaHistorico}>

        <View style={styles.historicoItem}>
          <Text style={styles.historicoNome}>ANTITETÂNICA</Text>
          <View style={styles.tagAplicada}>
            <Text style={styles.tagAplicadaText}>Apl</Text>
          </View>
        </View>

        <View style={styles.historicoItem}>
          <Text style={styles.historicoNome}>Gripe (Influenza)</Text>
          <View style={styles.tagAplicada}>
            <Text style={styles.tagAplicadaText}>Apl</Text>
          </View>
        </View>

        <View style={styles.historicoItem}>
          <Text style={styles.historicoNome}>Tríplice viral</Text>
          <View style={styles.tagAplicada}>
            <Text style={styles.tagAplicadaText}>Apl</Text>
          </View>
        </View>

        <View style={styles.historicoItem}>
          <Text style={styles.historicoNome}>Hepatite B</Text>
          <View style={styles.tagPendente}>
            <Text style={styles.tagPendenteText}>Pen</Text>
          </View>
        </View>
      </View>

      {/* Botão inferior */}
      <TouchableOpacity style={styles.buttonAplicar} activeOpacity={0.7}>
        <Text style={styles.buttonAplicarText}>Selecionar Vacina para Aplicação</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
    marginBottom: 12,
  },

  /* --- Card amarelo --- */
  cardYellow: {
    backgroundColor: "#FEF9C3",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  cardYellowTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardYellowSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },

  /* Vacinas recomendadas */
  vacinaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 6,
    backgroundColor: "#FFF",
    marginBottom: 12,
    elevation: 1
  },
  vacinaNome: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#1F2937",
  },
  vacinaDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  tagAplicar: {
    backgroundColor: "#2563EB",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
  },
  tagText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  /* Histórico completo */
  listaHistorico: {
    marginBottom: 20,
  },
  historicoItem: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1
  },
  historicoNome: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  tagAplicada: {
    backgroundColor: "#16A34A",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: "center",
  },
  tagAplicadaText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  tagPendente: {
    backgroundColor: "#DC2626",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    justifyContent: "center",
  },
  tagPendenteText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  /* Botão inferior */
  buttonAplicar: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    marginTop: 10,
    padding: 16,
    alignItems: "center",
  },
  buttonAplicarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  }
});
