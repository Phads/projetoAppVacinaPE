import { TextInput, TextInputAndroidProps } from "react-native";
import { styles } from "./styles";

export function Input({...rest}: TextInputAndroidProps) {
    return (
        <TextInput 
        style={styles.input}
        placeholder="Identificação do usuário"
        {...rest} 
        />
    )
}

export function InputPassword({...rest}: TextInputAndroidProps) {
    return (
        <TextInput 
        style={styles.input}
        placeholder="Senha do usuário"
        {...rest} 
        />
    )
}   
