import { StyleSheet, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextMain from './Text/TextMain'

const ListItem = ({ title, position = 'middle', color }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        color: color || SwitchTheme(isTheme).TextMain,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        backgroundColor: SwitchTheme(isTheme).bgItem,
        borderTopRightRadius: position === 'top' || position === 'all' ? 13 : 0,
        borderTopLeftRadius: position === 'top' || position === 'all' ? 13 : 0,
        borderBottomRightRadius: position === 'bottom' || position === 'all' ? 13 : 0,
        borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 13 : 0,
        paddingHorizontal: 16,
        paddingVertical: 9,
      }}
    >
      <TextMain flexShrink={1}>{title}</TextMain>

      {position === 'middle' || position === 'top' ? <Divider /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    paddingRight: 0,
  },

  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 1,
  },
})

export default ListItem
