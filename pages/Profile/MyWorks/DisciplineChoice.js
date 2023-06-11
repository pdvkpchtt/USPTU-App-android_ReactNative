import DisciplineChoiceList from '../../../features/DisciplineChoiceList'
import Layout from '../../../shared/ui/Layout'

const DisciplineChoice = ({ navigation }) => {
  return (
    <Layout>
      <DisciplineChoiceList navigation={navigation} />
    </Layout>
  )
}

export default DisciplineChoice
