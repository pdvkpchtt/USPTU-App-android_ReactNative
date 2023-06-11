import moment from 'moment/moment'

export default function convertDateToWeek(date) {
  let year = moment(date).format('YYYY')
  let prevYear = year - 1

  let startDay1 = moment('01.09.' + year, 'DD.MM.YYYY').isoWeekday(1)
  let startDay2 = moment('01.09.' + prevYear, 'DD.MM.YYYY').isoWeekday(1)

  let one = Math.ceil(moment.duration(moment(date).diff(startDay1)).asWeeks())
  let two = Math.ceil(moment.duration(moment(date).diff(startDay2)).asWeeks())

  let final

  if (one < 0) final = two
  else if (two >= 52) final = one
  else final = one

  return final

  // let currentYear = moment().format('YYYY')
  // const beginDate = moment('01.01.' + currentYear, 'DD.MM.YYYY')
  // const endDate = moment('31.08.' + currentYear, 'DD.MM.YYYY')
  // if (moment().isBetween(beginDate, endDate, '[]')) {
  //   currentYear--
  // }
  // const startDay = moment('01.09.' + currentYear, 'DD.MM.YYYY').isoWeekday(1)
  // return Math.ceil(moment.duration(moment(date).diff(startDay)).asWeeks())
}
