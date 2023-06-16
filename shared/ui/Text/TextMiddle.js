import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextMiddle(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 15,
        fontFamily: props.secondary ? 'Roboto-Medium' : 'Roboto-Regular',
        lineHeight: 20,
        letterSpacing: -0.24,
        ...props,
      }}
      selectable={props?.selectable || false}
    >
      {props.children}
    </Text>
  )
}
