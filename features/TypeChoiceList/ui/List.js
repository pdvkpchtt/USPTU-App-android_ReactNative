import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import SubjectCard from '../../../entities/SubjectCard'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from '../../../shared/ui/Text/TextBody'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListBox from '../../../shared/ui/ListBox'
import { useWorkAddStore } from '../../WorkAddManageForm'
import ListItemWithLink from './../../../shared/ui/ListItemWithLink'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const List = ({ items, navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const setType = useWorkAddStore((state) => state.setType)
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: item?.isLast ? 16 : 0, paddingHorizontal: 16 }}>
        <ListItemWithLink
          bg={SwitchTheme(isTheme).bgItem}
          title={item.value}
          position={index === 0 ? 'top' : index === items.length - 1 ? 'bottom' : 'middle'}
          onPress={() => {
            setType({
              typeId: item.id,
              type: item.value,
            })
            navigation.goBack()
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
    return item.id
  }

  return (
    <FlashList
      estimatedItemSize={42}
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 24 }}
    />
  )
}

export default List
