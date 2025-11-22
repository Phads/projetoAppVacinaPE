import { TouchableOpacity ,TouchableOpacityProps, Text } from "react-native"
import { styles } from "./styles"

type PropsButton = TouchableOpacityProps & {
    title: string
}

export function Button({ title, ...rest }: PropsButton) {
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.button} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>   
    )
}

export function LinkButton({ title, ...rest }: PropsButton) {
    return (
        <TouchableOpacity activeOpacity={0.7} {...rest}>
            <Text style={styles.link}>{title}</Text>
        </TouchableOpacity>   
    )
}