import groupBy from '../../../shared/utils/groupBy'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const validateMessages = (messages) => {
  for (let message of messages) {
    const date = moment(message.createdAt, 'DD.MM.YYYY HH:mm:ss')
    message.key = uuidv4()
    if (date.format('YYYY') === moment().format('YYYY')) {
      message.createdAtDay = date.format('D MMMM')
      message.createdAt = date.format('HH:mm')
    } else {
      message.createdAtDay = date.format('D MMMM YYYY')
      message.createdAt = date.format('HH:mm')
    }
    if (message.fromId[0] === 's') {
      message.role = 'student'
    } else {
      message.role = 'educator'
    }
  }
  const chunks = groupBy(messages, 'createdAtDay')
  const validatedMessages = []
  for (let chunk of chunks) {
    const section = [{ interval: chunk[0].createdAtDay }, ...chunk]
    validatedMessages.push(...section)
  }
  return validatedMessages
}

export default validateMessages
