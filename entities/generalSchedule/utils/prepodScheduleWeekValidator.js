import moment from 'moment/moment'
import 'moment/locale/ru'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import getStartDay from '../../../shared/utils/getStartDay'

moment.locale('ru')
moment.weekdays(true)

export const prepodScheduleWeekValidator = (week, weekNumber) => {
  const preparedDays = []
  const days = []
  let dayStart = getStartDay()
  dayStart.add(weekNumber - 1, 'weeks')

  ////console.log('week', week)

  for (let i = 0; i < 7; i++) {
    days[i] = {}
    days[i].date = dayStart.format('dddd, D MMMM')
    days[i].lessons = []
    days[i].weekNumber = weekNumber
    days[i].fullDate = dayStart.format('DD.MM.YYYY')
    dayStart.add(1, 'days')
  }

  if (week == null || !Array.isArray(week)) {
    week = []
  }

  for (let i of week) {
    const lesson = {}
    lesson.key = uuidv4()
    switch (i['NVIDZANAT']) {
      case 'лекция':
        lesson.type = 'лекция'
        i['NDISC'] = i['NDISC'].split('(Л)')[0]
        break
      case 'практическое занятие':
        lesson.type = 'практика'
        i['NDISC'] = i['NDISC'].split('(П)')[0]
        break
      case 'лаб.работа':
        lesson.type = 'лабораторная'
        i['NDISC'] = i['NDISC'].split('(лаб)')[0]
        break
      case 'экзамен':
        lesson.type = 'экзамен'
        i['NDISC'] = i['NDISC'].split('(Э)')[0]
        break
      case 'зачет':
        lesson.type = 'зачет'
        break
      case 'консультация перед экзаменом':
        lesson.type = 'консультация'
        i['NDISC'] = i['NDISC'].split('(К)')[0]
        break
      default:
        lesson.type = 'прочее'
    }

    lesson.start_time = i['START_TIME'].slice(0, -3)
    lesson.end_time = i['END_TIME'].slice(0, -3)
    lesson.auditorium = i['AUD'] === '-' ? null : i['AUD']
    //lesson.teacher_name = i['TEACHER_NAME'] === '  ' ? null : i['TEACHER_NAME'] - надо ли?
    lesson.discipline_name = i['NDISC']
    lesson.paraclockid = i['PARA']
    lesson['DISC'] = i['DISC']
    if (i['PARA'] === 8) {
      lesson.paraclockid = 6
    }
    if (i['PARA'] === 9) {
      lesson.paraclockid = 7
    }
    lesson.ddate = days[parseInt(i['DAYWEEK']) - 1].fullDate
    lesson.gruppaForTeacher = i['GRUPPA'].slice(0, -3).replace(/\*/g, '-').replace(/;/g, ' \u00B7 ')
    if (lesson.gruppaForTeacher[lesson.gruppaForTeacher.length - 1] === '-') {
      lesson.gruppaForTeacher = lesson.gruppaForTeacher.slice(0, -1)
    }
    days[parseInt(i['DAYWEEK']) - 1].lessons.push(lesson)
  }

  for (let day of days) {
    if (day.lessons.length) {
      const lessons = []
      const filteredDayLessons = day.lessons.sort((a, b) => b.paraclockid - a.paraclockid)
      const lastLessonNumber = filteredDayLessons[0].paraclockid

      for (let i = 1; i <= lastLessonNumber; i++) {
        const filteredLessons = day.lessons.filter((lesson) => lesson.paraclockid === i)
        if (filteredLessons.length) {
          lessons.push({
            lessons: filteredLessons,
            key: uuidv4(),
          })
        }
      }
      day.lessons = lessons
    }
  }

  for (let day of days) {
    if (day.lessons.length > 1) {
      for (let i = 1; i < day.lessons.length; i++) {
        day.lessons[i].lessons.forEach((lesson) => (lesson.prevTime = day.lessons[i - 1].lessons[0].end_time))
      }
    }
  }

  days.map((day) => {
    preparedDays.push({
      shownDate: String(day.date),
      fullDate: day.fullDate,
      weekNumber: day.weekNumber,
      key: uuidv4(),
    })
    let lessons = [{ key: uuidv4(), lessons: [] }]
    if (day.lessons.length) {
      lessons = day.lessons
    }
    preparedDays.push(...lessons)
  })

  return preparedDays
}
