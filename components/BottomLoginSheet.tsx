import React from 'react'
import { StyleSheet, TouchableOpacity, useColorScheme, Platform } from 'react-native'
import { ThemedView, ThemedText } from '@/components/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Link } from 'expo-router'

export default function BottomLoginSheet() {
  const colorScheme = useColorScheme()

  const { bottom } = useSafeAreaInsets()

  const onPress = () => {
    console.log('on press')
  }

  return (
    <ThemedView style={[styles.container, { paddingBottom: bottom + 26 }]} darkColor={Colors.black}>
      {Platform.OS === 'ios' && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <ThemedView style={styles.button} lightColor={Colors.dark.backgroundColor100} darkColor={Colors.gray}>
            <Ionicons name="logo-apple" size={20} color={colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.dark.textColor100} />
            <ThemedText lightColor={Colors.dark.textColor100} darkColor={Colors.dark.textColor100}>Continue with Apple</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <ThemedView style={styles.button} lightColor={Colors.dark.backgroundColor100} darkColor={Colors.gray}>
          <Ionicons name="logo-google" size={16} color={colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.dark.textColor100} />
          <ThemedText lightColor={Colors.dark.textColor100} darkColor={Colors.dark.textColor100}>Continue with Google</ThemedText>
        </ThemedView>
      </TouchableOpacity>

      <Link href={{ pathname: '/login', params: { type: 'register' } }} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <ThemedView style={styles.button} lightColor={Colors.dark.backgroundColor100} darkColor={Colors.gray}>
            <Ionicons name="mail" size={20} color={colorScheme === 'dark' ? Colors.dark.textColor100 : Colors.dark.textColor100} />
            <ThemedText lightColor={Colors.dark.textColor100} darkColor={Colors.dark.textColor100}>Sign up with email</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </Link>

      <Link href={{ pathname: '/login', params: { type: 'login' } }} asChild>
        <TouchableOpacity activeOpacity={0.5}>
          <ThemedView style={[styles.button, styles.buttonOutline]} lightColor={'transparent'} darkColor={Colors.light.backgroundColor100}>
            <ThemedText lightColor={Colors.light.textColor100} darkColor={Colors.light.textColor100}>Log in</ThemedText>
          </ThemedView>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 26,
    gap: 14
  },
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 10,
    width: '100%'
  },
  buttonOutline: {
    borderWidth: 1
  }
})
