import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { usePaymentsStore } from '../../../entities/payments'
import ListItemWithLink from '../../../shared/ui/ListItemWithLink'
import Layout from './../../../shared/ui/Layout'
import { LoadingBox } from './../../../shared/ui/LoadingBox'
import ListBox from './../../../shared/ui/ListBox'
import TextMain from '../../../shared/ui/Text/TextMain'

const Payments = ({ navigation }) => {
  const { activePayments, inActivePayments, getInfo, refreshing } = usePaymentsStore((state) => ({
    activePayments: state.activePayments,
    inActivePayments: state.inActivePayments,
    getInfo: state.getInfo,
    refreshing: state.refreshing,
  }))

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <Layout>
      {refreshing ? (
        <LoadingBox />
      ) : (
        <>
          {activePayments.length === 0 && inActivePayments.length === 0 ? (
            <ListBox marginTop={24}>
              <TextMain>Нет выплат :(</TextMain>
            </ListBox>
          ) : null}
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
            {activePayments.length > 0 ? (
              <ListItemWithLink
                title="Активные выплаты"
                position="top"
                onPress={() => {
                  navigation.navigate('Активные/Истекшие выплаты', { name: 'Активные выплаты', items: activePayments })
                }}
              />
            ) : null}
            {inActivePayments.length > 0 ? (
              <ListItemWithLink
                title="Истекшие выплаты"
                position="bottom"
                onPress={() => {
                  navigation.navigate('Активные/Истекшие выплаты', {
                    name: 'Истекшие выплаты',
                    items: inActivePayments,
                  })
                }}
              />
            ) : null}
          </ListBox>
        </>
      )}
    </Layout>
  )
}

export default Payments
