import { Pressable, Text, View } from 'react-native'
import { useUserStore } from '../../entities/user'
import Layout from '../../shared/ui/Layout'
import { NameBlock } from '../../entities/NameBlock'
import NavList from '../../features/NavList'
import { useEffect, useLayoutEffect } from 'react'
import SecondaryButton from '../../shared/ui/secondaryButton'
import useTokenStore from '../../shared/apiClient/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'
import { useRoute } from '@react-navigation/native'

const Profile = ({ navigation }) => {
  const getProfileInformation = useUserStore((state) => state.getProfileInformation)
  const logout = useTokenStore((state) => state.logout)
  const isTheme = useThemeStore((state) => state.theme)

  useEffect(() => {
    getProfileInformation()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontSize: 20,
            lineHeight: 24,
            color: SwitchTheme(isTheme).textMain,
            fontFamily: 'Roboto-Medium',
          }}
        >
          Профиль
        </Text>
      ),
    })
  }, [])

  return (
    <Layout onRefresh={getProfileInformation}>
      <NameBlock navigation={navigation} />
      <NavList navigation={navigation} />
      <SecondaryButton color={SwitchTheme(isTheme).textButtonExit} marginTop={16} marginBottom={16} onPress={logout}>
        Выйти
      </SecondaryButton>
    </Layout>
  )
}

export default Profile
