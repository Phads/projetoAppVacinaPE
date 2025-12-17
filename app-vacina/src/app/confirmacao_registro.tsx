import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as MailComposer from "expo-mail-composer";
import { router, useLocalSearchParams } from "expo-router";

export default function TelaSucessoAplicacao() {
  const params = useLocalSearchParams();
  
  const [paciente, setPaciente] = useState<any>(null);
  const [vacinas, setVacinas] = useState<any[]>([]);
  const [profissional, setProfissional] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.dadosPaciente && params.dadosVacinas && params.dadosProfissional) {
        try {
            setPaciente(JSON.parse(params.dadosPaciente as string));
            setVacinas(JSON.parse(params.dadosVacinas as string));
            setProfissional(JSON.parse(params.dadosProfissional as string));
        } catch (e) {
            console.error("Erro ao ler dados do comprovante", e);
        } finally {
            setLoading(false);
        }
    }
  }, []);

  // Esta função usa HTML, mas é apenas TEXTO para o PDF, então aqui o <strong> PODE ser usado.
  const gerarHTML = () => {
    const linhasVacinas = vacinas.map(v => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 8px;"><strong>${v.nomeVacina}</strong></td>
            <td style="padding: 8px;">${v.dose}</td>
            <td style="padding: 8px;">${v.fabricante}</td>
            <td style="padding: 8px;">${v.viaAplicacao} / ${v.localAplicacao || '-'}</td>
        </tr>
    `).join('');

    return `
      <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        </head>
        <body style="font-family: Helvetica, Arial, sans-serif; padding: 40px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color:#2563EB; margin: 0;">Comprovante de Vacinação</h1>
            <p style="color: #666; font-size: 14px;">Documento Digital do SUS</p>
          </div>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top:0; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Dados do Paciente</h3>
            <p><strong>Nome:</strong> ${paciente?.nome || paciente?.nomeCompleto || "Não informado"}</p>
            <p><strong>CNS:</strong> ${paciente?.cns || "-"}</p>
            <p><strong>CPF:</strong> ${paciente?.cpf || "-"}</p>
          </div>
          <h3 style="border-bottom: 1px solid #ccc; padding-bottom: 5px;">Vacinas Aplicadas</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
            <tr style="background: #2563EB; color: #fff;">
                <th style="padding: 8px; text-align: left;">Vacina</th>
                <th style="padding: 8px; text-align: left;">Dose</th>
                <th style="padding: 8px; text-align: left;">Fabricante</th>
                <th style="padding: 8px; text-align: left;">Via/Local</th>
            </tr>
            ${linhasVacinas}
          </table>
          <div style="margin-top: 30px; font-size: 12px; color: #555; border-top: 1px solid #ccc; padding-top: 10px;">
            <p><strong>Unidade:</strong> ${profissional?.unidade || "Unidade Padrão"}</p>
            <p><strong>Profissional Responsável:</strong> ${profissional?.nome} (COREN: ${profissional?.coren})</p>
            <p><strong>Data da Aplicação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </body>
      </html>
    `;
  };

  const gerarPDF = async () => {
    try {
      const html = gerarHTML();
      const file = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o comprovante.");
    }
  };

  const enviarEmail = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    
    if (!isAvailable) {
        Alert.alert("Atenção", "O envio de e-mail não está configurado neste dispositivo.");
        return;
    }

    try {
      const html = gerarHTML();
      const pdf = await Print.printToFileAsync({ html });

      await MailComposer.composeAsync({
        recipients: paciente?.email ? [paciente.email] : [],
        subject: "Comprovante de Vacinação Digital",
        body: `Olá, ${paciente?.nome || 'Paciente'}.\n\nSegue em anexo o seu comprovante de vacinação realizado na unidade ${profissional?.unidade}.\n\nAtenciosamente,\nEquipe de Saúde`,
        attachments: [pdf.uri],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail.");
    }
  };

  if (loading) {
      return (
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color="#2563EB" />
          </View>
      )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="check" size={42} color="#FFF" />
        </View>

        <Text style={styles.title}>Aplicação Registrada!</Text>

        <Text style={styles.subtitle}>
          {vacinas.length} vacina(s) aplicada(s) com sucesso em{"\n"}
          {/* AQUI ESTAVA O ERRO: Trocado <strong> por <Text style> */}
          <Text style={{ fontWeight: 'bold', color: '#1F2937' }}>
            {paciente?.nome?.split(' ')[0] || "Paciente"}
          </Text>.
        </Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={gerarPDF}>
          <MaterialIcons name="print" size={20} color="#374151" />
          <Text style={styles.secondaryText}>Visualizar / Imprimir PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={enviarEmail}>
          <MaterialIcons name="mail" size={20} color="#374151" />
          <Text style={styles.secondaryText}>Enviar por E-mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.navigate('/home')}>
          <MaterialIcons name="home" size={20} color="#FFF" />
          <Text style={styles.primaryText}>Voltar ao Início</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2
  },
  iconContainer: {
    backgroundColor: "#16A34A",
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 24,
    lineHeight: 20
  },
  secondaryButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  secondaryText: {
    fontWeight: "bold",
    color: "#374151",
    fontSize: 14,
  },
  primaryButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  primaryText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});