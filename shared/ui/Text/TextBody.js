import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextBody(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 14,
        fontFamily: props.medium ? 'Roboto-Medium' : 'Roboto-Regular',
        lineHeight: 20,
        textAlign: 'center',
        letterSpacing: -0.1,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
