import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import Layout from '../../shared/ui/Layout'
import TextMain from '../../shared/ui/Text/TextMain'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'

const Food = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  useEffect(() => {
    navigation.setOptions({
      title: 'USPTU Food',
    })
  }, [navigation])
  return (
    <>
      {/* <Layout> */}
      {/* <WebView
        source={{
          uri: 'https://food.rusoil.net',
        }}
        style={{ width: '100%', height: '100%' }}
      /> */}
      {/* </Layout> */}
      <Layout>
        <View
          style={{
            marginTop: 12,
            backgroundColor: SwitchTheme(isTheme).bgItem,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <TextMain textAlign="left">{`Скоро\nСледите за обновлениями`}</TextMain>
        </View>
      </Layout>
    </>
  )
}
// const styles = StyleSheet.create({
//   scrollStyle: {
//     backgroundColor: SwitchTheme(isTheme).bgFon,
//   },
// })

export default Food
