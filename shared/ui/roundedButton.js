import { Pressable, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextBody from './Text/TextBody'
export default function RoundedButton(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={props.onPress || null}>
      {({ pressed }) => {
        return (
          <View
            style={{
              backgroundColor: pressed
                ? isTheme.includes('theme_usual')
                  ? SwitchTheme(isTheme).hoverBlue
                  : SwitchTheme(isTheme).hoverEffect
                : isTheme.includes('theme_usual')
                ? SwitchTheme(isTheme).bgbuttondefault
                : SwitchTheme(isTheme).checkIcon,
              paddingHorizontal: 90,
              paddingVertical: 10,
              width: '100%',
              height: 44,
              borderRadius: 30,
              ...props,
            }}
          >
            <TextBody color={SwitchTheme(isTheme).textbuttondefault}>{props.children}</TextBody>
          </View>
        )
      }}
    </Pressable>
  )
}
