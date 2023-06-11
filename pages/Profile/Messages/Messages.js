import { useEffect, useState } from 'react'
import SearchBar from '../../../features/SearchBar'
import SubjectList from '../../../features/SubjectList'
import Layout from '../../../shared/ui/Layout'

const Messages = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])
  return (
    <>
      <SearchBar placeholder="Предметы, преподаватели и др." setSearchText={setFilter} navigation={navigation} />
      <Layout forFlashList>
        <SubjectList target="messages" filter={filter} navigation={navigation} />
      </Layout>
    </>
  )
}

export default Messages
