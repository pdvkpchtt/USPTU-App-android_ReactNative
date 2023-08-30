import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GradeInfo from '../../pages/Grades/GradeInfo'
import Grades from '../../pages/Grades/Grades'
import RankingGrades from '../../pages/Grades/RankingGrades'
import NavigationOptions from '../../shared/ui/Configs/NavigationOptions'
import DemoGrades from './DemoGrades'

const GradesStack = createNativeStackNavigator()

const DemoGradesStackScreen = ({ navigation }) => {
  return (
    <GradesStack.Navigator screenOptions={NavigationOptions()}>
      <GradesStack.Screen name="Успеваемость" component={DemoGrades} />
      <GradesStack.Screen name="Информация о дисциплине" component={GradeInfo} />
      <GradesStack.Screen name="Дисциплины категории" component={RankingGrades} />
    </GradesStack.Navigator>
  )
}

export default DemoGradesStackScreen
