import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  RefreshControl 
} from "react-native";
import { globalStyle } from "../../constants/globalStyles";
import { router, useLocalSearchParams } from "expo-router";
import { buscarPacientePorCns } from "@/services/pacienteServices";

interface IVacina {
  _id: string; 
  nome: string;
  dose?: string;
  tipo?: string;
  status: 'Aplicada' | 'Pendente';
  fabricante?: string;
  lote?: string;
  dataAplicacao?: string; 
  observacoes?: string;
}

export default function CarteiraVacinacao() {
  const { cns } = useLocalSearchParams();

  const [paciente, setPaciente] = useState<any>(null);
  const [listaVacinas, setListaVacinas] = useState<IVacina[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 

  const carregarDados = async () => {
    if (cns) {
      try {
        const dados = await buscarPacientePorCns(cns as string);
        setPaciente(dados);
        
        if (dados.vacinas) {
          setListaVacinas(dados.vacinas);
        }
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setLoading(false);
        setRefreshing(false); 
      }
    }
  };

  useEffect(() => {
    carregarDados();
  }, [cns]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carregarDados();
  }, [cns]);

  const vacinasPendentes = listaVacinas.filter(vacina => vacina.status === 'Pendente');

  const renderItem = ({ item }: { item: IVacina }) => (
    <View style={styles.cardVacina}>
      <View style={styles.infoContainer}>
        <Text style={styles.vacinaNome}>{item.nome}</Text>
        <Text style={styles.vacinaDose}>
          {item.dose ? item.dose : "Dose Única/Reforço"}
        </Text>
        {item.fabricante && (
          <Text style={styles.vacinaFabricante}>Fab: {item.fabricante}</Text>
        )}
      </View>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>Pendente</Text>
      </View>
    </View>
  );


  const renderEmpty = () => (
    <View style={styles.emptyState}>
       <Text style={styles.emptyText}>Nenhuma pendência encontrada.</Text>
       <Text style={styles.emptySubText}>Todas as vacinas registradas foram aplicadas!</Text>
    </View>
  );

  const renderHeader = () => (
    <View>
      <View style={globalStyle.header}>
        <Text style={globalStyle.headerTitle}>Carteira de Vacinação</Text>
      </View>

      <Text style={styles.sectionTitle}>
        Histórico de vacinação do {paciente?.nome ? paciente.nome.split(' ')[0] : "Paciente"}
      </Text>

      <View style={styles.headerSection}>
        <Text style={styles.subTitleSection}>Vacinas Pendentes</Text>
        <Text style={styles.descSection}>
          Estas vacinas constam no sistema como não aplicadas.
        </Text>
      </View>
    </View>
  );

  // 4. O Rodapé (Botão)
  const renderFooter = () => (
    <TouchableOpacity
        style={[globalStyle.button, styles.btnAvancar]}
        activeOpacity={0.8}
        onPress={() => router.push({
          pathname: './selecao_vacina',
          params: { cns: cns }
        })}
      >
        <Text style={styles.btnText}>Atualizar Carteira</Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={[globalStyle.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0a76e9" />
        <Text style={{marginTop: 10, color: '#666'}}>Buscando dados no sistema...</Text>
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#0a76e9ff"}
        translucent={false}
      />
      
      <FlatList
        data={vacinasPendentes}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        
        contentContainerStyle={styles.listContent} 
        showsVerticalScrollIndicator={false}
        

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0a76e9']} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F3F4F6' 
  },
  listContent: {
    paddingHorizontal: 20, 
    paddingBottom: 40, 
  },
  
  /* Textos do Cabeçalho */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 4,
  },
  headerSection: {
    marginBottom: 16
  },
  subTitleSection: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  descSection: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2
  },

  /* Card da Vacina */
  cardVacina: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    
    elevation: 2, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444" 
  },
  infoContainer: {
    flex: 1,
    marginRight: 10
  },
  vacinaNome: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "700",
    marginBottom: 2
  },
  vacinaDose: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 2
  },
  vacinaFabricante: {
    fontSize: 11,
    color: "#9CA3AF",
    fontStyle: 'italic'
  },

  /* Badge de Status */
  statusBadge: {
    backgroundColor: "#FEF2F2",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FCA5A5"
  },
  statusText: {
    color: "#DC2626",
    fontWeight: "bold",
    fontSize: 11,
    textTransform: 'uppercase'
  },

  /* Estado Vazio */
  emptyState: {
    alignItems: 'center',
    padding: 30,
    opacity: 0.7
  },
  emptyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151'
  },
  emptySubText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4
  },

  /* Botão */
  btnAvancar: {
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20, 
    backgroundColor: '#0a76e9'
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});