import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import getScheduleByWeek from '../api/getScheduleByWeek'
import { weekValidator } from '../utils/weekValidator'
import moment from 'moment/moment'
import 'moment/locale/ru'
import convertDateToWeek from './../../../shared/utils/convertDateToWeek'
moment.locale('ru')
moment.weekdays(true)

const filterDays = (items, date) => {
  let splitIndex = 0
  for (let i = 0; i <= items.length; i++) {
    if (items[i]?.fullDate && moment(items[i].fullDate, 'DD.MM.YYYY').isSameOrAfter(date, 'day')) {
      splitIndex = i
      break
    }
  }

  return items.slice(splitIndex, items.length)
}

const useStore = create(
  persist(
    (set, get) => ({
      schedule: [],
      refreshing: true,
      weekNumber: 0,
      nextWeekNumber: 0,
      prevWeekNumber: 0,
      showingWeekNumber: 0,
      setShowingWeekNumber: (weekNumber) => {
        set({ showingWeekNumber: weekNumber })
      },
      updateSchedule: async () => {
        set({ refreshing: true })
        const { week, weekNumber } = await getScheduleByWeek()
        // console.log('updateSchedule', weekValidator(week))
        set({
          schedule: filterDays(weekValidator(week, weekNumber), moment()),
          refreshing: false,
          weekNumber: weekNumber,
          nextWeekNumber: weekNumber + 1,
          prevWeekNumber: weekNumber - 1,
        })
      },
      loadNextWeek: async () => {
        set({ refreshing: true })
        const { week, weekNumber } = await getScheduleByWeek(get().nextWeekNumber)
        // console.log('Loading next week', weekValidator(week))
        set({
          schedule: [...get().schedule, ...weekValidator(week, weekNumber)],
          refreshing: false,
          weekNumber: weekNumber,
          nextWeekNumber: weekNumber + 1,
          prevWeekNumber: weekNumber - 1,
        })
      },
      loadWeekFromCalendar: async (date) => {
        set({ refreshing: true })
        set({ schedule: [] })
        const neededWeek = convertDateToWeek(date)
        const { week, weekNumber } = await getScheduleByWeek(neededWeek)
        // console.log('loadWeekFromCalendar', weekValidator(week))
        set({
          schedule: filterDays(weekValidator(week, weekNumber), moment(date)),
          refreshing: false,
          weekNumber: weekNumber,
          nextWeekNumber: weekNumber + 1,
          prevWeekNumber: weekNumber - 1,
        })
      },
    }),
    {
      name: 'schedule',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useStore
