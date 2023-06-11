import { StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextMain from './Text/TextMain'

const ListItemWithRightTitle = ({ title, rightTitle, isDividerNeed }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          backgroundColor: SwitchTheme(isTheme).bgItem,
          borderRadius: 13,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}
      >
        <View style={styles.rows2}>
          <TextMain>{title}</TextMain>
        </View>
        <TextMain color={SwitchTheme(isTheme).textSec}>{rightTitle}</TextMain>
      </View>
      {isDividerNeed && <Divider ml={0} />}
    </View>
  )
}

const styles = StyleSheet.create({
  rows2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

export default ListItemWithRightTitle
