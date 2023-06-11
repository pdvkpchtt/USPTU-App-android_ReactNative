import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Movements from './Movements'
import MyWorks from './MyWorks/MyWorks'
import PersonalInfo from './PersonalInfo'
import Profile from './Profile'
import WorkInfo from './MyWorks/WorkInfo'
import WorkAdd from './MyWorks/WorkAdd'
import About from './About'
import Resources from './Resources'
import Messages from './Messages/Messages'
import Files from './Files/Files'
import FileDiscipline from './Files/FileDiscipline'
import MessageDiscipline from './Messages/MessageDiscipline'
import ChangeGroup from './ChangeGroup'
import Food from './Food'
import InstructionsEducators from './InstructionsEducators/InstructionsEducators'
import InstructionsEducatorsDiscipline from './InstructionsEducators/InstructionsEducatorsDiscipline'
import Curriculum from './Curriculum/Curriculum'
import CurriculumDiscipline from './Curriculum/CurriculumDiscipline'
import Hostel from './Hostel/Hostel'
import PaymentsHostel from './Hostel/PaymentsHostel'
import InfoPaymentsHostel from './Hostel/InfoPaymentsHostel'
import Decoration from './Decoration'
import Payments from './Payments/Payments'
import ActivePayments from './Payments/ActivePayments'
import InfoPayment from './Payments/InfoPayment'
import DisciplineChoice from './MyWorks/DisciplineChoice'
import TypeChoice from './MyWorks/TypeChoice'
import EditText from './MyWorks/EditText'
import ChooseGroup from './ChooseGroup'
import NavigationOptions from '../../shared/ui/Configs/NavigationOptions'
import { TransitionSpecs } from '@react-navigation/stack'
import EasterEgg from './EasterEgg/EasterEgg'

const ProfileStack = createNativeStackNavigator()

const ProfileStackScreen = ({ navigation }) => {
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
      <ProfileStack.Screen name="Профиль" component={Profile} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Персональная информация" component={PersonalInfo} options={CardOptions} />
      <ProfileStack.Screen
        name="Смена группы"
        component={ChangeGroup}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen name="Сведения о движении" component={Movements} options={CardOptions} />
      <ProfileStack.Screen
        name="Мои работы"
        component={MyWorks}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen name="Выбор дисциплины" component={DisciplineChoice} />
      <ProfileStack.Screen name="Выбор вида работы" component={TypeChoice} />
      <ProfileStack.Screen name="Правка" component={EditText} />
      <ProfileStack.Screen name="Сообщения" component={Messages} />
      <ProfileStack.Screen name="Сообщения дисциплины" component={MessageDiscipline} />
      <ProfileStack.Screen name="Файлы" component={Files} />
      <ProfileStack.Screen
        name="Файлы дисциплины"
        component={FileDiscipline}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen
        name="Информация о работе"
        component={WorkInfo}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen
        name="Добавление работы"
        component={WorkAdd}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen
        name="Указания от преподавателей"
        component={InstructionsEducators}
        options={{
          headerBackTitle: 'Профиль',
        }}
      />
      <ProfileStack.Screen name="Указания от преподавателей дисциплины" component={InstructionsEducatorsDiscipline} />
      <ProfileStack.Screen name="Учебный план" component={Curriculum} />
      <ProfileStack.Screen
        name="Учебный план семестр"
        component={CurriculumDiscipline}
        options={{
          headerBackTitle: 'Назад',
        }}
      />
      <ProfileStack.Screen name="Выбор группы" component={ChooseGroup} />
      <ProfileStack.Screen name="Ресурсы" component={Resources} />
      <ProfileStack.Screen name="О приложении" component={About} />
      <ProfileStack.Screen name="USPTU Food" component={Food} />
      <ProfileStack.Screen name="Общежитие" component={Hostel} />
      <ProfileStack.Screen name="Счета" component={PaymentsHostel} />
      <ProfileStack.Screen name="Сведения о счёте" component={InfoPaymentsHostel} />
      <ProfileStack.Screen name="Выплаты" component={Payments} />
      <ProfileStack.Screen name="Активные/Истекшие выплаты" component={ActivePayments} />
      <ProfileStack.Screen name="Информация о выплате" component={InfoPayment} />
      <ProfileStack.Screen name="Оформление" component={Decoration} />
      <ProfileStack.Screen name="Пасхалка" component={EasterEgg} options={{ headerShown: true }} />
      {/* <ProfileStack.Screen name="Сведения о движении" component={} />
      <ProfileStack.Screen name="Мои работы" component={} />
      <ProfileStack.Screen name="Сообщения" component={} />
      
      
      
      <ProfileStack.Screen name="USPTU Food" component={} />
      <ProfileStack.Screen name="Общежитие" component={} />
      
      <ProfileStack.Screen name="Ресурсы" component={} />
     
       */}
    </ProfileStack.Navigator>
  )
}

export default ProfileStackScreen
