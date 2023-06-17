import { useEffect } from 'react'
import { Alert, TextInput, View } from 'react-native'
import WorkFiles from '../../../entities/WorkFiles'
import WorkInfoCard from '../../../entities/WorkInfoCard'
import WorkManageForm from '../../../features/WorkManageForm'
import DefaultButton from '../../../shared/ui/defaultButton'
import Layout from '../../../shared/ui/Layout'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import SecondaryButton from '../../../shared/ui/secondaryButton'

const WorkInfo = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.work_name,
    })
  }, [navigation])
  // console.log(route.params)
  return (
    <Layout>
      <WorkInfoCard item={route.params} />
      <View style={{ marginVertical: 16, flexGrow: 1 }}>
        <WorkFiles id={route.params.id} />
      </View>
      {route.params.status_of_work === 'Черновик' ? (
        <WorkManageForm id={route.params.id} navigation={navigation} />
      ) : null}
    </Layout>
  )
}

export default WorkInfo
