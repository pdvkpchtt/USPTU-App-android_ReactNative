import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import WorkCard from '../../../entities/WorkCard'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from './../../../shared/ui/Text/TextBody'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import { useLayoutEffect, useState } from 'react'
import TextMain from '../../../shared/ui/Text/TextMain'

const List = ({ items, navigation, refreshing, isEmpty }) => {
  const isTheme = useThemeStore((state) => state.theme)

  const navigateToWork = (item) => {
    navigation.navigate('Информация о работе', {
      name: item.work_name,
      ...item,
    })
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
        <WorkCard
          item={item}
          onPress={() => {
            navigateToWork(item)
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
        {isEmpty ? (
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
            <TextMain textAlign="left">Ничего не найдено</TextMain>
          </View>
        ) : (
          <LoadingBox />
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
      //  onScroll={Keyboard.dismiss}
      ListEmptyComponent={getListEmptyComponent}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          colors={[SwitchTheme(isTheme).checkIcon]}
          progressBackgroundColor={SwitchTheme(isTheme).bgItem}
          refreshing={refreshing}
        />
      }
      alwaysBounceVertical={false}
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onScrollBeginDrag={Keyboard.dismiss}
      overScrollMode="never"
    />
  )
}

export default List
