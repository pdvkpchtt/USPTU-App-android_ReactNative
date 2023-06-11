import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUserStore } from '../../entities/user'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import CheckIcon from '../../shared/ui/Icons/CheckIcon'
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
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
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
            <CheckIcon color={index == dataIdSelected ? SwitchTheme(isTheme).checkIcon : 'transparent'} />
          </ListItemWithRightIcon>
        ))}
      </View>
      <TextCaption marginTop={8} marginHorizontal={16} color={SwitchTheme(isTheme).textOuterSec}>
        При выборе группы поменяются все данные, включая расписание.
      </TextCaption>
    </Layout>
  )
}

export default ChangeGroup
