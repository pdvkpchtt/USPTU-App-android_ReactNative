import { useEffect } from 'react'
import { useScheduleStore } from '../../entities/schedule'
import List from './ui/List'
import { shallow } from 'zustand/shallow'
import { useColorScheme } from 'react-native'

const ScheduleList = ({ navigation, myFunc }) => {
  const scheme = useColorScheme()

  const { schedule, updateSchedule, refreshing } = useScheduleStore(
    (state) => ({
      schedule: state.schedule,
      updateSchedule: state.updateSchedule,
      refreshing: state.refreshing,
    }),
    shallow
  )

  useEffect(() => {
    updateSchedule()
  }, [scheme])

  return <List navigation={navigation} items={schedule} refreshing={refreshing} myFunc={(val) => myFunc(val)} />
}

export default ScheduleList
