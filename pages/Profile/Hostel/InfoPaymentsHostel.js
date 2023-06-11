import { Text } from 'react-native'
import BlockPaymentsHostel from '../../../shared/ui/BlockPaymentsHostel'
import Layout from '../../../shared/ui/Layout'
import ListBox from '../../../shared/ui/ListBox'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'

const InfoPaymentsHostel = ({ navigation, route }) => {
  return (
    <Layout>
      <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
        <ListItemWithBottomTitle bottomTitle={route.params.item[0]} title={route.params.item[3] + ' ₽'} isDividerNeed />
        <ListItemWithBottomTitle bottomTitle={'Номер счета'} title={route.params.item[1]} isDividerNeed />
        <ListItemWithBottomTitle bottomTitle={'Дата выставления счета'} title={route.params.item[2]} isDividerNeed />
        <ListItemWithBottomTitle bottomTitle={'Статус счета'} title={route.params.item[4]} />
      </ListBox>
    </Layout>
  )
}

export default InfoPaymentsHostel
