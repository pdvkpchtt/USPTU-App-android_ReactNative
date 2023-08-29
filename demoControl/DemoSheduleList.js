import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { useScheduleStore } from '../entities/schedule'

import { schedule } from './demoData'
import List from './Schedule/List'

const DemoSheduleList = ({ navigation, filter }) => {
  const { updateSchedule, refreshing } = useScheduleStore(
    (state) => ({
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

export default DemoSheduleList
