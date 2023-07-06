import { StyleSheet, Text, View } from 'react-native'
import BlockHostel from '../../../shared/ui/BlockHostel'

import { useHostelStore } from '../../../entities/hostel'
import Layout from './../../../shared/ui/Layout'
import HostelCard from '../../../entities/HostelCard'
import { LoadingBox } from './../../../shared/ui/LoadingBox'
import { useEffect } from 'react'
import ListItemWithLink from '../../../shared/ui/ListItemWithLink'
import ListBox from '../../../shared/ui/ListBox'

const Hostel = ({ navigation }) => {
  const { info, bills, getInfo, refreshing } = useHostelStore((state) => ({
    info: state.info,
    bills: state.bills,
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
          <HostelCard info={info} />
          {bills.length ? (
            <ListBox marginTop={12} paddingHorizontal={0} paddingVertical={0}>
              <ListItemWithLink
                title="Счета"
                position="all"
                onPress={() => {
                  navigation.navigate('Счета', { bills: [...bills].reverse() })
                }}
              />
            </ListBox>
          ) : null}
        </>
      )}
    </Layout>
  )
}

export default Hostel
