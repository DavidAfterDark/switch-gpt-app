import { View, type ViewProps } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Colors } from '@/constants/Colors'

export type ThemedViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
  backgroundType?: 'primary' | 'secondary'
}

export function ThemedView({ style, lightColor, darkColor, backgroundType = 'primary', ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    {
      light: lightColor ?? (backgroundType === 'primary' ? Colors.light.background : Colors.light.backgroundSecondary),
      dark: darkColor ?? (backgroundType === 'primary' ? Colors.dark.background : Colors.dark.backgroundSecondary)
    },
    'background'
  )

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}
