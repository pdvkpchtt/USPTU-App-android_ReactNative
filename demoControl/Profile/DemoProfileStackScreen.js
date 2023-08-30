import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TransitionSpecs } from '@react-navigation/stack'
import About from '../../pages/Profile/About'
import Decoration from '../../pages/Profile/Decoration'
import EasterEgg from '../../pages/Profile/EasterEgg/EasterEgg'
import Resources from '../../pages/Profile/Resources'
import NavigationOptions from '../../shared/ui/Configs/NavigationOptions'
import DemoMovements from './DemoMovements'
import DemoPersonalInfo from './DemoPersonalInfo'
import DemoProfile from './DemoProfile'

const ProfileStack = createNativeStackNavigator()

const DemoProfileStackScreen = ({ navigation }) => {
  const TransitionScreen = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              translateX: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -layouts.screen.width],
                  })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      }
    },
  }

  const CardOptions = {
    cardStyle: { backgroundColor: 'transparent' },
    ...TransitionScreen,
  }
  return (
    <ProfileStack.Navigator screenOptions={NavigationOptions()}>
      <ProfileStack.Screen name="Профиль" component={DemoProfile} />
      <ProfileStack.Screen name="Персональная информация" component={DemoPersonalInfo} options={CardOptions} />
      <ProfileStack.Screen name="Сведения о движении" component={DemoMovements} options={CardOptions} />
      <ProfileStack.Screen name="Ресурсы" component={Resources} />
      <ProfileStack.Screen name="О приложении" component={About} />
      <ProfileStack.Screen name="Оформление" component={Decoration} />
      <ProfileStack.Screen name="Пасхалка" component={EasterEgg} options={{ headerShown: true }} />
    </ProfileStack.Navigator>
  )
}

export default DemoProfileStackScreen
