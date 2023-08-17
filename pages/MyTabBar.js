import { useEffect, useState } from 'react'
import { Keyboard, PixelRatio, Pressable, Text, View } from 'react-native'
import useThemeStore from '../shared/theme/store/store'
import SwitchTheme from '../shared/theme/SwitchTheme'
import GradeIcon from '../shared/ui/Icons/Tabbar/GradeIcon'
import ProfileIcon from '../shared/ui/Icons/Tabbar/ProfileIcon'
import ScheduleIcon from '../shared/ui/Icons/Tabbar/ScheduleIcon'

const MyTabBar = ({ state, descriptors, navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])

  const activeScreen = state.routes[state.index].key

  const [keyboardStatus, setKeyboardStatus] = useState(false)
  const _keyboardDidShow = () => setKeyboardStatus(true)
  const _keyboardDidHide = () => setKeyboardStatus(false)

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 80,
        backgroundColor: 'red',
        bottom: keyboardStatus ? -8000 : 0,
        backgroundColor: SwitchTheme(isTheme).bgTopNav,
        borderTopWidth: PixelRatio.roundToNearestPixel(0.5),
        elevation: 0,
        borderTopColor: SwitchTheme(isTheme).colorlineBottomNav,
        paddingBottom: 12,
        paddingTop: 12,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index
        console.log(label)
        const IconMode = (label, focused) => {
          if (label === 'Успеваемость') {
            return (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: isTheme.includes('theme_usual')
                    ? focused
                      ? SwitchTheme(isTheme).usualIconOreol
                      : 'transparent'
                    : isTheme.includes('theme_epsh')
                    ? focused
                      ? SwitchTheme(isTheme).tabBarActiveTintColorLeft
                      : 'transparent'
                    : focused
                    ? SwitchTheme(isTheme).tabBarActiveTintColor
                    : 'transparent',
                  borderRadius: 32,
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                  borderRadius: 32,
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                }}
              >
                <GradeIcon
                  size={6}
                  color={
                    isTheme.includes('theme_usual')
                      ? focused
                        ? SwitchTheme(isTheme).tabBarActiveTintColor
                        : SwitchTheme(isTheme).tabBarInactiveTintColor
                      : focused
                      ? '#fff'
                      : SwitchTheme(isTheme).tabBarInactiveTintColor
                  }
                />
              </View>
            )
          } else if (label === 'Расписание') {
            return (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: isTheme.includes('theme_usual')
                    ? focused
                      ? SwitchTheme(isTheme).usualIconOreol
                      : 'transparent'
                    : isTheme.includes('theme_epsh')
                    ? focused
                      ? SwitchTheme(isTheme).tabBarActiveTintColor
                      : 'transparent'
                    : focused
                    ? SwitchTheme(isTheme).tabBarActiveTintColor
                    : 'transparent',
                  borderRadius: 32,
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                  borderRadius: 32,
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                }}
              >
                <ScheduleIcon
                  size={6}
                  color={
                    isTheme.includes('theme_usual')
                      ? focused
                        ? SwitchTheme(isTheme).tabBarActiveTintColor
                        : SwitchTheme(isTheme).tabBarInactiveTintColor
                      : focused
                      ? '#fff'
                      : SwitchTheme(isTheme).tabBarInactiveTintColor
                  }
                />
              </View>
            )
          } else if (label === 'Профиль') {
            return (
              <View
                style={{
                  alignItems: 'center',
                  backgroundColor: isTheme.includes('theme_usual')
                    ? focused
                      ? SwitchTheme(isTheme).usualIconOreol
                      : 'transparent'
                    : isTheme.includes('theme_epsh')
                    ? focused
                      ? SwitchTheme(isTheme).tabBarActiveTintColorRight
                      : 'transparent'
                    : focused
                    ? SwitchTheme(isTheme).tabBarActiveTintColor
                    : 'transparent',
                  borderRadius: 32,
                  paddingHorizontal: 20,
                  paddingVertical: 4,
                }}
              >
                <ProfileIcon
                  size={8}
                  color={
                    isTheme.includes('theme_usual')
                      ? focused
                        ? SwitchTheme(isTheme).tabBarActiveTintColor
                        : SwitchTheme(isTheme).tabBarInactiveTintColor
                      : focused
                      ? '#fff'
                      : SwitchTheme(isTheme).tabBarInactiveTintColor
                  }
                />
              </View>
            )
          }
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        return (
          <Pressable
            style={{
              alignItems: 'center',
              width: '33%',
            }}
            onPress={onPress}
          >
            {IconMode(label, isFocused)}
            <Text
              style={{
                marginTop: 4,
                fontFamily: 'Roboto-Medium',
                fontSize: 13,
                lineHeight: 20,
                letterSpacing: 0.1,
                color: isFocused
                  ? SwitchTheme(isTheme).tabBarInactiveTintColor
                  : SwitchTheme(isTheme).tabBarInactiveTintColor,
              }}
            >
              {label}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export default MyTabBar
