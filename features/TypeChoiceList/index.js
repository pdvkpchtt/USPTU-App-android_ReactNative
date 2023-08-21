import { useEffect, useState } from 'react'
import { Text, useColorScheme } from 'react-native'
import Layout from '../../shared/ui/Layout'
import { LoadingBox } from '../../shared/ui/LoadingBox'
import getTypes from './api/getTypes'
import getDisciplines from './api/getTypes'
import List from './ui/List'
import validateDisciplines from './utils/validateDisciplines'

const TypeChoiceList = ({ navigation, setChanges = () => {} }) => {
  const [items, setItems] = useState([])
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)

  const getList = async () => {
    const data = await getTypes()
    setItems(data)
  }

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    if (schemeState != scheme) {
      getList()
      setSchemeState(scheme)
    }
  }, [scheme])

  return items.length ? <List items={items} navigation={navigation} setChanges={setChanges} /> : <LoadingBox />
}

export default TypeChoiceList
