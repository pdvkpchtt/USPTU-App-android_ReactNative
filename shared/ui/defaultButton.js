import { Pressable, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextBody from './Text/TextBody'
export default function DefaultButton(props) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={props.onPress || null}>
      {({ pressed }) => {
        return (
          <View
            style={{
              backgroundColor: pressed
                ? SwitchTheme(isTheme).bgbuttondefaultpressed
                : SwitchTheme(isTheme).bgbuttondefault,
              paddingVertical: 10,
              width: '100%',
              borderRadius: 20,
              ...props,
            }}
          >
            <TextBody color={props.color || SwitchTheme(isTheme).textbuttondefault} medium={true}>
              {props.children}
            </TextBody>
          </View>
        )
      }}
    </Pressable>
  )
}
