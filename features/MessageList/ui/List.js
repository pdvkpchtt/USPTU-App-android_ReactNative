import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import SubjectCard from '../../../entities/SubjectCard'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextBody from '../../../shared/ui/Text/TextBody'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import * as Linking from 'expo-linking'
import useTokenStore from '../../../shared/apiClient/store/store'
import MessageItem from './MessageItem'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'

const List = ({ items, navigation, refreshing }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const stickyHeaderIndices = items
    .map((item, index) => {
      if ('interval' in item) {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null)

  const renderItem = ({ item, index, arr }) => {
    if ('interval' in item) {
      return (
        <View style={{ marginTop: 8, marginBottom: 4 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.interval}</TextSectionHeader>
        </View>
      )
    }
    return <MessageItem message={item} />
  }

  const keyExtractor = (item) => {
    if ('interval' in item) {
      return item.interval
    }
    return item.key
  }

  const getListEmptyComponent = () => {
    return (
      <>
        {refreshing ? (
          <LoadingBox />
        ) : (
          <View
            style={{
              marginTop: 24,
              // marginHorizontal: 16,
              backgroundColor: SwitchTheme(isTheme).bgItem,
              borderRadius: 13,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            <TextBody textAlign="left">Ничего не найдено</TextBody>
          </View>
        )}
      </>
    )
  }

  return (
    <FlashList
      data={items}
      estimatedItemSize={55}
      renderItem={renderItem}
      stickyHeaderIndices={refreshing ? [] : stickyHeaderIndices}
      getItemType={(item) => {
        // To achieve better performance, specify the type based on the item
        return 'interval' in item ? 'sectionHeader' : 'row'
      }}
      keyExtractor={keyExtractor}
      contentContainerStyle={{ paddingBottom: 24 }}
      onScroll={Keyboard.dismiss}
      ListEmptyComponent={getListEmptyComponent}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} />}
    />
  )
}

export default List
