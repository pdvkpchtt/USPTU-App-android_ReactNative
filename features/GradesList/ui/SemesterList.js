import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View, useColorScheme } from 'react-native'
import GradeCard from '../../../entities/GradeCard'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from '../../../shared/ui/Text/TextBody'
import ListItemWithRightTitleAndLink from '../../../shared/ui/ListItemWithRightTitleAndLink'
import ListItemWithRightTitleAndLinkAndBadge from '../../../shared/ui/ListItemWithRightTitleAndLinkAndBadge'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'
import { useEffect, useState } from 'react'

const SemesterList = ({ items, navigation, refreshing, filtering }) => {
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
        <View style={{ marginTop: 8, marginBottom: 8 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.interval}</TextSectionHeader>
        </View>
      )
    }
    return (
      <View>
        <ListItemWithRightTitleAndLinkAndBadge
          title={item.ranking}
          rightTitle={item.length}
          bg={SwitchTheme(isTheme).bgItem}
          position={item.position}
          onPress={() => {
            navigation.navigate('Дисциплины категории', {
              name: `${item.ranking}, ${item.data[0].semester} семестр`,
              data: item.data,
            })
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
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
      renderItem={renderItem}
      stickyHeaderIndices={filtering ? [] : stickyHeaderIndices}
      getItemType={(item) => {
        // To achieve better performance, specify the type based on the item
        return 'type' in item ? 'sectionHeader' : 'row'
      }}
      estimatedItemSize={41}
      keyExtractor={keyExtractor}
      contentContainerStyle={{
        paddingBottom: 24,
      }}
      onScrollBeginDrag={Keyboard.dismiss}
      ListEmptyComponent={getListEmptyComponent}
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} />}
      extraData={itemState}
    />
  )
}

export default SemesterList
