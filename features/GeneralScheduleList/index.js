import { useEffect } from 'react'
import List from './ui/List'
import { shallow } from 'zustand/shallow'
import { useGeneralScheduleStore } from '../../entities/generalSchedule'

const GeneralScheduleList = ({ navigation, filter }) => {
  const { schedule, updateSchedule, refreshing } = useGeneralScheduleStore(
    (state) => ({
      schedule: state.schedule,
      updateSchedule: state.updateSchedule,
      refreshing: state.refreshing,
    }),
    shallow
  )

  useEffect(() => {
    updateSchedule()
  }, [])

  return <List navigation={navigation} items={schedule} refreshing={refreshing} />
}

export default GeneralScheduleList
