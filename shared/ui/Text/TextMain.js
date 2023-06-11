import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextMain(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 17,
        fontFamily: props.secondary ? 'SF-Pro-Text-Medium' : 'SF-Pro-Text-Regular',
        lineHeight: 22,
        letterSpacing: -0.41,
        ...props,
      }}
      selectable={props?.selectable || false}
    >
      {props.children}
    </Text>
  )
}
