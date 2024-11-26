import { Stack } from 'expo-router'
import { LoginProvider } from '../scripts/LoginContext'

export default function Layout() {
    return (
        <LoginProvider>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: 'black'
                },
                headerTintColor: 'black'

            }}>
                <Stack.Screen name='index' options={{ headerTitle: 'Inicial' }} />
                <Stack.Screen name='cadastro/index' options={{ headerTitle: 'Registro' }} />
                <Stack.Screen name='Login/index' options={{ headerTitle: 'Login' }} />
                <Stack.Screen name='Profile/index' options={{ headerTitle: 'Perfil' }} />
                <Stack.Screen name='AdmHome/index' options={{ headerTitle: 'AdmHome' }} />
                <Stack.Screen name='Inicio/index' options={{ headerTitle: 'Home' }} />
            </Stack>
        </LoginProvider>
    )
}