import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, View, useColorScheme } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import { useEffect, useState } from 'react'

const List = ({ items, navigation, refreshing }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)

  useEffect(() => {
    // danil
    if (schemeState != scheme) {
      refreshing()
      setSchemeState(scheme)
    }
  }, [scheme])

  const isTheme = useThemeStore((state) => state.theme)
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          marginBottom: item?.isLast ? 12 : 16,
          backgroundColor: SwitchTheme(isTheme).bgItem,
          borderRadius: 20,
        }}
      >
        <ListItemWithBottomTitle
          title={item.discipline_name}
          bottomTitle={item.ranking}
          isDividerNeed
        ></ListItemWithBottomTitle>
        <ListItemWithBottomTitle
          bottomTitle="Кафедра"
          title={item.department}
          isDividerNeed={item.hours !== '' && true}
        ></ListItemWithBottomTitle>
        {item.hours !== '' ? (
          <ListItemWithBottomTitle
            bottomTitle="Всего часов"
            title={item.hours}
            isDividerNeed={item.aud_hours !== '' && true}
          ></ListItemWithBottomTitle>
        ) : null}

        {item.aud_hours !== '' ? (
          <ListItemWithBottomTitle
            bottomTitle="Аудиторных часов"
            title={item.aud_hours}
            isDividerNeed={item.credits !== '' && true}
          ></ListItemWithBottomTitle>
        ) : null}

        {item.credits !== '' ? (
          <ListItemWithBottomTitle bottomTitle="Зачётных единиц" title={item.credits}></ListItemWithBottomTitle>
        ) : null}
      </View>
    )
  }

  const keyExtractor = (item) => {
    return item.key
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingTop: 12,
      }}
      estimatedItemSize={283}
      onScrollBeginDrag={Keyboard.dismiss}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
    />
  )
}

export default List
