import { useCallback, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  PixelRatio,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import useThemeStore from '../theme/store/store'
import ItFon from '../images/ItFon.js'
import SwitchTheme from '../theme/SwitchTheme'

const Layout = (props) => {
  const [refreshing, setRefreshing] = useState(false)
  const { width, height } = Dimensions.get('screen')

  const onRefreshCallback = useCallback(async () => {
    setRefreshing(true)
    await props.onRefresh()
    setRefreshing(false)
  }, [])

  const widthborder = PixelRatio.roundToNearestPixel(0.5)

  const isTheme = useThemeStore((state) => state.theme)
  // console.log(isTheme)
  return (
    <>
      <View
        style={{
          position: 'absolute',
          height,
          width,
          bottom: 0,
          top: -70, // danil костыль/фикс полоски смешной серху
          right: 0,
          left: 0,
          zIndex: -1,
          lineHeight: 0,
          // borderTopColor: 'red',
          // borderTopWidth: 2,
          backgroundColor: SwitchTheme(isTheme).bgFon,
        }}
      >
        {SwitchTheme(isTheme).fonImage}
      </View>
      {/* <ImageBackground source={require('../images/ftt.png')} style={styles.image}> */}
      <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} />

      {props.forFlashList ? (
        <View style={{ flex: 1, paddingHorizontal: 12 }}>{props?.children}</View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 12,
            // paddingBottom: 24,
            backgroundColor: 'transparent',
            //minHeight: height - (83 + 24 + 64),
            ...props,
          }}
          refreshControl={
            <RefreshControl
              refreshing={props?.refreshing || false}
              onRefresh={props?.onRefresh ? onRefreshCallback : null}
            />
          }
          onScrollBeginDrag={Keyboard.dismiss}
          overScrollMode="never"
        >
          {props?.children}
        </ScrollView>
      )}
      {/* <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} /> */}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})
export default Layout
