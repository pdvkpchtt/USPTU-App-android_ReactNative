import Layout from '../../shared/ui/Layout'
import { FlashList } from '@shopify/flash-list'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import { useUserStore } from '../../entities/user'
import capitalize from '../../shared/utils/capitalize'
import { View } from 'react-native'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'

const Movements = ({}) => {
  const isTheme = useThemeStore((state) => state.theme)

  const data = useUserStore((state) => state.movements)
  // //console.log(data)

  const renderItem = ({ item }) => (
    <View style={{ borderRadius: 20, backgroundColor: SwitchTheme(isTheme).bgItem, marginTop: 12 }}>
      <ListItemWithBottomTitle bottomTitle="Специальность" title={item.speciality} isDividerNeed />
      {item.speciality_code !== '-' ? (
        <ListItemWithBottomTitle bottomTitle="Код специальности" title={item.speciality_code} isDividerNeed />
      ) : null}
      <ListItemWithBottomTitle bottomTitle="Факультет" title={item.department} isDividerNeed />
      <ListItemWithBottomTitle bottomTitle="Курс" title={item.year} isDividerNeed />
      <ListItemWithBottomTitle bottomTitle="Группа" title={item.group} isDividerNeed />
      <ListItemWithBottomTitle bottomTitle={'Действие'} title={capitalize(item.action)} isDividerNeed />
      <ListItemWithBottomTitle bottomTitle={'Основание'} title={capitalize(item.cause)} isDividerNeed />
      {item.grade_point_average !== '/д' ? (
        <ListItemWithBottomTitle bottomTitle={'Средний балл'} title={item.grade_point_average} isDividerNeed />
      ) : null}
      <ListItemWithBottomTitle bottomTitle={'Дата начала'} title={item.start_date} isDividerNeed={!!item.end_date} />
      {item.end_date ? (
        <ListItemWithBottomTitle bottomTitle={'Дата окончания'} title={item.end_date} isDividerNeed={false} />
      ) : null}
    </View>
  )
  return (
    <Layout forFlashList>
      <FlashList
        data={data.slice().reverse()}
        renderItem={renderItem}
        estimatedItemSize={76}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: 'transparent', paddingBottom: 12 }}
        overScrollMode="never"
      />
    </Layout>
  )
}

export default Movements
