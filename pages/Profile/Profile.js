import { Pressable, Text, View } from 'react-native'
import { useUserStore } from '../../entities/user'
import Layout from '../../shared/ui/Layout'
import { NameBlock } from '../../entities/NameBlock'
import NavList from '../../features/NavList'
import { useEffect } from 'react'
import SecondaryButton from '../../shared/ui/secondaryButton'
import useTokenStore from '../../shared/apiClient/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'

const Profile = ({ navigation }) => {
  const getProfileInformation = useUserStore((state) => state.getProfileInformation)
  const logout = useTokenStore((state) => state.logout)
  const isTheme = useThemeStore((state) => state.theme)

  useEffect(() => {
    getProfileInformation()
  }, [])

  return (
    <Layout onRefresh={getProfileInformation}>
      <NameBlock navigation={navigation} />
      <NavList navigation={navigation} />
      <SecondaryButton color={SwitchTheme(isTheme).textButtonExit} marginTop={24} onPress={logout}>
        Выйти
      </SecondaryButton>
    </Layout>
  )
}

export default Profile
