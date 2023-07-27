import React, { useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated'
import SplashScreen from './SplashScreen/SplashScreen'
import useIntroStore from '../shared/introScreen/store/store'
import TextBody from '../shared/ui/Text/TextBody'

export default function IntroScreen() {
  const [isShowDots, setIsShowDots] = useState(true)
  const [isShowButton, setIsShowButton] = useState(false)
  const windowHeight = Dimensions.get('window').height

  const { setShowIntro } = useIntroStore((state) => ({
    setShowIntro: state.setShowIntro,
  }))

  const slides = [
    {
      key: 1,
      title: 'Оценки в кармане.',
      subTitle: 'Раздел учеба. Поможет оставаться в курсе успеваемости.',
    },
    {
      key: 2,
      title: 'Где деньги, Лебовски?',
      subTitle: 'Просматривайте финансовую статистику в профиле.',
    },
    {
      key: 3,
      title: 'Найдётся всё!',
      subTitle: 'С помощью поиска находите преподавателей, группы и кабинеты.',
    },
    {
      key: 4,
      title: 'Потеряли ссылку?',
      subTitle: 'Заходите на онлайн-пары прямо в расписании.',
    },
  ]

  const subTitleValidate = (index) => {
    switch (index) {
      case 0:
        return (
          <Text
            style={{
              marginTop: 8,
              flexWrap: 'wrap',
              color: '#1F1F1F',
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              lineHeight: 28,
              textAlign: 'left',
            }}
          >
            <Text
              style={{
                flexWrap: 'wrap',
                color: '#2259C9',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                lineHeight: 32,
                textAlign: 'left',
              }}
            >
              {'Раздел учеба. '}
            </Text>
            {'Поможет оставаться в курсе успеваемости.'}
          </Text>
        )
      case 1:
        return (
          <Text
            style={{
              marginTop: 8,
              flexWrap: 'wrap',
              color: '#2259C9',
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              lineHeight: 28,
              textAlign: 'left',
            }}
          >
            <Text
              style={{
                flexWrap: 'wrap',
                color: '#1F1F1F',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                lineHeight: 32,
                textAlign: 'left',
              }}
            >
              {'Просматривайте финансовую статистику'}
            </Text>
            {' в профиле.'}
          </Text>
        )
      case 2:
        return (
          <Text
            style={{
              marginTop: 8,
              flexWrap: 'wrap',
              color: '#1F1F1F',
              fontSize: 20,
              fontFamily: 'Roboto-Regular',
              lineHeight: 28,
              textAlign: 'left',
            }}
          >
            <Text
              style={{
                flexWrap: 'wrap',
                color: '#1F1F1F',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                lineHeight: 32,
                textAlign: 'left',
              }}
            >
              {'С помощью'}
            </Text>
            <Text
              style={{
                flexWrap: 'wrap',
                color: '#2259C9',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                lineHeight: 32,
                textAlign: 'left',
              }}
            >
              {' поиска '}
            </Text>

            {'находите преподавателей, группы и кабинеты.'}
          </Text>
        )
      case 3:
        return (
          <>
            <Text
              style={{
                marginTop: 8,
                flexWrap: 'wrap',
                color: '#2259C9',
                fontSize: 20,
                fontFamily: 'Roboto-Regular',
                lineHeight: 28,
                textAlign: 'left',
              }}
            >
              <Text
                style={{
                  flexWrap: 'wrap',
                  color: '#1F1F1F',
                  fontSize: 20,
                  fontFamily: 'Roboto-Regular',
                  lineHeight: 32,
                  textAlign: 'left',
                }}
              >
                {'Заходите на онлайн-пары прямо в '}
              </Text>
              {'расписании.'}
            </Text>
          </>
        )
    }
  }

  const onDone = () => {
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.exp),
    })
    setTimeout(() => {
      setShowIntro(false)
    }, 200)
  }
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, paddingHorizontal: 32, alignItems: 'flex-start' }}>
        <View style={{ marginTop: windowHeight * 0.4, justifyContent: 'flex-start' }}>
          <Text
            style={{
              color: '#1F1F1F',
              fontSize: 32,
              fontFamily: 'Roboto-Regular',
              lineHeight: 42,
              textAlign: 'left',
            }}
          >
            {item.title}
          </Text>
          <View style={{ flex: 1 }}>{subTitleValidate(index)}</View>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    dotStyle: {
      width: 10,
      height: 10,
      backgroundColor: '#C7C7CC',
      marginBottom: windowHeight * 0.2,
    },
    activeDotStyle: {
      width: 10,
      height: 10,
      backgroundColor: 'black',
      marginBottom: windowHeight * 0.2,
    },
    //[...]
  })

  const onSlideChange = (index) => {
    if (index === 3) {
      setIsShowButton(true)
    } else setIsShowButton(false)
  }

  const [showSplash, setShowSplash] = useState(true)
  setTimeout(() => {
    setShowSplash(false)
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    })
  }, 3400)

  const opacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Animated.View style={[{ width: '100%', height: '100%' }, animatedStyle]}>
          <AppIntroSlider
            overScrollMode="never"
            data={slides}
            renderItem={renderItem}
            showNextButton={false}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            renderDoneButton={null}
            onSlideChange={onSlideChange}
            renderPagination={isShowButton ? () => null : false}
          />
          {isShowButton && (
            <Pressable onPress={onDone} style={{ marginBottom: windowHeight * 0.14 }}>
              {({ pressed }) => {
                return (
                  <TextBody fontSize={20} textAlign="center" color={pressed ? '#1848A9' : '#2259C9'}>
                    Начать
                  </TextBody>
                )
              }}
            </Pressable>
          )}
        </Animated.View>
      )}
    </>
  )
}
