import { useEffect } from 'react'
import { Text, View } from 'react-native'
import GradeCard from '../../entities/GradeCard'
import RankingGradesList from '../../features/RankingGradesList'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import SubjectCard from './../../entities/SubjectCard/index'

const RankingGrades = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])
  return (
    <Layout>
      <RankingGradesList items={route.params.data} navigation={navigation} />
    </Layout>
  )
}

export default RankingGrades
