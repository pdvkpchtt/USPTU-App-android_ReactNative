import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View, useColorScheme } from 'react-native'
import GradeCard from '../../../entities/GradeCard'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from './../../../shared/ui/Text/TextBody'
import { useEffect, useState } from 'react'

const List = ({ items, navigation, refreshing, filtering }) => {
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
  const navigateToGrade = (item) => {
    const pushAction = StackActions.push('Информация о дисциплине', {
      name: item.discipline_name,
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
        <View style={{ marginTop: 8, marginBottom: 24 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.interval}</TextSectionHeader>
        </View>
      )
    }
    return (
      <View style={{ marginBottom: item?.isLast ? 16 : 24 }}>
        <GradeCard
          isNeedRanking
          item={item}
          onPress={() => {
            navigateToGrade(item)
          }}
        />
      </View>
    )
  }

  const keyExtractor = (item) => {
    if ('type' in item) {
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
      renderItem={renderItem}
      estimatedItemSize={152}
      stickyHeaderIndices={filtering ? [] : stickyHeaderIndices}
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
      refreshControl={<RefreshControl refreshing={refreshing} />}
      extraData={itemState}
    />
  )
}

export default List
