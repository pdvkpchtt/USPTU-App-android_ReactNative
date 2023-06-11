import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextMain(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 16,
        fontFamily: 'Roboto',
        lineHeight: 24,
        letterSpacing: 0.5,
        ...props,
      }}
      selectable={props?.selectable || false}
    >
      {props.children}
    </Text>
  )
}
