import Layout from '../../shared/ui/Layout'
import ListItemWithLink from '../../shared/ui/ListItemWithLink'
import * as Linking from 'expo-linking'
import { View } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'

const Resources = () => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
        <ListItemWithLink
          title="Библиотека"
          position="top"
          onPress={() => {
            Linking.openURL('https://bibl.rusoil.net/')
          }}
        />
        <ListItemWithLink
          title="Расписание занятий"
          onPress={() => {
            Linking.openURL('https://raspisanie.rusoil.net/')
          }}
        />
        <ListItemWithLink
          title="Система дистанционного образования"
          onPress={() => {
            Linking.openURL('https://do.rusoil.net/login/index.php')
          }}
        />
        <ListItemWithLink
          title="Электронная приемная"
          position="bottom"
          onPress={() => {
            Linking.openURL('https://ams.rusoil.net/oau/ep_og')
          }}
        />
      </View>
    </Layout>
  )
}

export default Resources
