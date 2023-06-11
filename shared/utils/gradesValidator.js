export default function gradesValidator(grades, groups, semesters) {
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
