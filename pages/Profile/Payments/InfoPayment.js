import { Text, View } from 'react-native'
import Layout from '../../../shared/ui/Layout'
import ListBoxWithBottomWith6Item from '../../../shared/ui/ListBoxWithBottomWith6Item'

const InfoPayment = ({ navigation, route }) => {
  return (
    <Layout>
      <ListBoxWithBottomWith6Item
        title1={route.params.item.amount + ' ₽'}
        bottomTitle1={route.params.item.name}
        title2={route.params.item.type}
        bottomTitle2="Вид выплаты"
        title3={route.params.item.start_date}
        bottomTitle3="Дата начала"
        title4={route.params.item.end_date}
        bottomTitle4="Дата конца"
        title5={route.params.item.order_number}
        bottomTitle5="Номер приказа"
        title6={route.params.item.order_date}
        bottomTitle6="Дата приказа"
      ></ListBoxWithBottomWith6Item>
    </Layout>
  )
}

export default InfoPayment
