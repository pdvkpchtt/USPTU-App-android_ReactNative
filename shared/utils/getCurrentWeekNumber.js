import moment from 'moment/moment'

export default function getCurrentWeekNumber() {
  let currentYear = moment().format('YYYY')

  const beginDate = moment('01.01.' + currentYear, 'DD.MM.YYYY')
  const firstWeekStartDate = moment('01.09.' + currentYear, 'DD.MM.YYYY').isoWeekday(1)

  if (moment().isBetween(beginDate, firstWeekStartDate, '[)')) {
    currentYear--
  }

  const startDay = moment('01.09.' + currentYear, 'DD.MM.YYYY').isoWeekday(1)

  return Math.ceil(moment.duration(moment().diff(startDay)).asWeeks())
}
