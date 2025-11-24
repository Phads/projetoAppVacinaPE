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
    Platform } from "react-native"
import { router } from "expo-router"

export default function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const submitLogin = () => {
        if (email === "" || password === "") {
            Alert.alert("Erro", "Por favor, preencha todos os campos.")
            return
        }

        router.replace("/home");
    }

    function handleClickLinkForgotPassword() {
        Alert.alert("Redefinir senha")
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={64}
        >
            <View style={styles.container}>
                <View style={styles.img}>
                    <Image source={require("../../assets/images/governo-logo.png")} />
                </View>
                <View>
                    <Text style={styles.title}>Secretaria de Saúde de Pernambuco</Text>
                    <Text style={[styles.title, styles.titleMessage]}>Faça login no Sistema - Vacina+ PE</Text>
                </View>

                <View style={{ width: "100%", alignItems: "center", marginTop: 40, marginBottom: 20, gap: 15 }}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite seu email" 
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address" 
                    />
                    
                    <Text style={styles.label}>Senha</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Digite sua senha" 
                        onChangeText={value => setPassword(value)}
                        secureTextEntry={true} 
                    />
                </View>

                <View style={{ width: "100%" }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={submitLogin}>
                        <Text style={styles.text}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.link} onPress={handleClickLinkForgotPassword}>
                        <Text style={styles.link}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },

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
        height: 20,
        alignSelf: "flex-start",
        marginLeft: 10,
        fontSize: 16,
        fontWeight: "bold",
    },

    input: {
        width: 370,
        height: 60,
        borderColor: "#bbb7b7ff",
        backgroundColor: "#f5f5f5ff",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingLeft: 15,
        marginBottom: 10,
        fontSize: 16,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },

    button: {
        width: 300,
        height: 60,
        backgroundColor: "#007bff",
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },

    link: {
        color: "#007bff",
        fontSize: 16,
        textDecorationLine: "underline",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },

})
