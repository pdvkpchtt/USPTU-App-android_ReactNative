import moment from 'moment/moment'

export default function convertDateToWeek(date) {
  let year = moment(date).format('YYYY')
  let prevYear = year - 1

  let startDay1 = moment('04.09.2023', 'DD.MM.YYYY')
  //let startDay2 = moment('04.09.' + prevYear, 'DD.MM.YYYY')

  let one = Math.ceil(moment.duration(moment(date).diff(startDay1)).asWeeks())
  //let two = Math.ceil(moment.duration(moment(date).diff(startDay2)).asWeeks())

  //let final

  return one
}
