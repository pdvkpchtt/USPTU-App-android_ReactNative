import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import Layout from '../../shared/ui/Layout'
import { LoadingBox } from '../../shared/ui/LoadingBox'
import getTypes from './api/getTypes'
import getDisciplines from './api/getTypes'
import List from './ui/List'
import validateDisciplines from './utils/validateDisciplines'

const TypeChoiceList = ({ navigation }) => {
  const [items, setItems] = useState([])

  const getList = async () => {
    const data = await getTypes()
    setItems(data)
  }

  useEffect(() => {
    getList()
  }, [])

  return items.length ? (
    <List items={items} navigation={navigation} />
  ) : (
    <Layout>
      <LoadingBox />
    </Layout>
  )
}

export default TypeChoiceList
