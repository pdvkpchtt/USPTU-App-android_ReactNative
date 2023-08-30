import { useEffect } from 'react'
import { Alert, Pressable, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useUserStore } from '../../../entities/user'
import useTokenStore from '../../../shared/apiClient/store/store'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import RoundedButton from '../../../shared/ui/roundedButton'
import TextBody from '../../../shared/ui/Text/TextBody'
import useDemoStore from '../../../demoControl/store'

const Form = ({ logIn }) => {
  const { demo, setDemo } = useDemoStore((state) => ({
    demo: state.demo,
    setDemo: state.setDemo,
  }))

  const isTheme = useThemeStore((state) => state.theme)
  const { savePar, deviceId, validateAccessToken } = useUserStore((state) => ({
    savePar: state.savePar,
    deviceId: state.deviceId,
    validateAccessToken: state.validateAccessToken,
  }))
  const opacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    opacity.value = withTiming(1)
    // validateAccessToken(
    //   'BC928BB7027CA57244E75FEC136A3BAFC4A5852A788EC6FF7E4017CE705B255AF3A8D10ECF1A4B0392E074985277F79A'
    // )
  }, [])

  return (
    <View style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, paddingHorizontal: 16 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingTop: '90%',
          alignItems: 'center',
          marginTop: -70,
          marginLeft: -50,
          backgroundColor: 'white',
        }}
      >
        <Animated.View style={animatedStyle}>
          <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 56, lineHeight: 56, color: 'black' }}>USPTU</Text>
          <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 56, lineHeight: 56, color: 'black' }}>App</Text>
        </Animated.View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 0,
          alignSelf: 'center',
          paddingBottom: '30%',
          alignItems: 'center',
        }}
      >
        <Animated.View style={[animatedStyle]}>
          <RoundedButton
            width={230}
            onPress={() =>
              Alert.alert(
                'Авторизация',
                'Для авторизации вы будете перенаправлены на сайт личного кабинета УГНТУ',
                [
                  {
                    text: 'Перейти',
                    onPress: () => {
                      logIn(savePar, deviceId, validateAccessToken)
                    },
                    style: 'default',
                  },
                ],
                { cancelable: true }
              )
            }
          >
            Войти
          </RoundedButton>
        </Animated.View>
        <Animated.View style={[animatedStyle, { top: 10 }]}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 10,
              lineHeight: 10,
              textAlign: 'center',
              color: '#A5A5A5',
            }}
          >
            Вход выполняется через
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 10,
              lineHeight: 10,
              textAlign: 'center',
              color: '#A5A5A5',
            }}
          >
            личный кабинет УГНТУ
          </Text>
        </Animated.View>
        <Animated.View style={[animatedStyle, { top: 20 }]}>
          <Pressable
            onPress={() => {
              setDemo(true)
              useTokenStore.setState({ isAuth: true })
            }}
          >
            {({ pressed }) => {
              return (
                <TextBody
                  fontSize={17}
                  letterSpacing={-0.41}
                  textAlign="center"
                  color={
                    pressed
                      ? isTheme.includes('theme_usual')
                        ? SwitchTheme(isTheme).hoverBlue
                        : SwitchTheme(isTheme).hoverEffect
                      : SwitchTheme(isTheme).checkIcon
                  }
                >
                  Demo
                </TextBody>
              )
            }}
          </Pressable>
        </Animated.View>
        {/* <Pressable onPress={demoLogIn}>
          {({ isPressed }) => {
            return (
              <VStack mt="32px" py="11px" width="100%" borderRadius="13px">
                <TextMedium color={isPressed ? '#1877DF' : '#007AFF'}>Демо-режим</TextMedium>
              </VStack>
            )
          }}
        </Pressable> */}
      </View>
    </View>
  )
}

export default Form
