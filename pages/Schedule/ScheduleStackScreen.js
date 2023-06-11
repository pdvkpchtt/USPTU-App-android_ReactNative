import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useLayoutEffect, useReducer } from 'react'
import NavigationOptions from '../../shared/ui/Configs/NavigationOptions'
import CreateNote from './CreateNote'
import Schedule from './Schedule'
import ScheduleSearch from './ScheduleSearch'
import GeneralSchedule from './GeneralSchedule'

const ScheduleStack = createNativeStackNavigator()

const ScheduleStackScreen = ({ navigation }) => {
  return (
    <ScheduleStack.Navigator screenOptions={NavigationOptions()}>
      <ScheduleStack.Screen name="Индивидуальное расписание" component={Schedule} />
      <ScheduleStack.Screen
        name="Поиск по расписанию"
        component={ScheduleSearch}
        options={{ headerShadowVisible: false, title: 'Поиск' }}
      />
      <ScheduleStack.Screen name="Общее расписание" component={GeneralSchedule} />
      <ScheduleStack.Screen name="Новая заметка" component={CreateNote} />
    </ScheduleStack.Navigator>
  )
}

export default ScheduleStackScreen
