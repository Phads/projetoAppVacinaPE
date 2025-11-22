import React from "react"
import { View, Text, StyleSheet, Alert, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from "react-native"
import { StatusBar } from "react-native"
// import { Button, LinkButton } from "@/components/button"
// import { Input, InputPassword } from "@/components/input"

export default function Index() {

    function handleClickBtnEnter() {
        Alert.alert("Carregando...")
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
                <StatusBar
                    barStyle={"light-content"}
                    backgroundColor={"#0a76e9ff"}
                    translucent={false}
                />
                <View style={styles.img}>
                    <Image source={require("../../assets/images/governo-logo.png")} />
                </View>
                <View>
                    <Text style={styles.title}>Secretaria de Saúde de Pernambuco</Text>
                    <Text style={styles.title}>Login Sistema Vacinação</Text>

                </View>

                <View style={{ width: "100%", alignItems: "center", marginTop: 60, marginBottom: 20, gap: 15 }}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Identificação do usuário" />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input} placeholder="Senha do usuário" secureTextEntry={true} />
                </View>

                <View style={{ width: "100%" }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={handleClickBtnEnter}>
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

    text: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },

    label: {
        alignSelf: "flex-start",
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "bold",
    },

    input: {
        width: 370,
        height: 60,
        borderColor: "#cccccc",
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
