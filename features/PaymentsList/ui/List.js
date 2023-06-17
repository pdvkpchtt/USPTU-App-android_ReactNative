import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View, useColorScheme } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import { useEffect, useState } from 'react'

const List = ({ items, navigation }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)
  const [itemState, setItemState] = useState(false)

  useEffect(() => {
    if (schemeState != scheme) {
      setItemState(!itemState)
      setSchemeState(scheme)
    }
  }, [scheme])

  const isTheme = useThemeStore((state) => state.theme)
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginBottom: 16,
          // marginHorizontal: 16,
          borderRadius: 20,
          backgroundColor: SwitchTheme(isTheme).bgItem,
        }}
      >
        <ListItemWithBottomTitleAndLink
          title={item.amount + ' ₽'}
          header={item.name}
          position="all"
          onPress={() => {
            navigation.navigate('Информация о выплате', { item: item })
          }}
        ></ListItemWithBottomTitleAndLink>
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
      estimatedItemSize={85}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // backgroundColor: SwitchTheme(isTheme).bgFon,
        paddingTop: 12,
      }}
      extraData={itemState}
      overScrollMode="never"
    />
  )
}

export default List
