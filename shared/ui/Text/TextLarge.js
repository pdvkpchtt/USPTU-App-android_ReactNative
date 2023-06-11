import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextLarge(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 24,
        fontFamily: props.secondary ? 'SF-Pro-Text-Regular' : 'SF-Pro-Text-Medium',
        lineHeight: 28,
        letterSpacing: -0.41,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
