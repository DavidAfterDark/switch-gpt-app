import { View, type ViewProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  backgroundType?: 'primary' | 'secondary'
}

export function ThemedView({ style, lightColor, darkColor, backgroundType = 'primary', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor ?? (backgroundType === 'primary' ? '#fcfcf9' : '#d8d8cf80'), dark: darkColor ?? (backgroundType === 'primary' ? '#1b191a' : '#232121') }, 'background')

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
