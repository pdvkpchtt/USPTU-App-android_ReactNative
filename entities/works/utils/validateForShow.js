const validateForShow = (data) => {
  const res = []

  for (let item of data) {
    res.push({
      type: 'header',
      interval: item.interval,
    })
    res.push(...item.data)
  }

  return res
}

export default validateForShow
