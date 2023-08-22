import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import RunIcon from './Icons/RunIcon'
import TextHead from './Text/TextHead'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListItemWithRightTitleAndLinkAndBadge = ({
  title,
  rightTitle,
  onPress = null,
  isDividerNeed,
  position = 'middle',
  header,
  bg = null,
}) => {
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
            backgroundColor: pressed ? SwitchTheme(isTheme).pressedItem : bg ? bg : null,
            paddingHorizontal: 16,
            borderTopRightRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderTopLeftRadius: position === 'top' || position === 'all' ? 20 : 0,
            borderBottomRightRadius: position === 'bottom' || position === 'all' ? 20 : 0,
            borderBottomLeftRadius: position === 'bottom' || position === 'all' ? 20 : 0,
          }}
        >
          <View style={styles.rows1}>
            <View style={{ flexShrink: 1 }}>
              {header ? <TextHead text={header} /> : null}
              <TextMain flexShrink={1}>{title}</TextMain>
            </View>
            <View style={styles.rows2}>
              <TextSmall color={SwitchTheme(isTheme).textSec}>{rightTitle}</TextSmall>
              <View
                style={{
                  marginLeft: 8,
                }}
              >
                <RunIcon />
              </View>
            </View>
          </View>
          {/* {rightTitle ? (
            <TextSmall color={SwitchTheme(isTheme).textSec} marginTop={-12} marginBottom={12}>
              {rightTitle}
            </TextSmall>
          ) : null} */}
          {isDividerNeed || position === 'middle' || position === 'top' ? <Divider ml={-16} /> : null}
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
    paddingVertical: 12,
  },

  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default ListItemWithRightTitleAndLinkAndBadge
