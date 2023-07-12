import { useEffect } from 'react'
import FileList from '../../../features/FileList'
import Layout from '../../../shared/ui/Layout'

const FileDiscipline = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.name.split(' ')[0]} ${route.params.name.split(' ')[1][0]}. ${
        route.params.name.split(' ')[2][0]
      }.`,
    })
  }, [navigation])

  return (
    <Layout forFlashList>
      <FileList navigation={navigation} route={route} />
    </Layout>
  )
}
export default FileDiscipline
