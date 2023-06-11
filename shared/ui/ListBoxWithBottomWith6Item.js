import { Pressable, StyleSheet, Text, View } from 'react-native'
import useThemeStore from '../theme/store/store'
import SwitchTheme from '../theme/SwitchTheme'
import Divider from './Divider'
import ListItemWithBottomTitle from './ListItemWithBottomTitle'
import TextMain from './Text/TextMain'
import TextSmall from './Text/TextSmall'

const ListBoxWithBottomWith6Item = ({
  title1,
  bottomTitle1,
  title2,
  bottomTitle2,
  title3,
  bottomTitle3,
  title4,
  bottomTitle4,
  title5,
  bottomTitle5,
  title6,
  bottomTitle6,
  isDividerNeed = false,
}) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
        <ListItemWithBottomTitle title={title1} bottomTitle={bottomTitle1} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={title2} bottomTitle={bottomTitle2} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={title3} bottomTitle={bottomTitle3} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={title4} bottomTitle={bottomTitle4} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={title5} bottomTitle={bottomTitle5} isDividerNeed></ListItemWithBottomTitle>
        <ListItemWithBottomTitle title={title6} bottomTitle={bottomTitle6}></ListItemWithBottomTitle>
      </View>
    </>
  )
}

export default ListBoxWithBottomWith6Item
