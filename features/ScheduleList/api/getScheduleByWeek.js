import apiClient from '../../../shared/apiClient'
import getCurrentWeekNumber from '../../../shared/utils/getCurrentWeekNumber'

export default async function getScheduleByWeek(weekNumber = null) {
  if (!weekNumber) {
    weekNumber = getCurrentWeekNumber()
  }

  const scheduleData = await apiClient.post('', `format=json&cat=s&uchweek_b=${weekNumber}&uchweek_e=${weekNumber}`, {
    params: {
      obj: 'GetRasp',
    },
  })

  const week = scheduleData.data
  const currentWeek = { weekNumber: weekNumber, week: week }

  return currentWeek
}
