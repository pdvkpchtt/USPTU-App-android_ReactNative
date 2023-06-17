import DisciplineChoiceList from '../../../features/DisciplineChoiceList'
import Layout from '../../../shared/ui/Layout'

const DisciplineChoice = ({ navigation }) => {
  return (
    <Layout forFlashList>
      <DisciplineChoiceList navigation={navigation} />
    </Layout>
  )
}

export default DisciplineChoice
