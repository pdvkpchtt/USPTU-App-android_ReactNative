import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileStackScreen from './Profile/ProfileStackScreen'
import ScheduleStackScreen from './Schedule/ScheduleStackScreen'
import GradesStackScreen from './Grades/GradesStackScreen'
import GradeIcon from '../shared/ui/Icons/Tabbar/GradeIcon'
import ScheduleIcon from '../shared/ui/Icons/Tabbar/ScheduleIcon'
import ProfileIcon from '../shared/ui/Icons/Tabbar/ProfileIcon'
import SwitchTheme from '../shared/theme/SwitchTheme'
import useThemeStore from '../shared/theme/store/store'
import { Dimensions, ImageBackground, PixelRatio, StyleSheet, View } from 'react-native'
import ItFon from '../shared/images/ItFon.js'
const Tab = createBottomTabNavigator()

const Tabbar = () => {
  const { width, height } = Dimensions.get('screen')
  const isTheme = useThemeStore((state) => state.theme)
  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  }
  const navThemeDark = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: 'transparent',
    },
  }
  // const width = PixelRatio.roundToNearestPixel(0.5)
  // console.log(SwitchTheme(isTheme).fonImage)
  return (
    <>
      <View
        style={{
          position: 'absolute',
          width: width,
          height: height,
          bottom: -89,
          top: 20,
          backgroundColor: SwitchTheme(isTheme).bgFon,
        }}
      >
        {SwitchTheme(isTheme).fonImage}
      </View>
      {/* <ImageBackground source={require('../shared/images/ftt.png')} style={styles.image}> */}
      <NavigationContainer theme={isTheme.includes('_dark') ? navThemeDark : navTheme}>
        <Tab.Navigator
          id="Tabbar"
          initialRouteName="TabSchedule"
          screenOptions={({ route }) => {
            return {
              tabBarStyle: {
                style: {
                  elevation: 0, // for Android
                  shadowOffset: {
                    width: 0,
                    height: 0, // for iOS
                  },
                },
                backgroundColor: isTheme == 'theme_usual' ? SwitchTheme(isTheme).bgFon : SwitchTheme(isTheme).bgItem,
                borderTopWidth: 0,
                elevation: 0,
                // borderTopColor: SwitchTheme(isTheme).colorlineBottomNav,
                paddingBottom: 12,
                paddingTop: 10,
                height: 80,
              },
              tabBarLabelStyle: {
                fontFamily: 'Roboto-Medium',
                fontSize: 13,
                lineHeight: 20,
                letterSpacing: 0.1,
              },

              tabBarActiveTintColor: isTheme.includes('theme_epsh')
                ? (route.name === 'TabGrades' && SwitchTheme(isTheme).tabBarActiveTintColorLeft) ||
                  (route.name === 'TabSchedule' && SwitchTheme(isTheme).tabBarActiveTintColor) ||
                  (route.name === 'TabProfile' && SwitchTheme(isTheme).tabBarActiveTintColorRight)
                : SwitchTheme(isTheme).tabBarInactiveTintColor,
              tabBarInactiveTintColor: SwitchTheme(isTheme).tabBarInactiveTintColor,
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'TabGrades') {
                  return (
                    <View
                      style={{
                        backgroundColor: focused ? '#DCE3EB' : 'transparent',
                        borderRadius: 32,
                        paddingHorizontal: 20,
                        paddingVertical: 4,
                      }}
                    >
                      <GradeIcon
                        size={6}
                        color={
                          isTheme.includes('theme_epsh')
                            ? focused
                              ? SwitchTheme(isTheme).tabBarActiveTintColorLeft
                              : SwitchTheme(isTheme).tabBarInactiveTintColor
                            : focused
                            ? SwitchTheme(isTheme).tabBarActiveTintColor
                            : SwitchTheme(isTheme).tabBarInactiveTintColor
                        }
                      />
                    </View>
                  )
                } else if (route.name === 'TabSchedule') {
                  return (
                    <View
                      style={{
                        backgroundColor: focused ? '#DCE3EB' : 'transparent',
                        borderRadius: 32,
                        paddingHorizontal: 20,
                        paddingVertical: 4,
                      }}
                    >
                      <ScheduleIcon
                        size={6}
                        color={
                          focused
                            ? SwitchTheme(isTheme).tabBarActiveTintColor
                            : SwitchTheme(isTheme).tabBarInactiveTintColor
                        }
                      />
                    </View>
                  )
                } else if (route.name === 'TabProfile') {
                  return (
                    <View
                      style={{
                        backgroundColor: focused ? '#DCE3EB' : 'transparent',
                        borderRadius: 32,
                        paddingHorizontal: 20,
                        paddingVertical: 4,
                      }}
                    >
                      <ProfileIcon
                        size={8}
                        color={
                          isTheme.includes('theme_epsh')
                            ? focused
                              ? SwitchTheme(isTheme).tabBarActiveTintColorRight
                              : SwitchTheme(isTheme).tabBarInactiveTintColor
                            : focused
                            ? SwitchTheme(isTheme).tabBarActiveTintColor
                            : SwitchTheme(isTheme).tabBarInactiveTintColor
                        }
                      />
                    </View>
                  )
                }
              },
            }
          }}
        >
          <Tab.Screen
            name="TabGrades"
            component={GradesStackScreen}
            options={{ tabBarLabel: 'Успеваемость', headerShown: false, title: 'Успеваемость' }}
          />
          <Tab.Screen
            name="TabSchedule"
            component={ScheduleStackScreen}
            options={{ tabBarLabel: 'Расписание', headerShown: false, title: 'Расписание' }}
          />
          <Tab.Screen
            name="TabProfile"
            component={ProfileStackScreen}
            options={{ tabBarLabel: 'Профиль', headerShown: false, title: 'Профиль' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
      {/* </ImageBackground> */}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Tabbar
