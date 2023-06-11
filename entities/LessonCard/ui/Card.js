import { StyleSheet, Text, View } from 'react-native'
import ListItemSchedule from '../../../shared/ui/ListItemSchedule'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithLink from '../../../shared/ui/ListItemWithLink'
import ListItemWithRightTitleAndLink from '../../../shared/ui/ListItemWithRightTitleAndLink'
import ListItemWithRightTitleAndLinkAndBadge from '../../../shared/ui/ListItemWithRightTitleAndLinkAndBadge'
import TextCaption from '../../../shared/ui/Text/TextCaption'
import ListItemGeneralSchedule from '../../../shared/ui/ListItemGeneralSchedule'

const Card = ({ item, onPress, isShowBadge, isGeneral = false }) => {
  return <>{isGeneral ? <ListItemGeneralSchedule item={item} /> : <ListItemSchedule item={item} />}</>
}
export default Card
