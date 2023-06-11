const getLevelOfEducation = (level) => {
  switch (level) {
    case 1:
      return 'Общеобразовательное'
    case 2:
      return 'Начальное профессиональное'
    case 3:
      return 'Высшее профессиональное'
    case 4:
      return 'Послевузовское профессиональное'
    case 5:
      return 'Дополнительное профессиональное'
    case 6:
      return 'Профессиональная подготовка'
    case 7:
      return 'Профессиональная переподготовка'
    case 8:
      return 'Повышение квалификации'
    case 9:
      return 'Среднее профессиональное'
    case 10:
      return 'Среднее общее'
    case 11:
      return 'Основное общее'
    case 12:
      return 'Дополнительная общеразвивающая программа'
    case 13:
      return 'Профессиональное обучение'
    default:
      return ''
  }
}

export default getLevelOfEducation
