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
        paddingVertical: 10,
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderRadius: 13,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 24,
      }}
    >
      <TextLarge>{name}</TextLarge>
      <TextLarge marginTop={8} color={SwitchTheme(isTheme).textSec} secondary={true}>
        {department}
      </TextLarge>
      <TextSmall fontSize={17} marginTop={8} color={SwitchTheme(isTheme).textSec}>
        {speciality}
      </TextSmall>
    </View>
  )
}
