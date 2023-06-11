import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextCaption(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 12,
        fontFamily: 'SF-Pro-Text-Regular',
        lineHeight: 16,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
