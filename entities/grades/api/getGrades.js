import apiClient from '../../../shared/apiClient'
import capitalize from './../../../shared/utils/capitalize'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import gradesValidator from '../../../shared/utils/gradesValidator'
import groupByWithKeys from '../../../shared/utils/groupByWithKeys'

export default async function getGrades() {
  const gradesData = await apiClient.post('', `w=Usp`, {
    params: {
      obj: 'getsessi',
    },
  })
  const grades = []

  const rankingValidator = (ranking) => {
    switch (ranking) {
      case 'КР':
        return 'Курсовая работа'
      case 'КП':
        return 'Курсовой проект'
      case 'Диф. Зачет':
      case 'Диф.з':
        return 'Дифзачет'
      case 'Зач':
        return 'Зачет'
      case 'Пром.з':
        return 'Промежуточный зачет'
      case 'Прак':
        return 'Практика'
      case 'Экз':
        return 'Экзамен'
      default:
        return ranking
    }
  }
  const groups = []
  let semesters = []
  let i = -1

  for (let discipline of gradesData.data['data']) {
    const disc = {}
    if (discipline['DISC']) {
      disc['id'] = discipline['DISC']
      disc['group'] = discipline['GRUPPA']
      disc['ranking'] = rankingValidator(discipline['PRIZN'])
      disc['discipline_name'] = discipline['NDISC'].replace('( ', '(')
      disc['educator_name'] = discipline['FIO']
      disc['grade'] = capitalize(discipline['OZEN'])
      disc['grade_date'] = discipline['DATAOZEN']
      disc['department'] = discipline['NKAF']
      disc['year'] = discipline['KURS']
      disc['semester'] = discipline['SEMESTR']
      disc.key = uuidv4()
      if (disc.group && !groups.includes(disc.group)) {
        groups.push(disc.group)
        semesters.push(0)
        i++
      }
      if (parseInt(disc['semester']) > semesters[i]) {
        semesters[i] = parseInt(disc['semester'])
      }
      grades.push(disc)
    }
  }

  for (let i = 0; i < grades.length; i++) {
    for (let j = i + 1; j < grades.length - 1; j++) {
      if (
        grades[i]['discipline_name'] === grades[j]['discipline_name'] &&
        grades[i]['semester'] === grades[j]['semester'] &&
        j !== i + 1
      ) {
        const temp = grades[i + 1]
        grades[i + 1] = grades[j]
        grades[j] = temp
      }
    }
  }

  const validatedGrades = []

  for (let i = groups.length - 1; i >= 0; i--) {
    for (let j = semesters[i]; j > 0; j--) {
      const group = groups[i]
      const semester = j
      const disciplines = grades.filter((disc) => disc.semester === semester && disc.group === group)
      if (disciplines.length) {
        validatedGrades.push({
          interval: disciplines[0].year + ' курс, ' + semester + ' семестр',
          group: group,
          data: disciplines,
        })
      }
    }
  }

  return validatedGrades
}
