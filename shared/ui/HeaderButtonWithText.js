import { Pressable } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import TextBody from './Text/TextBody'

export default function HeaderButtonWithText({ text, onPress = null, align = 'left' }) {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={onPress} pl={align === 'left' ? '14px' : '0px'} pr={align === 'right' ? '0px' : '14px'}>
      {({ pressed }) => {
        return (
          <TextBody
            textAlign={align}
            color={pressed ? SwitchTheme(isTheme).textHeaderButtonpressed : SwitchTheme(isTheme).textHeaderButton}
          >
            {text}
          </TextBody>
        )
      }}
    </Pressable>
  )
}
