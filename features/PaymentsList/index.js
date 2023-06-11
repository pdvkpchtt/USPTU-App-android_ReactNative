import { View } from 'react-native'
import List from './ui/List'

const PaymentsList = ({ items, navigation }) => {
  return <List items={items} navigation={navigation}></List>
}

export default PaymentsList
