import { Pressable, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextBody from './Text/TextBody'
export default function RoundedButton(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={props.onPress || null}>
      {({ isPressed }) => {
        return (
          <View
            style={{
              backgroundColor: isPressed
                ? SwitchTheme(isTheme).bgbuttondefaultpressed
                : SwitchTheme(isTheme).bgbuttondefault,
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
