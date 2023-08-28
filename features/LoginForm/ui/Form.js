import { useEffect } from 'react'
import { Alert, Text, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useUserStore } from '../../../entities/user'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import RoundedButton from '../../../shared/ui/roundedButton'

const Form = ({ logIn }) => {
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
    //   '8040D03C6B88B747C97C12E7D83445E90B6061ED9F97884AFA2BAAE10990E4B493816258E7A7D31E22971697FEEC3DEF'
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
