import { useEffect, useState } from 'react'
import { useUserStore } from '../../entities/user'
import { useIsFocused } from '@react-navigation/native'
import getCurriculumList from './api/getCurriculumList'
import { Text, View } from 'react-native'
import Layout from '../../shared/ui/Layout'
import ListItemWithLink from '../../shared/ui/ListItemWithLink'
import { LoadingBox } from '../../shared/ui/LoadingBox'
import ListBox from '../../shared/ui/ListBox'
import TextMain from '../../shared/ui/Text/TextMain'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'

const CurriculumList = ({ navigation, filter }) => {
  const getPotok = useUserStore((state) => state.getPotok)
  const [data, setData] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [loading, setLoading] = useState(true)
  const focused = useIsFocused()

  const isTheme = useThemeStore((state) => state.theme)

  const getData = async () => {
    const plan = await getCurriculumList()
    // //console.log(plan.plan[getPotok()])
    if (getPotok() in plan.plan) {
      setData(plan.plan[getPotok()])
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      {!loading ? (
        <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 12 }}>
          {data.length ? (
            data.map((item, index, arr) => (
              <ListItemWithLink
                title={item.interval}
                position={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'middle'}
                key={index}
                onPress={() => {
                  navigation.navigate('Учебный план семестр', { data: item.data, name: item.interval })
                }}
              />
            ))
          ) : (
            <ListBox>
              <TextMain>Для выбранной группы нет учебного плана</TextMain>
            </ListBox>
          )}
        </View>
      ) : (
        <LoadingBox />
      )}
    </>
  )

  // return <List items={grades} navigation={navigation} refreshing={refreshing} />
}

export default CurriculumList
