import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextBody(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 17,
        fontFamily: props.medium ? 'SF-Pro-Text-Medium' : 'SF-Pro-Text-Regular',
        lineHeight: 22,
        textAlign: 'center',
        letterSpacing: -0.41,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
