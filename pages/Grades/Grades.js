import { useEffect, useState } from 'react'
import GradesList from '../../features/GradesList'
import SearchBar from '../../features/SearchBar'
import Layout from '../../shared/ui/Layout'

const Grades = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])

  return (
    <>
      <SearchBar placeholder="Название дисциплины и др." setSearchText={setFilter} navigation={navigation} />
      <Layout>
        <GradesList navigation={navigation} filter={filter} />
      </Layout>
    </>
  )
}

export default Grades
