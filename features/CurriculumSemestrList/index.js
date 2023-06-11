import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightTitle from '../../shared/ui/ListItemWithRightTitle'
import SearchBar from '../SearchBar'
import List from './ui/List'
import filterPlan from './utils/filterPlan'

const CurriculumSemestrList = ({ navigation, route }) => {
  const [filter, setFilter] = useState('')
  const [filteredItems, setFilteredItems] = useState(route.params.data)

  useEffect(() => {
    setFilteredItems(filterPlan(route.params.data, filter))
  }, [filter])

  return (
    <>
      <SearchBar placeholder="Предметы, кафедры и др." setSearchText={setFilter} navigation={navigation} />
      <Layout forFlashist>
        <List
          filter={filter}
          navigation={navigation}
          items={filteredItems}
          refreshing={() => setFilteredItems(filterPlan(route.params.data, filter))}
        ></List>
      </Layout>
    </>
  )
}

export default CurriculumSemestrList
