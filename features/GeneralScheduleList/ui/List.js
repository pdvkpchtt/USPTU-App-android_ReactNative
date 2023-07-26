import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, StyleSheet, Text, View, useColorScheme } from 'react-native'
import LessonCard from '../../../entities/LessonCard'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemSchedule from '../../../shared/ui/ListItemSchedule'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import TextBody from '../../../shared/ui/Text/TextBody'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import { useGeneralScheduleStore } from '../../../entities/generalSchedule'
import { useEffect, useState } from 'react'
import FAB from '../../../shared/ui/FAB'
import moment from 'moment/moment'
import TextMain from '../../../shared/ui/Text/TextMain'
moment.locale('ru')

const List = ({ items, navigation, refreshing, filtering, myFunc }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)
  const [HIDE_STATE, setHIDE_STATE] = useState(true)
  const [ARROW_DIRECTION, setARROW_DIRECTION] = useState('chevron-down')

  let myDate = moment(new Date()).format('YYYY-MM-DD')

  useEffect(() => {
    updateSchedule()
  }, [scheme])

  const today = moment()

  const { loadNextWeek, updateSchedule, setShowingWeekNumber } = useGeneralScheduleStore((state) => ({
    loadNextWeek: state.loadNextWeek,
    updateSchedule: state.updateSchedule,
    setShowingWeekNumber: state.setShowingWeekNumber,
  }))

  const isTheme = useThemeStore((state) => state.theme)
  const stickyHeaderIndices = items
    .map((item, index) => {
      if ('shownDate' in item) {
        return index
      } else {
        return null
      }
    })
    .filter((item) => item !== null)

  const renderItem = ({ item, index }) => {
    if ('shownDate' in item) {
      return (
        <View style={{ marginTop: 12, marginBottom: 8 }}>
          <TextSectionHeader color={SwitchTheme(isTheme).textHeader}>{item.shownDate}</TextSectionHeader>
        </View>
      )
    }
    return (
      // не срабатывает isLast
      <View style={{ marginTop: 4, paddingHorizontal: 12 }}>
        {/* <ListItemSchedule subject={item.discipline_name} /> */}
        {/* <Text>{JSON.stringify(item[0]?.lessons)}</Text> */}
        {item.lessons.length ? (
          <LessonCard item={item.lessons} isGeneral={true}></LessonCard>
        ) : (
          <View
            style={{
              backgroundColor: SwitchTheme(isTheme).bgItem,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 12,
            }}
          >
            <TextMain textAlign="left">Нет занятий</TextMain>
          </View>
        )}
      </View>
    )
  }

  const keyExtractor = (item) => {
    return item.key
  }

  const checkViewableItems = ({ viewableItems }) => {
    if (viewableItems[0]?.item?.weekNumber) {
      setShowingWeekNumber(viewableItems[0]?.item?.weekNumber)
    }
    if (viewableItems[0]?.item?.fullDate === today.format('DD.MM.YYYY')) {
      setHIDE_STATE(true)
    }
    if (moment(viewableItems[0]?.item?.fullDate, 'DD.MM.YYYY').isAfter(moment(today, 'DD.MM.YYYY'), 'day')) {
      setHIDE_STATE(false)
      setARROW_DIRECTION('chevron-up')
    }
    if (moment(viewableItems[0]?.item?.fullDate, 'DD.MM.YYYY').isBefore(moment(today, 'DD.MM.YYYY'), 'day')) {
      setHIDE_STATE(false)
      setARROW_DIRECTION('chevron-down')
    }
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
    <>
      <FlashList
        data={items}
        renderItem={renderItem}
        stickyHeaderIndices={filtering ? [] : stickyHeaderIndices}
        estimatedItemSize={223}
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
            onRefresh={() => {
              updateSchedule()
              myFunc(myDate)
            }}
          />
        }
        onEndReached={!refreshing ? loadNextWeek : null}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          items.length > 2 ? (
            <View
              style={{
                marginTop: 24,
                marginHorizontal: 16,
                // backgroundColor: SwitchTheme(isTheme).bgItem,
                borderRadius: 13,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
            >
              <LoadingBox />
            </View>
          ) : null
        }
        onViewableItemsChanged={checkViewableItems}
        overScrollMode="never"
      />

      {!HIDE_STATE ? (
        <FAB
          onPress={() => {
            updateSchedule()
            setHIDE_STATE(true)
            myFunc(myDate)
          }}
          title="Add"
          arrowDirection={ARROW_DIRECTION}
          bottom={20}
          right={20}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({})

export default List
