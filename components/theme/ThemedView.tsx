import { View, type ViewProps } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    {
      light: lightColor ?? Colors.light.backgroundColor100,
      dark: darkColor ?? Colors.dark.backgroundColor100
    },
    'backgroundColor100'
  )

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
