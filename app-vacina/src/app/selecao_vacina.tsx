import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { globalStyle } from "../../constants/globalStyles";
import { useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather";

export default function SelecaoVacina() {
  const router = useRouter();

  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [erro, setErro] = useState("");

  const toggleSelecionar = (id: string) => {
    setSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
    setErro(""); // limpa erro ao selecionar
  };

  const avancar = () => {
    if (selecionadas.length === 0) {
      setErro("Selecione pelo menos uma vacina para continuar.");
      return;
    }

    // enviar as vacinas selecionadas para a próxima tela
    router.push({
      pathname: "./registro_dose",
      params: { vacinas: JSON.stringify(selecionadas) },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0a76e9ff" />

      {/* HEADER COM SETA */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/carteira_vacinacao")}
        >
        <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Seleção da Vacina</Text>
      </View>

      <ScrollView contentContainerStyle={[globalStyle.container, { paddingTop: 10 }]}>
        
        {/* MENSAGEM DE ERRO */}
        {erro !== "" && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{erro}</Text>
          </View>
        )}

        {/* BUSCA */}
        <TextInput
          placeholder="Buscar/Filtrar Vacinas Ativas"
          style={styles.inputSearch}
          placeholderTextColor="#9CA3AF"
        />

        {/* VACINAS INDICADAS */}
        <TouchableOpacity
          style={[
            styles.cardVacina,
            selecionadas.includes("influenza1") && styles.cardSelecionado,
          ]}
          onPress={() => toggleSelecionar("influenza1")}
          activeOpacity={0.7}
        >
          <Text style={styles.vacinaNome}>INFLUENZA (H1N1/H3N2/B)</Text>
          <Text style={styles.vacinaDesc}>Dose Anual</Text>
          <Text style={styles.vacinaDesc}>Campanha: Campanha agulha neles</Text>

          <View style={styles.tagIndicada}>
            <Text style={styles.tagIndicadaText}>INDICADA</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.cardVacina,
            selecionadas.includes("influenza2") && styles.cardSelecionado,
          ]}
          onPress={() => toggleSelecionar("influenza2")}
          activeOpacity={0.7}
        >
          <Text style={styles.vacinaNome}>INFLUENZA (H1N1/H3N2/B)</Text>
          <Text style={styles.vacinaDesc}>Dose Anual</Text>
          <Text style={styles.vacinaDesc}>Campanha: Campanha agulha neles</Text>

          <View style={styles.tagIndicada}>
            <Text style={styles.tagIndicadaText}>INDICADA</Text>
          </View>
        </TouchableOpacity>

        {/* OUTRAS VACINAS */}
        <Text style={styles.sectionTitle}>Outras Vacinas (Rotina)</Text>

        <TouchableOpacity
          style={[
            styles.cardBranco,
            selecionadas.includes("hpv") && styles.cardSelecionado,
          ]}
          onPress={() => toggleSelecionar("hpv")}
          activeOpacity={0.7}
        >
          <Text style={styles.outroNome}>HPV</Text>
          <Text style={styles.outroDesc}>2ª Dose (Indicada por idade)</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTÃO FIXO NO RODAPÉ */}
      <TouchableOpacity style={styles.botaoAvancar} onPress={avancar}>
        <Text style={styles.botaoAvancarText}>Avançar para Registro da Dose</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    backgroundColor: "#0a76e9ff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* ERRO */
  errorBox: {
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
  },

  inputSearch: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },

  /* CARDS */
  cardVacina: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    elevation: 1,
  },

  cardBranco: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 14,
    elevation: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardSelecionado: {
    borderColor: "#2563EB",
    borderWidth: 2,
    backgroundColor: "#EFF6FF",
  },

  vacinaNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },

  vacinaDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  outroNome: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "bold",
  },

  outroDesc: {
    fontSize: 12,
    color: "#6B7280",
  },

  tagIndicada: {
    backgroundColor: "#059669",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  tagIndicadaText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 10,
    marginBottom: 8,
  },

  /* BOTÃO RODAPÉ */
  botaoAvancar: {
    backgroundColor: "#2563EB",
    padding: 16,
    alignItems: "center",
  },
  botaoAvancarText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
