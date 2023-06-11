import { ImageBackground, Pressable, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import ItMiniFon from '../images/ItMiniFon'
import AsiMiniFon from '../images/AsiMiniFon'
import SwitchTheme from '../theme/SwitchTheme'

const DecorationItem = ({ children, onPress = null, source, isNeedMargin = false }) => {
  // console.log(text, position)
  const isTheme = useThemeStore((state) => state.theme)

  const { setTheme } = useThemeStore((state) => ({
    setTheme: state.setTheme,
  }))
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: 53,
          height: 98,
          marginLeft: isNeedMargin === 'left' ? 16 : 3,
          marginRight: isNeedMargin === 'right' ? 16 : 3,
          // backgroundColor: SwitchTheme(isTheme).bgFon,
          borderRadius: 5,
          overflow: 'hidden', // чтобы бордер радиус работал danil
        }}
      >
        {children}
      </View>
    </Pressable>
  )
}

export default DecorationItem
