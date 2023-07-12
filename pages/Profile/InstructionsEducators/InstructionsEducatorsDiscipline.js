import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import DisciplinesInfoCard from '../../../entities/DisciplinesInfoCard'
import Layout from '../../../shared/ui/Layout'

const InstructionsEducatorsDiscipline = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])
  return (
    <Layout>
      <DisciplinesInfoCard info={route.params} navigation={navigation} />
    </Layout>
  )
}

export default InstructionsEducatorsDiscipline
