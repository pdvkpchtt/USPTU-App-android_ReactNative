import { View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithIconAndLink from '../../../shared/ui/ListItemWithIconAndLink'
const List = ({ list }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const getBox = (arr) => {
    return arr.map((item, index, arr) => (
      <ListItemWithIconAndLink
        key={item.name}
        text={item.name}
        children={item.icon}
        onPress={item.onPress}
        position={arr.length !== 1 ? (index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'middle') : 'all'}
      />
    ))
  }

  return (
    <View>
      {list.map((item, index) => (
        <View style={{ marginTop: 12, backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20 }} key={index}>
          {getBox(item)}
        </View>
      ))}
    </View>
  )
}

export default List
