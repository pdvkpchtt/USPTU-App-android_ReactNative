import TypeChoiceList from '../../../features/TypeChoiceList'
import Layout from '../../../shared/ui/Layout'

const TypeChoice = ({ navigation, route }) => {
  return (
    <Layout forFlashList>
      <TypeChoiceList navigation={navigation} setChanges={route.params?.setChanges} />
    </Layout>
  )
}

export default TypeChoice
