import { Text } from 'react-native'
import PaymentsHostelList from '../../../features/PaymentsHostel'
import Layout from '../../../shared/ui/Layout'

const PaymentsHostel = ({ navigation, route }) => {
  return (
    <Layout>
      <PaymentsHostelList items={route.params.bills} navigation={navigation} />
      {/* <Text>{JSON.stringify(route.params.bills)}</Text> */}
    </Layout>
  )
}

export default PaymentsHostel
