import { Text, View } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

export default function TextSectionHeader(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        backgroundColor: SwitchTheme(isTheme).bgSection,
        borderRadius: 20,
        textAlign: 'center',
        alignSelf: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
      }}
    >
      <Text
        style={{
          color: props.color || SwitchTheme(isTheme).textMain,
          fontSize: 13,
          fontFamily: 'Roboto-Medium',
          lineHeight: 15.23,
          letterSpacing: -0.1,
          ...props,
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}
