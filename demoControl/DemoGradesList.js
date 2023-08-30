import { useEffect, useState } from 'react'
import { Text, useColorScheme } from 'react-native'
import SemesterList from '../features/GradesList/ui/SemesterList'

import { grades, filteredgrades } from './demoData'

const DemoGradesList = ({ navigation, filter }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)

  return <SemesterList items={grades} navigation={navigation} />

  /* <List items={grades} navigation={navigation} refreshing={refreshing} /> */
}

export default DemoGradesList
