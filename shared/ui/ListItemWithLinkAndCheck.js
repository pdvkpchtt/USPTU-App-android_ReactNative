import Checkbox from 'expo-checkbox'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useWorkAddStore } from '../../features/WorkAddManageForm'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextHead from './Text/TextHead'
import TextMain from './Text/TextMain'

const ListItemWithLinkAndCheck = ({ title, onPress = null, header, position = 'middle', bg = null, item }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const { type, typeId } = useWorkAddStore((state) => ({ type: state.type, typeId: state.typeId }))

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: pressed ? SwitchTheme(isTheme).pressedItem : bg ? bg : null,
            borderTopRightRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderTopLeftRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderBottomRightRadius: position === 'bottom' || position === 'all' ? 20 : 0,
            borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 20 : 0,
            paddingHorizontal: 16,
          }}
        >
          <View style={styles.rows1}>
            <View style={{ flexShrink: 1 }}>
              {header ? <TextHead text={header} /> : null}
              <TextMain flexShrink={1}>{title}</TextMain>
            </View>
            <Checkbox
              value={item.value == type && item.id == typeId}
              style={{ width: 18, height: 18 }}
              color={
                item.value == type && item.id == typeId ? SwitchTheme(isTheme).checkIcon : SwitchTheme(isTheme).checkBox
              }
            />
          </View>
          {position === 'middle' || position === 'top' ? <Divider ml={-16} /> : null}
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15.5,
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

export default ListItemWithLinkAndCheck
