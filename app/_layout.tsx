import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { useColorScheme } from '@/hooks/useColorScheme'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import { esES } from '@clerk/localizations'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item !== null) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value)
    } catch (err) {
      console.log('[error token cache]: ', err)
    }
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const InitialLayout = () => {
  const colorScheme = useColorScheme()

  const router = useRouter()

  const segments = useSegments()

  const { isLoaded, isSignedIn } = useAuth()

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (error !== null) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (!isLoaded) return

    const inAuthGroup = segments[0] === '(auth)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/')
    } else if (!isSignedIn) {
      router.replace('/')
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            presentation: 'modal',
            title: '',
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => { router.back() }}>
                  <Ionicons name='close-outline' size={28} color={colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.light.textColor100} />
                </TouchableOpacity>
              )
            },
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.light.backgroundColor100
            },
            headerShadowVisible: false
          }}
        />

        <Stack.Screen
          name='(auth)'
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache} localization={esES}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}
