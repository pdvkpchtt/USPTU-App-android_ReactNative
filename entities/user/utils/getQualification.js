const getQualification = (q) => {
  switch (q) {
    case 1:
      return 'Магистрант'
    case 2:
      return 'Специалист'
    case 3:
      return 'Архитектор'
    case 4:
      return 'Бакалавр'
    case 5:
      return 'Аспирант'
    case 6:
      return 'Докторант'
    case 7:
      return 'Рабочий'
    case 8:
      return 'Специалист среднего звена'
    default:
      return ''
  }
}

export default getQualification
