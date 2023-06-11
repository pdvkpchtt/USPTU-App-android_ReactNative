import groupByWithKeys from '../../../shared/utils/groupByWithKeys'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const filterGrades = (data, filter, group) => {
  const res = []

  const filteredDataOnGroup = data.filter((item) => item.group === group)
  const filteredDataBySemesters = []

  for (let item of filteredDataOnGroup) {
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
      const list = groupByWithKeys(temp, 'ranking')
      const rankings = Object.keys(list).sort()
      filteredDataBySemesters.push({
        type: 'header',
        interval: item.interval,
        key: uuidv4(),
      })
      for (let [index, ranking] of rankings.entries()) {
        filteredDataBySemesters.push({
          key: uuidv4(),
          ranking: ranking,
          data: list[ranking],
          length: list[ranking].length,
          position:
            rankings.length === 1 ? 'all' : index === 0 ? 'top' : index === rankings.length - 1 ? 'bottom' : 'middle',
        })
      }
    }
  }

  return { rawData: res, filteredDataBySemesters }
}

export default filterGrades
