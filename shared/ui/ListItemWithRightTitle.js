import { StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import TextHead from './Text/TextHead'
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
          borderRadius: 20,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
        }}
      >
        <View style={styles.rows2}>
          <TextHead text={title} />
          <TextMain>{rightTitle}</TextMain>
        </View>
      </View>
      {isDividerNeed && <Divider ml={0} />}
    </View>
  )
}

const styles = StyleSheet.create({
  rows2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
})

export default ListItemWithRightTitle
