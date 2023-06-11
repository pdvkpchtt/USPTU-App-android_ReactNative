import apiClient from '../../../shared/apiClient'
import getCurrentWeekNumber from '../../../shared/utils/getCurrentWeekNumber'

export default async function getPrepodSchedule(settings, weekNumber) {
  if (!weekNumber) {
    weekNumber = getCurrentWeekNumber()
  }

  const data = await apiClient.post(
    '',
    `modul=get_rasp_prepod&param={"kadr_id":"${settings['id_prepod']}", "beginweek":${weekNumber}, "endweek":${weekNumber}}`,
    {
      params: {
        obj: 'rasp_out',
      },
    }
  )

  const currentWeek = { weekNumber: weekNumber, week: data.data?.rasp ? data.data.rasp : [] }
  return currentWeek
}
