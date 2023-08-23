export default function getYearAndSemesterFromStudyGroup(studyGroup) {
  const year = studyGroup.split('-')[1]
  const date = new Date()
  const currentYear = date.getFullYear().toString().slice(2)
  const currentMonth = date.getMonth()
  let course = parseInt(currentYear) - parseInt(year)
  if (currentMonth >= 7) {
    course++
  }
  let semester = course * 2
  if (currentMonth >= 7) {
    semester--
  }

  if (course > 4) {
    course = '4'
    semester = '8'
  }

  return {
    year: course.toString(),
    semester: semester.toString(),
  }
}
