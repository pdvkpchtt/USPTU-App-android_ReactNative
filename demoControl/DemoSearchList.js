import { useEffect, useState } from 'react'
import getAuditors from '../features/SearchList/api/getAuditors'
import getGroups from '../features/SearchList/api/getGroups'
import getPrepods from '../features/SearchList/api/getPrepods'
import ListSearch from '../features/SearchList/ui/ListSearch'

import { search } from './demoData'

const DemoSearchList = ({ navigation, filter }) => {
  const [searchItems, setSearchItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const loadGroup = async (group) => {
    const res = await getGroups(group)

    return res?.groups ? res.groups : []
  }
  const loadPrepod = async (prepod) => {
    const res = await getPrepods(prepod)

    return res?.prepods ? res?.prepods : []
  }
  const loadAuditors = async (aud) => {
    const res = await getAuditors(aud)

    return res?.auditors ? res?.auditors : []
  }

  const loadData = (currentSearch) => {
    if (currentSearch.length >= 2) {
      //setLoading(true)

      Promise.all([loadGroup(currentSearch), loadPrepod(currentSearch), loadAuditors(currentSearch)]).then(
        (results) => {
          const res = [...results[0], ...results[1], ...results[2]]
          const sortFunc = (obj) => {
            const regex = new RegExp(`^${currentSearch.toLowerCase()}`, 'g')
            const value = obj?.['GRUPPA'] ? obj?.['GRUPPA'] : obj?.['fio'] ? obj?.['fio'] : obj?.['auditor_name']
            return value.toLowerCase().match(regex)?.length || 0
          }

          const items = res.sort((a, b) => sortFunc(b) - sortFunc(a))
          if (items.length === 0) {
            setIsEmpty(true)
          }
          setSearchItems(items.slice(0, 20))
          setLoading(false)
        }
      )
    } else {
      setLoading(false)
      setSearchItems([])
    }
  }

  useEffect(() => {
    setLoading(true)
    setIsEmpty(false)
    setSearchItems([])
    const handler = setTimeout(() => {
      loadData(filter)
    }, 500)

    return () => clearTimeout(handler)
  }, [filter])

  return <ListSearch items={search} isEmpty={isEmpty} refreshing={loading} navigation={navigation} />
}

export default DemoSearchList
