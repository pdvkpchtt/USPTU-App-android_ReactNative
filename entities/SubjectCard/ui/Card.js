import { StyleSheet, View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithLink from '../../../shared/ui/ListItemWithLink'
import ListItemWithRightTitleAndLink from '../../../shared/ui/ListItemWithRightTitleAndLink'
import ListItemWithRightTitleAndLinkAndBadge from '../../../shared/ui/ListItemWithRightTitleAndLinkAndBadge'
import TextCaption from '../../../shared/ui/Text/TextCaption'

const Card = ({ item, onPress, isShowBadge }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 0 }}>
        {item.educator_name ? (
          <>
            {isShowBadge && item.unreadMessagesCount > 0 ? (
              <ListItemWithRightTitleAndLinkAndBadge
                header={item.ranking}
                title={item.educator_name}
                rightTitle={item.unreadMessagesCount}
                onPress={onPress}
                position="top"
              />
            ) : (
              <ListItemWithLink title={item.educator_name} header={item.ranking} onPress={onPress} position="top" />
            )}
            <ListItemWithBottomTitle title={item.discipline_name} header={item.group} />
          </>
        ) : isShowBadge && item.unreadMessagesCount > 0 ? (
          <ListItemWithRightTitleAndLinkAndBadge
            title={item.discipline_name}
            rightTitle={item.unreadMessagesCount}
            onPress={onPress}
            position="all"
          />
        ) : (
          <ListItemWithLink title={item.discipline_name} onPress={onPress} position="all" />
        )}
      </View>
    </>
  )
}

export default Card
