import { TextInput, TextInputAndroidProps } from "react-native";
import { styles } from "./styles";

type titleInput = TextInputAndroidProps & {
    modInput: string
}

export function Input({modInput, ...rest}: titleInput) {
    return (
        <TextInput 
        style={styles.input}
        placeholder={modInput}
        keyboardType="default"
        {...rest} 
        />
    )
}
 
