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
import TextMain from '../../../shared/ui/Text/TextMain'
import { useUserStore } from '../../../entities/user'
import { useGradesStore } from '../../../entities/grades'

const List = ({ items, navigation, refreshing, filtering }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)
  const [itemState, setItemState] = useState(false)

  const { getStudyGroup } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
  }))
  const { filterGrades } = useGradesStore((state) => ({
    filterGrades: state.filterGrades,
  }))

  useEffect(() => {
    if (schemeState != scheme) {
      setSchemeState(scheme)
      filterGrades('', getStudyGroup())
    }
  }, [scheme, schemeState])

  const isTheme = useThemeStore((state) => state.theme)
  const navigateToGrade = (item) => {
    navigation.navigate('Информация о дисциплине', {
      name: item.discipline_name,
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
      refreshControl={
        <RefreshControl
          colors={[SwitchTheme(isTheme).checkIcon]}
          progressBackgroundColor={SwitchTheme(isTheme).bgItem}
          refreshing={refreshing}
        />
      }
      // extraData={itemState}
      overScrollMode="never"
    />
  )
}

export default List
