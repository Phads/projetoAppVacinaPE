import React from "react"
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from "react-native"
import { router } from "expo-router"
import { globalStyle } from "../../constants/globalStyles"
import { login } from "../../backend/src/service/api.js"

export default function Login() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const submitLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.")
      return
    }

    try {
      setLoading(true)

      const profissional = await login(email, password)

      Alert.alert("Sucesso", `Bem-vindo(a), ${profissional.nome}`)

      router.replace("/home")

    } catch (error) {
      Alert.alert("Erro", (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  function handleClickLinkForgotPassword() {
    Alert.alert("Redefinir senha", "Procure o administrador do sistema.")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={globalStyle.container}
      keyboardVerticalOffset={64}
    >
      <View style={globalStyle.container}>
        <View style={styles.img}>
          <Image source={require("../../assets/images/governo-logo.png")} />
        </View>

        <Text style={styles.title}>Secretaria de Saúde de Pernambuco</Text>
        <Text style={[styles.title, styles.titleMessage]}>
          Faça login no Sistema - Vacina+ PE
        </Text>

        <View style={{ width: "100%", marginTop: 40, gap: 15 }}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Digite seu email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={globalStyle.input}
            placeholder="Digite sua senha"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={globalStyle.button}
          onPress={submitLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.text}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClickLinkForgotPassword}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}


const styles = StyleSheet.create({
    img: {
        width: 300,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "#0a76e9ff",

    },
    titleMessage: {
        fontSize: 16,
    },

    text: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        width: '100%',
        height: 20,
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
    },
    // button: {
    //     width: 300,
    //     height: 60,
    //     backgroundColor: "#007bff",
    //     borderRadius: 10,
    //     justifyContent: "center",
    //     alignSelf: "center",
    //     alignItems: "center",
    //     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    // },

    link: {
        color: "#007bff",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },

})
