import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Feather from "react-native-vector-icons/Feather";

import api from "../services/api";

export default function SelecaoVacina() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [listaVacinas, setListaVacinas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [erro, setErro] = useState("");

  // 1. Carregar Vacinas usando o seu Axios (api)
  useEffect(() => {
    fetchVacinas();
  }, []);

  const fetchVacinas = async () => {
    try {
      const response = await api.get('/api/vacinas');

      const data = response.data;
      const disponiveis = data.filter((v: any) => v.status === 'Pendente');
      setListaVacinas(disponiveis);

    } catch (error) {
      console.error("Erro ao buscar vacinas:", error);
      Alert.alert("Erro", "Não foi possível carregar o catálogo de vacinas.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelecionar = (id: string) => {
    setSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
    setErro("");
  };

  const avancar = () => {
    if (selecionadas.length === 0) {
      setErro("Selecione qual vacina será aplicada.");
      return;
    }
    const vacinasParaEnviar = listaVacinas.filter(v => selecionadas.includes(v._id));

    router.push({
      pathname: "./registro_dose",
      params: { vacinas: JSON.stringify(vacinasParaEnviar), cns: params.cns },
    });
  };

  const termoBusca = busca ? busca.toLowerCase().trim() : "";

  const vacinasFiltradas = listaVacinas.filter((v) => {
    // Se não tiver busca, retorna tudo
    if (termoBusca === "") return true;

    const nome = v.nome ? v.nome.toLowerCase() : "";
    const tipo = v.tipo ? v.tipo.toLowerCase() : "";
    const obs = v.observacoes ? v.observacoes.toLowerCase() : ""; 

    return (
      nome.includes(termoBusca) ||
      tipo.includes(termoBusca) ||
      obs.includes(termoBusca)
    );
  });

  const campanhas = vacinasFiltradas.filter(v => v.tipo === 'Campanha');
  const rotina = vacinasFiltradas.filter(v => v.tipo !== 'Campanha');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a76e9" />
        <Text style={{ marginTop: 10, color: '#666' }}>Carregando catálogo...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0a76e9ff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Aplicação</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.subHeader}>Selecione as vacinas para aplicar agora:</Text>

        {/* Busca */}
        <TextInput
          placeholder="Buscar vacina (ex: Gripe, Covid)"
          style={styles.inputSearch}
          placeholderTextColor="#9CA3AF"
          value={busca}
          onChangeText={setBusca}
        />

        {erro !== "" && (
          <View style={styles.errorBox}>
            <Feather name="alert-circle" size={18} color="#B91C1C" />
            <Text style={styles.errorText}>{erro}</Text>
          </View>
        )}

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>

          {/* GRUPO 1: CAMPANHAS */}
          {campanhas.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Campanhas Ativas</Text>
              {campanhas.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={[
                    styles.cardCampanha,
                    selecionadas.includes(item._id) && styles.cardSelecionado,
                  ]}
                  onPress={() => toggleSelecionar(item._id)}
                  activeOpacity={0.8}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nomeVacina}>{item.nome}</Text>
                    <Text style={styles.detalheVacina}>{item.dose} • {item.fabricante}</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Disponível</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* GRUPO 2: ROTINA */}
          <Text style={styles.sectionTitle}>Vacinas de Rotina / Estoque</Text>
          {rotina.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.cardRotina,
                selecionadas.includes(item._id) && styles.cardSelecionado,
              ]}
              onPress={() => toggleSelecionar(item._id)}
              activeOpacity={0.7}
            >
              <View>
                <Text style={styles.nomeVacina}>{item.nome}</Text>
                <Text style={styles.detalheVacina}>{item.dose}</Text>
                {item.observacoes ? <Text style={styles.obsVacina}>{item.observacoes}</Text> : null}
              </View>

              {selecionadas.includes(item._id) && (
                <Feather name="check-circle" size={24} color="#2563EB" />
              )}
            </TouchableOpacity>
          ))}

          {vacinasFiltradas.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma vacina encontrada.</Text>
          )}

        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnAvancar} onPress={avancar}>
          <Text style={styles.btnAvancarText}>
            Registrar Aplicação ({selecionadas.length})
          </Text>
          <Feather name="chevron-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  /* Header */
  header: {
    backgroundColor: "#0a76e9ff",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4
  },
  backButton: {
    marginRight: 16
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },

  content: {
    flex: 1,
    paddingHorizontal: 16
  },
  subHeader: {
    marginTop: 16,
    marginBottom: 8,
    color: '#4B5563',
    fontSize: 14
  },

  /* Busca */
  inputSearch: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
    color: '#333'
  },

  /* Erro */
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    gap: 8
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600"
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  /* Cards */
  cardCampanha: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 5,
    borderLeftColor: '#059669',
    elevation: 2
  },
  cardRotina: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB', elevation: 1
  },
  cardSelecionado: { backgroundColor: "#EFF6FF", borderColor: "#2563EB", borderWidth: 2, borderLeftWidth: 2, borderLeftColor: "#2563EB" },

  /* Textos Card */
  nomeVacina: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  detalheVacina: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  obsVacina: { fontSize: 12, color: "#9CA3AF", marginTop: 4, fontStyle: 'italic' },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#9CA3AF' },

  /* Badge */
  badge: { backgroundColor: '#D1FAE5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#065F46', fontSize: 10, fontWeight: 'bold' },

  /* Footer */
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', padding: 16, borderTopWidth: 1, borderTopColor: '#E5E7EB', elevation: 10 },
  btnAvancar: { backgroundColor: "#2563EB", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 8, gap: 8 },
  btnAvancarText: { color: "#FFF", fontSize: 16, fontWeight: "bold" }
});