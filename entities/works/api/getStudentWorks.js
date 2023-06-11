import CONSTANTS from '../../../config'
import moment from 'moment'
import apiClient from '../../../shared/apiClient'

export default async function getStudentWorks(group) {
  const data = await apiClient.post(CONSTANTS.API_URL, 'd=ld&sem=0', {
    params: {
      obj: 'StudWork',
    },
  })
  const studentWorks = []
  let semester = 0

  const groups = []
  for (let work of data.data) {
    const itemWork = {}
    itemWork.type_of_work = work['NVID']
    itemWork.discipline_name = work['NDISC']
    itemWork.status_of_work = work['NSTATUS']
    itemWork.group = work['GRUPPA']
    itemWork.semester = parseInt(work['SEMESTR'])
    itemWork.work_name = work['NAIM_WORK']
    itemWork.additional_information = work['DOP_INFO'] || null
    itemWork.grade = work['OZEN'] || null
    itemWork.comment = work['OZEN_COMMENT'] || null
    itemWork.id = work['ID']
    itemWork.dataUpload = work['DATAZAP'] || null
    itemWork.dataCheck = work['OZEN_DATA'] || null
    itemWork.review = work['WORK_REVIEW'] || null
    studentWorks.push(itemWork)
    if (parseInt(work['SEMESTR']) > semester) {
      semester = parseInt(work['SEMESTR'])
    }
    if (itemWork.group && !groups.includes(itemWork.group)) {
      groups.push(itemWork.group)
    }
  }

  const validatedStudentWorks = []

  for (let i = semester; i > 0; i--) {
    const semester = i
    const works = studentWorks
      .filter((work) => work.semester === i && work.group === group)
      .sort((a, b) => {
        return moment(b?.dataUpload, 'DD.MM.YYYY HH:mm:ss').isAfter(moment(a?.dataUpload, 'DD.MM.YYYY HH:mm:ss'))
      })
    if (works.length) {
      validatedStudentWorks.push({
        interval: Math.ceil(semester / 2) + ' курс, ' + semester + ' семестр',
        group: group,
        data: works,
      })
    }
  }

  return validatedStudentWorks
}
