import { Pressable, Text, View, Modal } from 'react-native'
import { useUserStore } from '../../entities/user'
import Layout from '../../shared/ui/Layout'
import { NameBlock } from '../../entities/NameBlock'
import NavList from '../../features/NavList'
import { useEffect, useLayoutEffect, useState } from 'react'
import SecondaryButton from '../../shared/ui/secondaryButton'
import useTokenStore from '../../shared/apiClient/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'
import { useRoute } from '@react-navigation/native'

const Profile = ({ navigation }) => {
  const getProfileInformation = useUserStore((state) => state.getProfileInformation)
  const logout = useTokenStore((state) => state.logout)
  const isTheme = useThemeStore((state) => state.theme)

  const [modal, setModal] = useState(false)

  useEffect(() => {
    getProfileInformation()
  }, [])

  return (
    <>
      <Layout onRefresh={getProfileInformation}>
        <NameBlock navigation={navigation} />
        <NavList navigation={navigation} />
        <SecondaryButton
          color={SwitchTheme(isTheme).textButtonExit}
          marginTop={16}
          marginBottom={16}
          onPress={() => setModal(true)}
        >
          Выйти
        </SecondaryButton>
      </Layout>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal)
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: 8,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}
        >
          <View
            style={{
              backgroundColor: SwitchTheme(isTheme).bgItem,
              width: '100%',
              maxWidth: 340,
              elevation: 24,
              borderRadius: 2,
              padding: 24,
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                color: SwitchTheme(isTheme).textMain,
                fontSize: 21,
                marginBottom: 12,
              }}
            >
              Выход
            </Text>
            <Text style={{ fontFamily: 'Roboto-Regular', color: SwitchTheme(isTheme).textMain, fontSize: 16 }}>
              Вы действительно хотите выйти?
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 12,
              }}
            >
              <Pressable
                onPress={() => {
                  setModal(false)
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      color: pressed
                        ? isTheme.includes('theme_usual')
                          ? SwitchTheme(isTheme).hoverBlue
                          : SwitchTheme(isTheme).hoverEffect
                        : SwitchTheme(isTheme).checkIcon,
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginRight: 40,
                    }}
                  >
                    НЕТ
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  setModal(false)
                  logout()
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      color: pressed
                        ? isTheme.includes('theme_usual')
                          ? SwitchTheme(isTheme).hoverBlue
                          : SwitchTheme(isTheme).hoverEffect
                        : SwitchTheme(isTheme).checkIcon,
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginRight: 8,
                    }}
                  >
                    ДА
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default Profile
