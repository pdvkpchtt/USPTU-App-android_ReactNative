import { useEffect, useState } from 'react'
import SearchBar from '../../../features/SearchBar'
import SubjectList from '../../../features/SubjectList'
import Layout from '../../../shared/ui/Layout'

const Files = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])
  return (
    <>
      <SearchBar placeholder="Предметы, преподаватели и др." setSearchText={setFilter} navigation={navigation} />
      <Layout>
        <SubjectList target={'files'} filter={filter} navigation={navigation} />
      </Layout>
    </>
  )
}

export default Files
