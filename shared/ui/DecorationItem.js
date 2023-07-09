import { ImageBackground, Pressable, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import ItMiniFon from '../images/ItMiniFon'
import AsiMiniFon from '../images/AsiMiniFon'
import SwitchTheme from '../theme/SwitchTheme'

const DecorationItem = ({ children, active = false, theme, onPress = null, isNeedMargin = false }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: 53,
          height: 98,
          marginLeft: isNeedMargin === 'left' ? 16 : 3,
          marginRight: isNeedMargin === 'right' ? 16 : 3,
          // backgroundColor: SwitchTheme(isTheme).bgFon,
          borderRadius: 7,
          borderWidth: 1,
          overflow: 'hidden', // чтобы бордер радиус работал danil
          borderColor: active ? SwitchTheme(theme).textHeaderButton : 'transparent',
        }}
      >
        {children}
      </View>
    </Pressable>
  )
}

export default DecorationItem
