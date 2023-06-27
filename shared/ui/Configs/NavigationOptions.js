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
    headerTintColor: isTheme.includes('theme_usual') ? SwitchTheme(isTheme).tabBarInactiveTintColor : '#fff',
    headerBackTitle: 'Назад',
    headerStyle: {
      backgroundColor: isTheme.includes('theme_usual')
        ? SwitchTheme(isTheme).bgTopNav
        : !isTheme.includes('_dark')
        ? SwitchTheme(isTheme).checkIcon
        : SwitchTheme(isTheme).bgTopNavForThemes,
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
      color: isTheme.includes('theme_usual') ? SwitchTheme(isTheme).textMain : '#fff',
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
