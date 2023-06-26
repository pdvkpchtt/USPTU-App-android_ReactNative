import React, { useEffect, useLayoutEffect } from 'react'
import { Dimensions, Linking, StyleSheet, View, Pressable } from 'react-native'

import Svg, { Path } from 'react-native-svg'
import AnimatedText from './AnimatedText'
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated'

import { pathsMax, pathsDenis, pathsNikolay, pathsNastya, pathDanil } from './SVGPaths'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

export default function EasterEgg({ navigation }) {
  const isTheme = useThemeStore((state) => state.theme) // пока добавил для статус бара danil

  const { width, height } = Dimensions.get('screen')

  // const colors = ['#7EDAB9']
  const vWidthMax = 715
  const vHeightMax = 317
  const widthMax = (Dimensions.get('window').width - 64) / 1.5
  const heightMax = (widthMax * vHeightMax) / vWidthMax / 1.5

  const vWidthDenis = 715
  const vHeightDenis = 470
  const widthDenis = (Dimensions.get('window').width - 64) / 1.5
  const heightDenis = (widthDenis * vHeightDenis) / vWidthDenis / 1.5

  const vWidthDanil = 228
  const vHeightDanil = 146
  const widthDanil = (Dimensions.get('window').width - 64) / 1.5
  const heightDanil = (widthDanil * vHeightDanil) / vWidthDanil / 1.5

  const vWidthNikolay = 892
  const vHeightNikolay = 534
  const widthNikolay = (Dimensions.get('window').width - 64) / 1.5
  const heightNikolay = (widthNikolay * vHeightNikolay) / vWidthNikolay / 1.5

  const vWidthNastya = 836
  const vHeightNastya = 464
  const widthNastya = (Dimensions.get('window').width - 64) / 1.5
  const heightNastya = (widthNastya * vHeightNastya) / vWidthNastya / 1.5

  const color = SwitchTheme(isTheme).textMain
  const bg = SwitchTheme(isTheme).bgItem
  // const bg_back = useColorModeValue('#F2F2F7', 'black')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '👨🏻‍💻👷🏽‍♂️🙃😼🤡',
      headerLeft: null,
      headerTitleAlign: 'center',
    })
  }, [navigation])

  const style = StyleSheet.create({
    layer: {
      flex: 0,
      alignItems: 'center',
      backgroundColor: bg,
      height: 335,
      width: Dimensions.get('window').width - 32,
      marginLeft: 16,
      marginRight: 16,
      top: 24,
      borderRadius: 15,
    },
    // back: {
    //   width: '100%',
    //   height: '100%',
    //   backgroundColor: bg_back,
    //   //justifyContent: 'center'
    // },
  })

  const progressMax = useSharedValue(0)
  const progressOpacityMax = useSharedValue(0)
  const progressDenis = useSharedValue(0)
  const progressOpacityDenis = useSharedValue(0)
  const progressOpacityDanil = useSharedValue(0)
  const progressNikolay = useSharedValue(0)
  const progressOpacityNikolay = useSharedValue(0)
  const progressNastya = useSharedValue(0)
  const progressOpacityNastya = useSharedValue(0)
  const progressDanil = useSharedValue(0)

  const progresses = [progressDenis, progressNastya, progressNikolay, progressMax, progressDanil]
  const progressOpacities = [
    progressOpacityDenis,
    progressOpacityNastya,
    progressOpacityNikolay,
    progressOpacityMax,
    progressOpacityDanil,
  ]

  useEffect(() => {
    setTimeout(() => {
      progresses[0].value = withTiming(1, { duration: 1000, easing: Easing.linear })
      setTimeout(() => {
        progressOpacities[0].value = withTiming(1, { duration: 500, easing: Easing.linear })
      }, 1000)
      setTimeout(() => {
        progresses[1].value = withTiming(1, { duration: 1000, easing: Easing.linear })
        setTimeout(() => {
          progressOpacities[1].value = withTiming(1, { duration: 500, easing: Easing.linear })
        }, 1000)
      }, 1000)
      setTimeout(() => {
        progresses[2].value = withTiming(1, { duration: 1000, easing: Easing.linear })
        setTimeout(() => {
          progressOpacities[2].value = withTiming(1, { duration: 500, easing: Easing.linear })
        }, 1000)
      }, 2000)
      setTimeout(() => {
        progresses[3].value = withTiming(1, { duration: 1000, easing: Easing.linear })
        setTimeout(() => {
          progressOpacities[3].value = withTiming(1, { duration: 500, easing: Easing.linear })
        }, 1000)
      }, 3000)
      setTimeout(() => {
        progresses[4].value = withTiming(1, { duration: 1000, easing: Easing.linear })
        setTimeout(() => {
          progressOpacities[4].value = withTiming(1, { duration: 500, easing: Easing.linear })
        }, 1000)
      }, 4000)
    }, 300)
  }, [
    progressMax,
    progressDenis,
    progressNikolay,
    progressNastya,
    progressDanil,
    progressOpacityMax,
    progressOpacityDenis,
    progressOpacityNikolay,
    progressOpacityNastya,
    progressOpacityDanil,
  ])

  return (
    <>
      <View style={style.back}>
        <View style={style.layer}>
          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Svg
                width={widthDenis}
                height={heightDenis}
                viewBox={[0, 0, vWidthDenis, vHeightDenis].join(' ')}
                style={{ top: 10, left: 20, transform: [{ rotate: '5deg' }, { scale: 1.2 }] }}
              >
                {pathsDenis.map((d, key) => (
                  <AnimatedText
                    progress={progressDenis}
                    progressOpacity={progressOpacityDenis}
                    d={d}
                    stroke={color}
                    strokeWidth={1}
                    key={key}
                    fill={color}
                  />
                ))}
              </Svg>
              <Svg
                width={widthNastya}
                height={heightNastya}
                viewBox={[0, 0, vWidthNastya, vHeightNastya].join(' ')}
                style={{ top: 15, right: 10, transform: [{ rotate: '5deg' }] }}
              >
                {pathsNastya.map((d, key) => (
                  <AnimatedText
                    progress={progressNastya}
                    progressOpacity={progressOpacityNastya}
                    d={d}
                    stroke={color}
                    strokeWidth={1}
                    key={key}
                    fill={color}
                  />
                ))}
              </Svg>
            </View>
            <View style={{ top: 70, display: 'flex', flexDirection: 'row' }}>
              <Svg
                width={widthNikolay}
                height={heightNikolay}
                viewBox={[0, 0, vWidthNikolay, vHeightNikolay].join(' ')}
                style={{ top: -20, left: 20, transform: [{ rotate: '-5deg' }] }}
              >
                {pathsNikolay.map((d, key) => (
                  <AnimatedText
                    progress={progressNikolay}
                    progressOpacity={progressOpacityNikolay}
                    d={d}
                    stroke={color}
                    strokeWidth={1}
                    key={key}
                    fill={color}
                  />
                ))}
              </Svg>
              <Svg
                width={widthMax}
                height={heightMax}
                viewBox={[0, 0, vWidthMax, vHeightMax].join(' ')}
                style={{ right: 15, transform: [{ rotate: '-5deg' }] }}
              >
                {pathsMax.map((d, key) => (
                  <AnimatedText
                    progress={progressMax}
                    progressOpacity={progressOpacityMax}
                    d={d}
                    stroke={color}
                    strokeWidth={1}
                    key={key}
                    fill={color}
                  />
                ))}
              </Svg>
            </View>
            <View style={{ top: 70, display: 'flex', flexDirection: 'row' }}>
              <Svg
                width={widthDanil}
                height={heightDanil}
                viewBox={[0, 0, vWidthDanil, vHeightDanil].join(' ')}
                style={{
                  left: 20,
                  top: 5,
                  scale: 0.075,
                  transform: [{ scaleX: 1 }, { scaleY: -1 }, { rotate: '5deg' }],
                }}
              >
                {pathDanil.map((d, key) => (
                  <AnimatedText
                    progress={progressDanil}
                    progressOpacity={progressOpacityDanil}
                    d={d}
                    stroke={color}
                    strokeWidth={1}
                    key={key}
                    fill={color}
                  />
                ))}
              </Svg>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          height,
          width,
          bottom: 0,
          top: -71, // danil костыль/фикс полоски смешной серху
          right: 0,
          left: 0,
          zIndex: -1,
          lineHeight: 0,
          // borderTopColor: 'red',
          // borderTopWidth: 2,
          backgroundColor: SwitchTheme(isTheme).bgFon,
        }}
      >
        {SwitchTheme(isTheme).fonImage}
      </View>
    </>
  )
}
