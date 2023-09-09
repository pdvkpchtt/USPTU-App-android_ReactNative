import { useEffect } from 'react'
import List from './ui/List'
import { shallow } from 'zustand/shallow'
import { useGeneralScheduleStore } from '../../entities/generalSchedule'
import { useColorScheme } from 'react-native'

const GeneralScheduleList = ({ navigation, myFunc }) => {
  const { schedule, updateSchedule, refreshing } = useGeneralScheduleStore(
    (state) => ({
      schedule: state.schedule,
      updateSchedule: state.updateSchedule,
      refreshing: state.refreshing,
    }),
    shallow
  )
  const scheme = useColorScheme()

  useEffect(() => {
    updateSchedule()
  }, [scheme])

  return <List navigation={navigation} items={schedule} refreshing={refreshing} myFunc={(val) => myFunc(val)} />
}

export default GeneralScheduleList
