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
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import TextMain from '../../../shared/ui/Text/TextMain'

const List = ({ items, navigation, refreshing }) => {
  const accessToken = useTokenStore((state) => state.token)
  const isTheme = useThemeStore((state) => state.theme)

  const navigateToMessage = (item) => {
    const pushAction = StackActions.push('Файлы дисциплины', {
      name: item.educator_name,
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

  const renderItem = ({ item, index, arr }) => {
    if ('interval' in item) {
      return (
        <View style={{ marginTop: 12, marginBottom: 12 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.interval}</TextSectionHeader>
        </View>
      )
    }
    return (
      <ListItemWithButton
        backgroundIsNeed
        position={item?.position || 'middle'}
        title={item.name}
        buttonTitle="Скачать"
        isDividerNeed={index !== items.length - 1}
        onPress={() => {
          Linking.openURL(`https://ams.rusoil.net/pcs3/${item.link.slice(2)}&access_token=${accessToken}`)
        }}
      />
    )
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
        {refreshing ? null : ( // <LoadingBox />
          <View
            style={{
              marginTop: 12,
              marginHorizontal: 12,
              backgroundColor: SwitchTheme(isTheme).bgItem,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <TextMain textAlign="left">Ничего не найдено</TextMain>
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
      // contentContainerStyle={{ paddingBottom: 24 }}
      onScroll={Keyboard.dismiss}
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

export default List
