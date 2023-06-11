import { Pressable, View } from 'react-native'
import TextBody from './Text/TextBody'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'

export default function SecondaryButton(props) {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Pressable onPress={props.onPress || null}>
      {({ pressed }) => {
        return (
          <View
            style={{
              backgroundColor: pressed ? SwitchTheme(isTheme).pressedItem : SwitchTheme(isTheme).bgItem,
              paddingVertical: 10,
              width: '100%',
              borderRadius: 13,
              marginTop: 32,
              ...props,
            }}
          >
            <TextBody color={props.color || SwitchTheme(isTheme).textbutton1} medium={props.medium || false}>
              {props.children}
            </TextBody>
          </View>
        )
      }}
    </Pressable>
  )
}
