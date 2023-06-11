import { PixelRatio } from 'react-native'
import useThemeStore from '../../theme/store/store'
import SwitchTheme from '../../theme/SwitchTheme'

const NavigationOptions = () => {
  const isTheme = useThemeStore((state) => state.theme)
  const width = PixelRatio.roundToNearestPixel(0.5)
  return {
    headerTintColor: SwitchTheme(isTheme).textHeaderButton,
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
      fontSize: 17,
      lineHeight: 33,
      letterSpacing: -0.41,
      color: SwitchTheme(isTheme).textMain,
      fontFamily: 'SF-Pro-Text-Semibold',
    },
    headerTitleAlign: 'center',
    headerBackTitleStyle: {
      fontSize: 17,
      color: SwitchTheme(isTheme).textHeaderButton,
    },
    headerShadowVisible: false, // applied here
    headerBackTitleVisible: false,
    //  presentation: 'transparentModal',
  }
}
export default NavigationOptions
