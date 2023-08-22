import { useEffect, useState } from 'react'
import List from './ui/List'
import { useIsFocused } from '@react-navigation/native'
import { useGradesStore } from '../../entities/grades'
import { useUserStore } from '../../entities/user'
import { Text, useColorScheme } from 'react-native'
import Layout from './../../shared/ui/Layout'
import SemesterList from './ui/SemesterList'

const GradesList = ({ navigation, filter }) => {
  const { getStudyGroup, dataIdSelected } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
    dataIdSelected: state.dataIdSelected,
  }))
  const { grades, getGrades, filterGrades, refreshing, gradesBySemesters, filtering } = useGradesStore((state) => ({
    grades: state.gradesForShow,
    getGrades: state.getGrades,
    filterGrades: state.filterGrades,
    refreshing: state.refreshing,
    gradesBySemesters: state.gradesBySemesters,
    filtering: state.filtering,
  }))

  const focused = useIsFocused()

  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)

  useEffect(() => {
    getGrades(filter, getStudyGroup())
    filterGrades(filter, getStudyGroup())

    if (schemeState != scheme) {
      getGrades(filter, getStudyGroup())
      filterGrades(filter, getStudyGroup())
      ////console.log('s')
    }
  }, [dataIdSelected, filter, schemeState, scheme])

  return filter.length ? (
    <List items={grades} navigation={navigation} refreshing={refreshing} filtering={filtering} />
  ) : (
    <SemesterList items={gradesBySemesters} navigation={navigation} refreshing={refreshing} filtering={filtering} />
  )
  /* <List items={grades} navigation={navigation} refreshing={refreshing} /> */
}

export default GradesList
