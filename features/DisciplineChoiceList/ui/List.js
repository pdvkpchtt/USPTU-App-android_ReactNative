import { StackActions } from '@react-navigation/native'
import { FlashList } from '@shopify/flash-list'
import { Keyboard, RefreshControl, Text, View } from 'react-native'
import SubjectCard from '../../../entities/SubjectCard'
import TextSectionHeader from '../../../shared/ui/Text/TextSectionHeader'
import TextBody from '../../../shared/ui/Text/TextBody'
import { LoadingBox } from '../../../shared/ui/LoadingBox'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListBox from '../../../shared/ui/ListBox'
import { useWorkAddStore } from '../../WorkAddManageForm'

import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const List = ({ items, navigation }) => {
  const setDiscipline = useWorkAddStore((state) => state.setDiscipline)
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
    const splittedValue = item.value.split('/')
    const disciplineName = splittedValue[splittedValue.length - 1].trim()
    const ranking = splittedValue[splittedValue.length - 2].trim()

    return (
      <View style={{ marginBottom: item?.isLast ? 16 : 0 }}>
        <ListItemWithBottomTitleAndLink
          title={disciplineName}
          bottomTitle={`${item.gruppa} \u00B7 ${ranking}`}
          bg={SwitchTheme(isTheme).bgItem}
          position={item.position}
          onPress={() => {
            setDiscipline({
              discipline: disciplineName,
              disciplineId: item.id,
              group: item.gruppa,
              ranking,
              semester: item.semestr,
              worknomer: item.worknomer,
            })
            navigation.goBack()
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
      <ListBox marginTop={24}>
        <TextBody textAlign="left">Нет дисциплин для выбора. Выберите другую группу</TextBody>
      </ListBox>
    )
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      estimatedItemSize={69}
      stickyHeaderIndices={stickyHeaderIndices}
      getItemType={(item) => {
        // To achieve better performance, specify the type based on the item
        return 'type' in item ? 'sectionHeader' : 'row'
      }}
      keyExtractor={keyExtractor}
      contentContainerStyle={{}}
      ListEmptyComponent={getListEmptyComponent}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
    />
  )
}

export default List
