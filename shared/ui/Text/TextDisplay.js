import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextDisplay(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 16,
        fontFamily: 'SF-Pro-Display-Regular',
        lineHeight: 18,
        letterSpacing: -0.078,
        ...props,
      }}
      selectable={props?.selectable || false}
    >
      {props.children}
    </Text>
  )
}
