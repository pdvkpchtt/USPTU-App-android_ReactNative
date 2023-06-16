import { StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import TextLarge from '../../../shared/ui/Text/TextLarge'
import TextSmall from '../../../shared/ui/Text/TextSmall'

export const BoxComponent = ({ name, department, speciality }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40,
      }}
    >
      <TextLarge>{name}</TextLarge>
      <Text
        style={{
          marginTop: 16,
          color: SwitchTheme(isTheme).textSec,
          fontSize: 22,
          fontFamily: 'Roboto',
          lineHeight: 28,
        }}
      >
        {department}
      </Text>
      <TextSmall fontSize={14} marginTop={4} color={SwitchTheme(isTheme).textSec}>
        {speciality}
      </TextSmall>
    </View>
  )
}
