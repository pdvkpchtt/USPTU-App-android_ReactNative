import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Checkbox from 'expo-checkbox'
import { useUserStore } from '../../entities/user'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightIcon from '../../shared/ui/ListItemWithRightIcon'
import ListItemWithRightTitle from '../../shared/ui/ListItemWithRightTitle'
import ListItemWithRightTitleAndLink from '../../shared/ui/ListItemWithRightTitleAndLink'
import TextCaption from '../../shared/ui/Text/TextCaption'
import capitalize from '../../shared/utils/capitalize'

const ChangeGroup = ({ navigation }) => {
  const { getGroups, dataIdSelected } = useUserStore((state) => ({
    getGroups: state.getGroups,
    dataIdSelected: state.dataIdSelected,
  }))

  const [groups, setGroups] = useState([])
  useEffect(() => {
    setGroups(getGroups())
  }, [])

  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 16 }}>
        {groups.map((group, index, arr) => (
          // console.log(index === 0),
          <ListItemWithRightIcon
            text={group}
            position={index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'middle'}
            key={index}
            onPress={() => {
              useUserStore.setState({ dataIdSelected: index })
            }}
          >
            <Checkbox
              value={index == dataIdSelected}
              style={{ width: 18, height: 18 }}
              color={index == dataIdSelected ? SwitchTheme(isTheme).checkIcon : SwitchTheme(isTheme).checkBox}
            />
          </ListItemWithRightIcon>
        ))}
      </View>
      <TextCaption marginTop={8} marginHorizontal={16} color={SwitchTheme(isTheme).textOuterSec}>
        Выбрав группу, поменяются все данные, включая расписание.
      </TextCaption>
    </Layout>
  )
}

export default ChangeGroup
