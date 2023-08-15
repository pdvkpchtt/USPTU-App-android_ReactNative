import apiClient from '../../../shared/apiClient'
import getCurrentWeekNumber from '../../../shared/utils/getCurrentWeekNumber'
import getNow from '../../schedule/api/getNow'

export default async function getAuditorSchedule(settings, weekNumber) {
  if (!weekNumber) {
    weekNumber = await getNow()
  }

  if (weekNumber < 0) {
    weekNumber = 1
  }

  const data = await apiClient.post(
    '',
    `modul=get_auditor_rasp&param={"auditor_id":"${settings['auditor_id']}", "beginweek":${weekNumber}, "endweek":${weekNumber}}`,
    {
      params: {
        obj: 'rasp_out',
      },
    }
  )
  const currentWeek = { weekNumber: weekNumber, week: data.data?.auditor_rasp ? data.data.auditor_rasp : [] }
  return currentWeek
}
