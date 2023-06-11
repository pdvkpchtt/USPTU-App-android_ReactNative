import { useEffect, useState } from 'react'
import SearchBar from '../../../features/SearchBar'
import WorkList from './../../../features/WorkList/index'
import { useIsFocused } from '@react-navigation/native'
import HeaderButtonWithText from '../../../shared/ui/HeaderButtonWithText'
import Layout from '../../../shared/ui/Layout'
import { View } from 'react-native'

const MyWorks = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerRight: () => (
        <HeaderButtonWithText text="Добавить" onPress={() => navigation.navigate('Добавление работы')} />
      ),
    })
  }, [navigation])

  return (
    <>
      <SearchBar
        placeholder="Название работы, дисциплина и др."
        setSearchText={setFilter}
        search={filter}
        navigation={navigation}
      />
      <Layout>
        <WorkList navigation={navigation} filter={filter} />
      </Layout>
    </>
  )
}
export default MyWorks
