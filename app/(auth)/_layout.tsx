import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='(menu)' options={{ headerShown: false }} />
    </Stack>
  )
}
