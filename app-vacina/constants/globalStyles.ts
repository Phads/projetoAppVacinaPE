import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
    container: {
        padding: 24,
        paddingBottom: 50,
        backgroundColor: '#ffffff'
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginLeft: 10,
    },

    input: {
        width: 370,
        height: 60,
        backgroundColor: "#e4dddd70",
        borderRadius: 10,
        paddingLeft: 15,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: "400",
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

});