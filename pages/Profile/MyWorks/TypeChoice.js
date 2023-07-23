import TypeChoiceList from '../../../features/TypeChoiceList'
import Layout from '../../../shared/ui/Layout'

const TypeChoice = ({ navigation }) => {
  return (
    <Layout forFlashList>
      <TypeChoiceList navigation={navigation} />
    </Layout>
  )
}

export default TypeChoice
