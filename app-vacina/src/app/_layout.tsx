import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <StatusBar
                    barStyle={"light-content"}
                    backgroundColor={"#0a76e9ff"}
                    translucent={false}
                />
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: { backgroundColor: 'transparent' },
                        
                    }}
                >
                </Stack>
            </View>
        </SafeAreaProvider>

    )
}

