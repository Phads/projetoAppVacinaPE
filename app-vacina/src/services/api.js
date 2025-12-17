import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBackendUrl = () => {
    if (process.env.EXPO_PUBLIC_API_URL) {
        return process.env.EXPO_PUBLIC_API_URL;
    }

    // 2. Tenta pegar o IP da máquina que está rodando o Expo (hostUri)
    const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost;
    
    if (debuggerHost) {
        // Nós pegamos só o IP e trocamos a porta para 3000 (onde seu backend roda)
        const ip = debuggerHost.split(':')[0];
        return `http://${ip}:3000`;
    }

    // 3. Fallback para emuladores caso não ache o IP
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000'; // IP padrão do emulador Android Studio
    }

    return 'http://localhost:3000'; // IP padrão para emulador iOS
};

const API_URL = getBackendUrl();

console.log("Conectando API em:", API_URL); // Isso ajuda a ver no terminal qual IP ele pegou

const api = axios.create({
    baseURL: API_URL,
});

export const login = async (email, senha) => {
    try {
        const response = await api.post('api/auth/login', { email, senha });
        return response.data;
    } catch (error) {
        console.error("Erro no login:", error);
        throw error;
    }
};

export default api;