const getFilialName = (filial) => {
  switch (filial) {
    case '1':
      return 'Уфа'
    case '2':
      return 'Октябрьский'
    case '3':
      return 'Салават'
    case '4':
      return 'Стерлитамак'
    default:
      return 'Уфа'
  }
}

export default getFilialName
