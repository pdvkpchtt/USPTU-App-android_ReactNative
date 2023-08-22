import { useEffect } from 'react'
import { Text } from 'react-native'
import PaymentsList from '../../../features/PaymentsList'
import Layout from '../../../shared/ui/Layout'

const ActivePayments = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    })
  }, [navigation])
  ////console.log(route.params.items)
  return (
    <Layout>
      <PaymentsList items={route.params.items} navigation={navigation}></PaymentsList>
    </Layout>
  )
}

export default ActivePayments
