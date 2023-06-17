import Layout from '../../shared/ui/Layout'
import ListItemWithLink from '../../shared/ui/ListItemWithLink'
import * as Linking from 'expo-linking'
import { View } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'

const About = () => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 12 }}>
        <ListItemWithLink
          title="Чат в Telegram"
          position="top"
          onPress={() => {
            Linking.openURL('https://t.me/nikolaynumbers')
          }}
        />
        <ListItemWithLink
          title="Канал в Telegram"
          onPress={() => {
            Linking.openURL('https://t.me/usptudev')
          }}
        />
        <ListItemWithLink
          title="Почта разработчиков"
          position="bottom"
          onPress={() => {
            Linking.openURL('mailto:oau@rusoil.net?subject=Личный кабинет студента. Мобильное приложение&body=')
          }}
        />
      </View>
    </Layout>
  )
}

export default About
