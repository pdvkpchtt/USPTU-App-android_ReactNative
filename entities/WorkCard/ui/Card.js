import { StyleSheet, View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithRightTitle from '../../../shared/ui/ListItemWithRightTitle'
import TextCaption from '../../../shared/ui/Text/TextCaption'

const Card = ({ item, onPress }) => {
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20 }}>
        <ListItemWithBottomTitleAndLink
          header={item.type_of_work}
          position="top"
          title={item.work_name}
          bottomTitle={item.discipline_name}
          onPress={onPress}
          isDividerNeed
        />
        <ListItemWithRightTitle title="Статус" rightTitle={item.status_of_work} />
      </View>
    </>
  )
}

export default Card
