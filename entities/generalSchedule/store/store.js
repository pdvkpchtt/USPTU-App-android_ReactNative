import { create } from 'zustand'
import { groupScheduleWeekValidator, weekValidator } from '../utils/groupScheduleWeekValidator'
import moment from 'moment/moment'
import 'moment/locale/ru'
import convertDateToWeek from '../../../shared/utils/convertDateToWeek'
import { prepodScheduleWeekValidator } from './../utils/prepodScheduleWeekValidator'
import { auditorScheduleWeekValidator } from './../utils/auditorScheduleWeekValidator'
import getGroupSchedule from '../api/getGroupSchedule'
import getPrepodSchedule from '../api/getPrepodSchedule'
import getAuditorSchedule from '../api/getAuditorSchedule'
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

const scheduleChooser = (scheduleSettings) => {
  if ('GRUPPA' in scheduleSettings) {
    return [getGroupSchedule, groupScheduleWeekValidator]
  }
  if ('id_prepod' in scheduleSettings) {
    return [getPrepodSchedule, prepodScheduleWeekValidator]
  }
  if ('auditor_id' in scheduleSettings) {
    return [getAuditorSchedule, auditorScheduleWeekValidator]
  }
}

const useStore = create((set, get) => ({
  schedule: [],
  refreshing: true,
  weekNumber: 0,
  nextWeekNumber: 0,
  prevWeekNumber: 0,
  settings: {},
  showingWeekNumber: 0,
  setShowingWeekNumber: (weekNumber) => {
    set({ showingWeekNumber: weekNumber })
  },
  setSettings: (scheduleSettings) => {
    set({ settings: scheduleSettings, schedule: [] })
  },
  updateSchedule: async () => {
    set({ refreshing: true })
    // //console.log('updateSchedule')
    const [getSchedule, weekValidator] = scheduleChooser(get().settings)
    const { week, weekNumber } = await getSchedule(get().settings)

    ////console.log('updateSchedule', JSON.stringify(weekValidator(week, weekNumber)))
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
    const [getSchedule, weekValidator] = scheduleChooser(get().settings)
    const { week, weekNumber } = await getSchedule(get().settings, get().nextWeekNumber)
    // //console.log('Loading next week', weekValidator(week, weekNumber))
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
    // //console.log('neededWeek', neededWeek)
    const [getSchedule, weekValidator] = scheduleChooser(get().settings)
    const { week, weekNumber } = await getSchedule(get().settings, neededWeek)
    ////console.log('loadWeekFromCalendar', weekValidator(week, weekNumber))
    set({
      schedule: filterDays(weekValidator(week, weekNumber), moment(date)),
      refreshing: false,
      weekNumber: weekNumber,
      nextWeekNumber: weekNumber + 1,
      prevWeekNumber: weekNumber - 1,
    })
  },
}))

export default useStore
