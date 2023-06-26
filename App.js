import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import { useFonts } from 'expo-font'
import { useUserStore } from './entities/user'
import Tabbar from './pages/Tabbar'
import { Login } from './pages/Login/Login'
import useTokenStore from './shared/apiClient/store/store'
import Toast from 'react-native-toast-message'
import ListBox from './shared/ui/ListBox'
import TextBody from './shared/ui/Text/TextBody'
import { useEffect } from 'react'
import { enableScreens } from 'react-native-screens'
import useThemeStore from './shared/theme/store/store'
enableScreens(false)
export default function App() {
  const isTheme = useThemeStore((state) => state.theme) // пока добавил для статус бара danil
  const isAuth = useTokenStore((state) => state.isAuth)
  const scheme = useColorScheme()
  // console.warn(scheme)

  const { setTheme, isAuto } = useThemeStore((state) => ({
    setTheme: state.setTheme,
    setSelected: state.setSelected,
    isAuto: state.isAuto,
  }))

  useEffect(() => {
    // if (isAuto) {
    if (scheme === 'dark' && !isTheme.includes('_dark')) setTheme(isTheme + '_dark')
    else if (scheme === 'light' && isTheme.includes('_dark')) setTheme(isTheme.replace('_dark', ''))
    // }

    console.log(scheme, isTheme)
  })

  const toastConfig = {
    custom: ({ text1, props }) => (
      <ListBox
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={4.65}
        elevation={8}
      >
        <TextBody>{text1}</TextBody>
      </ListBox>
    ),
  }
  let [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <>
      {isAuth ? (
        <>
          <Tabbar scheme={scheme} />
          <Toast config={toastConfig} position="bottom" bottomOffset="100" />
        </>
      ) : (
        <Login />
      )}
      {/* пока добавил для статус бара danil */}
      <StatusBar style={isTheme.includes('_dark') ? 'light' : 'dark'} />
    </>
  )
}
