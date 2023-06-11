import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import SearchBar from '../../../features/SearchBar'
import SubjectList from '../../../features/SubjectList'
import Layout from '../../../shared/ui/Layout'

const InstructionsEducators = ({ navigation }) => {
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
        <SubjectList filter={filter} navigation={navigation} target={'info'} />
      </Layout>
    </>
  )
}

export default InstructionsEducators
