import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color='#fff' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0 ,0 , 0.6)'
  }
})
