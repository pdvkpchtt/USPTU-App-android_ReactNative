import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListItemWithBottomTitle = ({ title, bottomTitle, onPress = null, isDividerNeed = false }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          paddingHorizontal: 16,
        }}
      >
        <View style={styles.rows1}>
          <View style={styles.rows2}>
            <TextMain color={SwitchTheme(isTheme).textMain}>{title}</TextMain>
            <TextSmall color={SwitchTheme(isTheme).textSec} marginTop={0}>
              {bottomTitle}
            </TextSmall>
          </View>
        </View>
        {isDividerNeed && <Divider ml={-16} />}
      </View>
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
})

export default ListItemWithBottomTitle
