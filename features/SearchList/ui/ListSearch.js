import { Keyboard, RefreshControl, StyleSheet, View, useColorScheme } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ClassroomIcon from '../../../shared/ui/Icons/ClassroomIcon'
import EducatorIcon from '../../../shared/ui/Icons/EducatorIcon'
import GroupIcon from '../../../shared/ui/Icons/GroupIcon'
import ListItemWithIconAndLink from '../../../shared/ui/ListItemWithIconAndLink'
import { FlashList } from '@shopify/flash-list'
import TextBody from '../../../shared/ui/Text/TextBody'
import getFilialName from './../../../shared/utils/getFilialName'
import { useGeneralScheduleStore } from '../../../entities/generalSchedule'
import { useEffect, useState } from 'react'
import TextMain from '../../../shared/ui/Text/TextMain'

const ListSearch = ({ navigation, items, refreshing, isEmpty }) => {
  const scheme = useColorScheme()
  const [schemeState, setSchemeState] = useState(scheme)
  const [itemState, setItemState] = useState(false)

  useEffect(() => {
    if (schemeState != scheme) {
      setItemState(!itemState)
      setSchemeState(scheme)
    }
  }, [scheme, schemeState])

  const isTheme = useThemeStore((state) => state.theme)
  const setSettings = useGeneralScheduleStore((state) => state.setSettings)
  ////console.log(items.length)

  const renderItem = ({ item, index }) => {
    if ('GRUPPA' in item) {
      return (
        <ListItemWithIconAndLink
          bg={SwitchTheme(isTheme).bgItem}
          position={items.length > 1 ? (index === 0 ? 'top' : index === items.length - 1 ? 'bottom' : 'middle') : 'all'}
          text={item.GRUPPA}
          children={<GroupIcon color={SwitchTheme(isTheme).textMain} />}
          onPress={() => {
            setSettings(item)
            navigation.navigate('Общее расписание', { title: item.GRUPPA, is_prepod: false })
          }}
        />
      )
    }

    if ('id_prepod' in item) {
      return (
        <ListItemWithIconAndLink
          bg={SwitchTheme(isTheme).bgItem}
          position={items.length > 1 ? (index === 0 ? 'top' : index === items.length - 1 ? 'bottom' : 'middle') : 'all'}
          text={item.fio.replace('.', ' ').slice(0, -1)}
          children={<EducatorIcon color={SwitchTheme(isTheme).textMain} />}
          onPress={() => {
            setSettings(item)
            navigation.navigate('Общее расписание', { title: item.fio.replace('.', ' ').slice(0, -1), is_prepod: true })
          }}
        />
      )
    }

    if ('auditor_id' in item) {
      return (
        <ListItemWithIconAndLink
          bg={SwitchTheme(isTheme).bgItem}
          position={items.length > 1 ? (index === 0 ? 'top' : index === items.length - 1 ? 'bottom' : 'middle') : 'all'}
          text={item.auditor_name + ' \u00B7 ' + getFilialName(item.filial.toString())}
          children={<ClassroomIcon color={SwitchTheme(isTheme).textMain} />}
          onPress={() => {
            setSettings(item)
            navigation.navigate('Общее расписание', { title: item.auditor_name, is_prepod: false })
          }}
        />
      )
    }
  }

  const keyExtractor = (item) => {
    if ('GRUPPA' in item) {
      return item.id
    }
    if ('id_prepod' in item) {
      return item.id_prepod + item.fio
    }
    if ('auditor_id' in item) {
      return item.auditor_name + item.auditor_id + item.FILIAL
    }
  }

  const getListEmptyComponent = () => {
    return (
      <>
        {!isEmpty ? null : ( // <LoadingBox />
          <View
            style={{
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
      keyExtractor={keyExtractor}
      estimatedItemSize={100}
      onScrollBeginDrag={Keyboard.dismiss}
      contentContainerStyle={{
        paddingVertical: 12,
      }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={getListEmptyComponent}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          colors={[SwitchTheme(isTheme).checkIcon]}
          progressBackgroundColor={SwitchTheme(isTheme).bgItem}
          refreshing={refreshing}
        />
      }
      extraData={itemState}
      overScrollMode="never"
    />
  )
}

export default ListSearch
