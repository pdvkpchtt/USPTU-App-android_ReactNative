import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { usePaymentsStore } from '../entities/payments'
import Layout from '../shared/ui/Layout'
import ListBox from '../shared/ui/ListBox'
import ListItemWithLink from '../shared/ui/ListItemWithLink'
import { LoadingBox } from '../shared/ui/LoadingBox'
import TextMain from '../shared/ui/Text/TextMain'

import { pay } from './demoData'

const DemoPayments = ({ navigation }) => {
  const { getInfo, refreshing } = usePaymentsStore((state) => ({
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
          {pay.length === 0 && pay.length === 0 ? (
            <ListBox marginTop={24}>
              <TextMain>Нет выплат :(</TextMain>
            </ListBox>
          ) : null}
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
            {pay.length > 0 ? (
              <ListItemWithLink
                title="Активные выплаты"
                position="top"
                onPress={() => {
                  navigation.navigate('Активные/Истекшие выплаты', { name: 'Активные выплаты', items: pay })
                }}
              />
            ) : null}
            {pay.length > 0 ? (
              <ListItemWithLink
                title="Истекшие выплаты"
                position="bottom"
                onPress={() => {
                  navigation.navigate('Активные/Истекшие выплаты', {
                    name: 'Истекшие выплаты',
                    items: pay,
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

export default DemoPayments
