const rankingValidator = (ranking) => {
  switch (ranking) {
    case 'КР':
      return 'Курсовая работа'
    case 'КП':
      return 'Курсовой проект'
    case 'Диф. Зачет':
      return 'Дифзачет'
    case 'Диф.З':
      return 'Дифзачет'
    default:
      return ranking
  }
}

export default rankingValidator
