import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextMain from './Text/TextMain'

const ListItemWithRightIcon = ({ children, text, onPress = null, isDividerNeed = 'false', position = 'middle' }) => {
  // console.log(text, position)
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            backgroundColor: pressed ? SwitchTheme(isTheme).pressedItem : null,
            paddingHorizontal: 16,
            borderTopRightRadius: position === 'top' || position === 'all' ? 13 : 0,
            borderTopLeftRadius: position === 'top' || position === 'all' ? 13 : 0,
            borderBottomRightRadius: position === 'bottom' || position === 'all' ? 13 : 0,
            borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 13 : 0,
          }}
        >
          <View style={styles.rows1}>
            <TextMain flexShrink={1}>{text}</TextMain>
            <View>{children}</View>
          </View>
          {position === 'top' || position === 'middle' ? <Divider ml={0} /> : null}
        </View>
      )}
    </Pressable>

    // <>
    //   <View
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'column',
    //       justifyContent: 'flex-start',
    //       alignContent: 'flex-start',
    //       paddingHorizontal: 16,
    //     }}
    //   >
    //     <View style={styles.rows1}>
    //       <TextMain flexShrink={1}>{text}</TextMain>
    //       <View>{children}</View>
    //     </View>

    //     {position === 'middle' || position === 'top' ? <Divider ml={0} /> : null}
    //   </View>
    // </>
  )
}

const styles = StyleSheet.create({
  rows1: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
})

export default ListItemWithRightIcon
