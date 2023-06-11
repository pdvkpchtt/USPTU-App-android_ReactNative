import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextLarge(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 28,
        fontFamily: 'Roboto',
        lineHeight: 32,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
