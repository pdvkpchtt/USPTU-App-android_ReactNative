import { Pressable, Text, View } from 'react-native'
import { useEffect } from 'react'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import { DemoNameBlock } from './DemoNameBlock'
import Layout from '../../shared/ui/Layout'
import SecondaryButton from '../../shared/ui/secondaryButton'
import { useUserStore } from '../../entities/user'
import useTokenStore from '../../shared/apiClient/store/store'
import useThemeStore from '../../shared/theme/store/store'
import DemoNavList from './DemoNavList'
import useDemoStore from '../store'

const DemoProfile = ({ navigation }) => {
  const getProfileInformation = useUserStore((state) => state.getProfileInformation)
  const logout = useTokenStore((state) => state.logout)
  const isTheme = useThemeStore((state) => state.theme)
  const { setDemo } = useDemoStore((state) => ({
    setDemo: state.setDemo,
  }))

  useEffect(() => {
    getProfileInformation()
  }, [])

  return (
    <Layout onRefresh={getProfileInformation}>
      <DemoNameBlock navigation={navigation} />
      <DemoNavList navigation={navigation} />
      <SecondaryButton
        color={SwitchTheme(isTheme).textButtonExit}
        marginTop={16}
        marginBottom={16}
        onPress={() => {
          logout()
          setDemo(false)
        }}
      >
        Выйти
      </SecondaryButton>
    </Layout>
  )
}

export default DemoProfile
