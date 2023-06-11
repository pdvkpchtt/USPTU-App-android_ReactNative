import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import Layout from '../../shared/ui/Layout'

const Food = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: 'USPTU Food',
    })
  }, [navigation])
  return (
    <>
      {/* <Layout> */}
      <WebView
        source={{
          uri: 'https://food.rusoil.net',
        }}
        style={{ width: '100%', height: '100%' }}
      />
      {/* </Layout> */}
    </>
  )
}
// const styles = StyleSheet.create({
//   scrollStyle: {
//     backgroundColor: SwitchTheme(isTheme).bgFon,
//   },
// })

export default Food
