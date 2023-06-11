import { useState } from 'react'
import CurriculumList from '../../../features/CurriculumList'
import List from '../../../features/WorkList/ui/List'
import Layout from '../../../shared/ui/Layout'

const Curriculum = ({ navigation }) => {
  const [filter, setFilter] = useState('')
  return (
    <Layout>
      <CurriculumList navigation={navigation} filter={filter} />
    </Layout>
  )
}

export default Curriculum
