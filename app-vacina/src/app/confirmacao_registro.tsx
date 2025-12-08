import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as MailComposer from "expo-mail-composer";
import { router } from "expo-router";

// Simulação dos dados (normalmente viriam via route.params)
const comprovante = {
  paciente: "João da Silva",
  cpf: "123.456.789-10",
  vacina: "INFLUENZA (H1N1/H3N2/B)",
  dose: "1ª dose",
  data: "21/10/2025",
  horario: "14:54",
  unidade: "Policlínica Rio Doce IV - Olinda/PE",
  profissional: "Enf. Ana Cascalho",
  email: "joao.silva@email.com",
};

export default function TelaSucessoAplicacao() {
  const gerarPDF = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h2 style="color:#2563EB;">Comprovante de Vacinação</h2>
            <hr />
            <p><strong>Paciente:</strong> ${comprovante.paciente}</p>
            <p><strong>CPF:</strong> ${comprovante.cpf}</p>
            <p><strong>Vacina:</strong> ${comprovante.vacina}</p>
            <p><strong>Dose:</strong> ${comprovante.dose}</p>
            <p><strong>Data:</strong> ${comprovante.data}</p>
            <p><strong>Horário:</strong> ${comprovante.horario}</p>
            <p><strong>Unidade:</strong> ${comprovante.unidade}</p>
            <p><strong>Profissional:</strong> ${comprovante.profissional}</p>
            <br />
            <p style="font-size:12px; color:#555;">
              Documento gerado automaticamente pelo sistema de vacinação.
            </p>
          </body>
        </html>
      `;

      const file = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(file.uri);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível gerar o comprovante.");
    }
  };

  const enviarEmail = async () => {
    try {
      const pdf = await Print.printToFileAsync({
        html: `<h2>Comprovante de Vacinação</h2><p>Segue em anexo.</p>`,
      });

      await MailComposer.composeAsync({
        recipients: [comprovante.email],
        subject: "Comprovante de Vacinação",
        body:
          "Olá! Segue em anexo o comprovante da sua vacinação.\n\nAtenciosamente,\nEquipe de Saúde",
        attachments: [pdf.uri],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="check" size={42} color="#FFF" />
        </View>

        <Text style={styles.title}>Aplicação Registrada com Sucesso!</Text>

        <Text style={styles.subtitle}>
          A vacina foi aplicada e o registro foi salvo no sistema.
        </Text>

        <TouchableOpacity style={styles.secondaryButton} onPress={gerarPDF}>
          <MaterialIcons name="print" size={20} color="#374151" />
          <Text style={styles.secondaryText}>Gerar comprovante impresso</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={enviarEmail}>
          <MaterialIcons name="send" size={20} color="#374151" />
          <Text style={styles.secondaryText}>Enviar comprovante digital</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.navigate('./home')}>
          <MaterialIcons name="person-add" size={20} color="#FFF" />
          <Text style={styles.primaryText}>Novo Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineButton} onPress={() => router.navigate('./home')}>
          <Text style={styles.outlineText}>Ver Resumo do Plantão</Text>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    color: "#4B5563",
    marginBottom: 20,
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
  outlineButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginTop: 12,
    alignItems: "center",
  },
  outlineText: {
    color: "#374151",
    fontWeight: "bold",
    fontSize: 14,
  },
});

