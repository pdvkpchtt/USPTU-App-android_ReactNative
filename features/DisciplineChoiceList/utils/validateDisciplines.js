import groupBy from '../../../shared/utils/groupBy'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import removeDuplicates from '../../../shared/utils/removeDublicates'

const validateDisciplines = (disciplines, group) => {
  for (let disc of disciplines) {
    disc.key = uuidv4()
  }
  const filteredDisciplines = disciplines.filter((disc) => disc.gruppa === group)
  const chunks = groupBy(removeDuplicates(filteredDisciplines.slice().reverse(), 'value'), 'semestr')
  const validatedDisciplines = []
  for (let chunk of chunks) {
    let section = []
    if (chunk.length < 2) {
      section = [
        { interval: chunk[0].semestr + ' семестр', key: uuidv4() },
        { ...chunk[0], position: 'all' },
      ]
    } else {
      section = [
        { interval: chunk[0].semestr + ' семестр', key: uuidv4() },
        { ...chunk[0], position: 'top' },
        ...chunk.slice(1, -1),
        { ...chunk[chunk.length - 1], position: 'bottom' },
      ]
    }

    validatedDisciplines.push(...section)
  }
  return validatedDisciplines
}

export default validateDisciplines
