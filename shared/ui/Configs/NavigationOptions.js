import { PixelRatio } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'
import { useRoute } from '@react-navigation/native'

const NavigationOptions = () => {
  const route = useRoute()

  const isSchedule = route.name == 'TabSchedule'

  const isTheme = useThemeStore((state) => state.theme)
  const width = PixelRatio.roundToNearestPixel(0.5)
  return {
    headerTintColor: SwitchTheme(isTheme).tabBarInactiveTintColor,
    headerBackTitle: 'Назад',
    headerStyle: {
      backgroundColor: SwitchTheme(isTheme).bgTopNav,
      headerShadowVisible: false,
      borderBottomWidth: 0,
      borderWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    // contentStyle: {
    //   zIndex: 99,
    //   borderTopColor: 'red',
    //   borderTopWidth: width,
    // },
    headerTitleStyle: {
      fontSize: 20,
      lineHeight: 24,
      color: SwitchTheme(isTheme).textMain,
      fontFamily: 'Roboto-Medium',
    },
    headerTitleAlign: isSchedule ? 'center' : 'start',

    // headerBackTitleStyle: {
    //   color: SwitchTheme(isTheme).textHeaderButton,
    // },
    headerShadowVisible: false, // applied here
    headerBackTitleVisible: false,
    //  presentation: 'transparentModal',
  }
}
export default NavigationOptions
