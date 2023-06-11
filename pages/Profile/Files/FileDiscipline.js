import { useEffect } from 'react'
import FileList from '../../../features/FileList'
import Layout from '../../../shared/ui/Layout'

const FileDiscipline = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])

  return (
    <Layout>
      <FileList navigation={navigation} route={route} />
    </Layout>
  )
}
export default FileDiscipline
