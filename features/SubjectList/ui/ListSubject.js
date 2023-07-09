import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, View } from 'react-native'
import SubjectCard from '../../../entities/SubjectCard'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from '../../../shared/ui/Text/TextBody'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import TextMain from '../../../shared/ui/Text/TextMain'

const ListSubject = ({ items, navigation, refreshing, target_action, filter }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const navigateToFile = (item) => {
    const pushAction = StackActions.push(target_action, {
      name: item.educator_name ? item.educator_name : item.discipline_name,
      ...item,
    })

    navigation.dispatch(pushAction)
  }
  const stickyHeaderIndices = items
    .map((item, index) => {
      if ('interval' in item) {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null)

  const renderItem = ({ item, index }) => {
    if ('interval' in item) {
      return (
        <View style={{ marginTop: 12, marginBottom: 12 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.interval}</TextSectionHeader>
        </View>
      )
    }
    return (
      <View style={{ marginBottom: items[index + 1]?.type == 'header' ? 0 : 16 }}>
        <SubjectCard
          target_action={target_action}
          item={item}
          onPress={() => {
            navigateToFile(item)
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
    if ('type' in item) {
      return item.interval
    }
    return item.id
  }

  const getListEmptyComponent = () => {
    return (
      <>
        {refreshing ? null : (
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 0,
              backgroundColor: SwitchTheme(isTheme).bgItem,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <TextMain textAlign="left">{filter ? 'Ничего не найдено' : 'Для выбранной группы нет данных'}</TextMain>
          </View>
        )}
      </>
    )
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={152}
      stickyHeaderIndices={refreshing ? [] : stickyHeaderIndices}
      getItemType={(item) => {
        // To achieve better performance, specify the type based on the item
        return 'type' in item ? 'sectionHeader' : 'row'
      }}
      keyExtractor={keyExtractor}
      contentContainerStyle={{}}
      onScrollBeginDrag={Keyboard.dismiss}
      ListEmptyComponent={getListEmptyComponent}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={[SwitchTheme(isTheme).checkIcon]}
          progressBackgroundColor={SwitchTheme(isTheme).bgItem}
          refreshing={refreshing}
        />
      }
      overScrollMode="never"
    />
  )
}

export default ListSubject
