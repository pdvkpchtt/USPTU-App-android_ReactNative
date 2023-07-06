import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import WorkCard from '../../../entities/WorkCard'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from '../../../shared/ui/Text/TextBody'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const List = ({ items, navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginTop: 12,
          // marginHorizontal: 16,
          borderRadius: 20,
          backgroundColor: SwitchTheme(isTheme).bgItem,
        }}
      >
        <ListItemWithBottomTitleAndLink
          title={item[3] + ' ₽'}
          bottomTitle={item[0]}
          position="all"
          onPress={() => {
            navigation.navigate('Сведения о счёте', { item: item })
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
    return JSON.stringify(item)
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={88}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // backgroundColor: SwitchTheme(isTheme).bgFon,
        paddingBottom: 12,
      }}
      overScrollMode="never"
    />
  )
}

export default List
