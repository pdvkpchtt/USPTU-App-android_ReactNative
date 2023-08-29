import { useEffect, useState } from 'react'
import DemoGradesList from '../../demoControl/DemoGradesList'
import useDemoStore from '../../demoControl/store'
import SearchBar from '../../features/SearchBar'
import Layout from '../../shared/ui/Layout'

const DemoGrades = ({ navigation }) => {
  const { demo } = useDemoStore((state) => ({
    demo: state.demo,
  }))

  const [filter, setFilter] = useState('')
  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
    })
  }, [navigation])

  // фзц (чтобы найти потом)
  return (
    <>
      <Layout forFlashList>
        <DemoGradesList navigation={navigation} filter={filter} />
      </Layout>
    </>
  )
}

export default DemoGrades
