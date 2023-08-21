import DisciplineChoiceList from '../../../features/DisciplineChoiceList'
import Layout from '../../../shared/ui/Layout'

const DisciplineChoice = ({ navigation, route }) => {
  return (
    <Layout forFlashList>
      <DisciplineChoiceList navigation={navigation} setChanges={route.params?.setChanges} />
    </Layout>
  )
}

export default DisciplineChoice
