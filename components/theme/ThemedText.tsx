import { Text, type TextProps, StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useThemeColor } from '@/hooks/useThemeColor'

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link'
  colorType?: 'primary' | 'secondary'
}

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorType = 'primary',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    {
      light: lightColor ?? (colorType === 'primary' ? Colors.light.text : Colors.light.textSecondary),
      dark: darkColor ?? (colorType === 'primary' ? Colors.dark.text : Colors.dark.textSecondary)
    },
    'text'
  )

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4'
  }
})
