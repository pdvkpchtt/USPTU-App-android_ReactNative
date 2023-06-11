import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import ListItemWithBottomTitle from './ListItemWithBottomTitle'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const BlockHostel = ({
  titleTop,
  bottomTitleTop,
  titleBottom,
  bottomTitleBottom,
  color = 'black',
  isDividerNeed = false,
}) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      <View
        style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginHorizontal: 16, marginTop: 24 }}
      >
        <ListItemWithBottomTitle title={titleTop} bottomTitle={bottomTitleTop} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={titleBottom} bottomTitle={bottomTitleBottom}></ListItemWithBottomTitle>
      </View>
    </>
  )
}

export default BlockHostel
