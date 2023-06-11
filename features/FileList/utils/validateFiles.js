import groupBy from '../../../shared/utils/groupBy'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const validateFiles = (files) => {
  for (let file of files) {
    const date = moment(file.dt, 'DD.MM.YYYY HH:mm:ss')
    if (date.format('YYYY') === moment().format('YYYY')) {
      file.dt = date.format('D MMMM, HH:mm')
    } else {
      file.dt = date.format('D MMMM YYYY, HH:mm')
    }
    file.key = uuidv4()
  }
  const chunks = groupBy(files, 'dt')
  const validatedFiles = []
  for (let chunk of chunks) {
    let section = []
    if (chunk.length < 2) {
      section = [{ interval: chunk[0].dt }, { ...chunk[0], position: 'all' }]
    } else {
      section = [
        { interval: chunk[0].dt },
        { ...chunk[0], position: 'top' },
        ...chunk.slice(1, -1),
        { ...chunk[chunk.length - 1], position: 'bottom' },
      ]
    }

    validatedFiles.push(...section)
  }
  return validatedFiles
}

export default validateFiles
