const filterDisciplines = (data, filter) => {
  const res = []

  for (let item of data) {
    const temp = []
    for (let work of item.data) {
      const values = Object.values(work).map((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase()
        } else {
          return value
        }
      })
      for (let value of values) {
        if (typeof value === 'string' && value.includes(filter.toLowerCase())) {
          temp.push(work)
          break
        }
      }
    }
    if (temp.length) {
      res.push({
        type: 'header',
        interval: item.interval,
      })
      res.push(...temp)
    }
  }

  return res
}

export default filterDisciplines
