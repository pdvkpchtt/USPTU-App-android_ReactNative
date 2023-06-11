import apiClient from '../../../shared/apiClient'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export default async function getCurriculumList() {
  const planData = await apiClient.post('', `w=Upl`, {
    params: {
      obj: 'getsessi',
    },
  })
  const plan = []

  const rankingValidator = (ranking) => {
    switch (ranking) {
      case 'КР':
        return 'Курсовая работа'
      case 'КП':
        return 'Курсовой проект'
      case 'Зач':
        return 'Зачет'
      case 'Диф.з':
        return 'Дифзачет'
      case 'Прак':
        return 'Практика'
      case 'Пром.з':
        return 'Промежуточный зачет'
      case 'Экз':
        return 'Экзамен'
      default:
        return ranking
    }
  }
  const groups = []
  let semesters = []
  let i = -1

  for (let discipline of planData.data['data']) {
    const disc = {}
    if (discipline['NDISC']) {
      disc['group'] = discipline['GRUPPA'] || ''
      disc['ranking'] = rankingValidator(discipline['PRIZN']) || ''
      disc['discipline_name'] = discipline['NDISC'].replace('( ', '(')
      disc['department'] = discipline['NKAF'].replace('Кафедра', '').trim() || ''
      disc['year'] = discipline['KURS'] || ''
      disc['semester'] = discipline['SEMESTR'] || ''
      disc['hours'] = discipline['CH'] || ''
      disc['aud_hours'] = discipline['CHA'] || ''
      disc['credits'] = discipline['SZE'] || ''
      disc.key = uuidv4()
      if (disc.group && !groups.includes(disc.group)) {
        groups.push(disc.group)
        semesters.push(0)
        i++
      }
      if (parseInt(disc['semester']) > semesters[i]) {
        semesters[i] = parseInt(disc['semester'])
      }
      plan.push(disc)
    }
  }
  // const validatedPlan = planValidator(plan, groups, semesters)
  // const academicPlan = {
  //   plan: validatedPlan,
  //   groups,
  // }

  for (let i = 0; i < plan.length; i++) {
    for (let j = i + 1; j < plan.length - 1; j++) {
      if (
        plan[i]['discipline_name'] === plan[j]['discipline_name'] &&
        plan[i]['semester'] === plan[j]['semester'] &&
        j !== i + 1
      ) {
        const temp = plan[i + 1]
        plan[i + 1] = plan[j]
        plan[j] = temp
      }
    }
  }

  const validatedGroupsWithPlan = {}

  for (let i = groups.length - 1; i >= 0; i--) {
    const validatedSemesters = []
    for (let j = semesters[i]; j > 0; j--) {
      const group = groups[i]
      const semester = j
      const disciplines = plan.filter((disc) => disc.semester === semester && disc.group === group)
      if (disciplines.length) {
        validatedSemesters.push({
          interval: disciplines[0].year + ' курс, ' + semester + ' семестр',
          data: disciplines,
        })
      }
    }
    validatedGroupsWithPlan[`${groups[i]}`] = validatedSemesters
  }

  return { plan: validatedGroupsWithPlan, groups }
}
