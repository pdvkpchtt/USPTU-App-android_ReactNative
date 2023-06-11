const getQualification = (q) => {
  switch (q) {
    case 1:
      return 'магистрант'
    case 2:
      return 'специалист'
    case 3:
      return 'архитектор'
    case 4:
      return 'бакалавр'
    case 5:
      return 'аспирант'
    case 6:
      return 'докторант'
    case 7:
      return 'рабочий'
    case 8:
      return 'специалист среднего звена'
    default:
      return ''
  }
}

export default getQualification
