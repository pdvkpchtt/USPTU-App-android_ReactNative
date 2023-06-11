import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import CurriculumSemestrList from '../../../features/CurriculumSemestrList'
import SearchBar from '../../../features/SearchBar'
import Layout from '../../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightTitle from '../../../shared/ui/ListItemWithRightTitle'

const CurriculumDiscipline = ({ item, navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      title: route.params.name,
    })
  }, [navigation])

  return <CurriculumSemestrList navigation={navigation} route={route} />
}

export default CurriculumDiscipline
