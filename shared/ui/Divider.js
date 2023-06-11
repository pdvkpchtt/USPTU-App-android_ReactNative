import { StyleSheet, View, PixelRatio } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'

const Divider = (props) => {
  const isTheme = useThemeStore((state) => state.theme)
  const width = PixelRatio.roundToNearestPixel(0.5)
  return (
    <View
      style={{
        backgroundColor: SwitchTheme(isTheme).divider,
        height: width,
        marginLeft: props.ml || 0,
        marginRight: -16 || 0,
        marginVertical: 0.1,
      }}
    ></View>
  )
}

export default Divider
