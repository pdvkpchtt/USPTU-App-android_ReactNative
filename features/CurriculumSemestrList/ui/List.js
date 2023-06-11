import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, View, useColorScheme } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightTitle from '../../../shared/ui/ListItemWithRightTitle'
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
          marginBottom: item?.isLast ? 16 : 24,
          backgroundColor: SwitchTheme(isTheme).bgItem,
          borderRadius: 13,
        }}
      >
        <ListItemWithBottomTitle
          title={item.discipline_name}
          bottomTitle={item.ranking}
          isDividerNeed
        ></ListItemWithBottomTitle>
        <ListItemWithRightTitle title="Кафедра" rightTitle={item.department} isDividerNeed></ListItemWithRightTitle>
        {item.hours !== '' ? (
          <ListItemWithRightTitle title="Всего часов" rightTitle={item.hours} isDividerNeed></ListItemWithRightTitle>
        ) : null}

        {item.aud_hours !== '' ? (
          <ListItemWithRightTitle
            title="Аудиторных часов"
            rightTitle={item.aud_hours}
            isDividerNeed
          ></ListItemWithRightTitle>
        ) : null}

        {item.credits !== '' ? (
          <ListItemWithRightTitle title="Зачётных единиц" rightTitle={item.credits}></ListItemWithRightTitle>
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
        paddingTop: 24,
      }}
      estimatedItemSize={283}
      onScrollBeginDrag={Keyboard.dismiss}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}

export default List
