import { Text } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextTime(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Text
      style={{
        color: props.color || SwitchTheme(isTheme).textMain,
        fontSize: 13,
        fontFamily: props.secondary ? 'Roboto-Medium' : 'Roboto-Regular',
        // fontStyle: 'italic',
        fontFamily: 'Roboto-Regular',
        lineHeight: 18,
        letterSpacing: -0.078,
        ...props,
      }}
    >
      {props.children}
    </Text>
  )
}
