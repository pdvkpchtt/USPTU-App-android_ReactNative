import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationOptions from '../../shared/ui/Configs/NavigationOptions'
import GradeInfo from './GradeInfo'
import Grades from './Grades'
import RankingGrades from './RankingGrades'

const GradesStack = createNativeStackNavigator()

const GradesStackScreen = ({ navigation }) => {
  return (
    <GradesStack.Navigator screenOptions={NavigationOptions()}>
      <GradesStack.Screen name="Успеваемость" component={Grades} />
      <GradesStack.Screen name="Информация о дисциплине" component={GradeInfo} />
      <GradesStack.Screen name="Дисциплины категории" component={RankingGrades} />
    </GradesStack.Navigator>
  )
}

export default GradesStackScreen
