const filterPlan = (data, filter) => {
  const res = []

  for (let item of data) {
    const temp = []

    const values = Object.values(item).map((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase()
      } else {
        return value
      }
    })
    for (let value of values) {
      if (typeof value === 'string' && value.includes(filter.toLowerCase())) {
        temp.push(item)
        break
      }
    }
    if (temp.length) {
      res.push(...temp)
    }
  }

  return res
}

export default filterPlan
