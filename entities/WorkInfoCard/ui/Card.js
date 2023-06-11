import { View } from 'react-native'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import ListItemWithBottomTitle from './../../../shared/ui/ListItemWithBottomTitle'
const Card = ({ item }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
      <ListItemWithBottomTitle title={item.discipline_name} bottomTitle={'Дисциплина'} isDividerNeed />
      <ListItemWithBottomTitle title={item.type_of_work} bottomTitle={'Вид работы'} isDividerNeed />
      <ListItemWithBottomTitle title={item.group} bottomTitle={'Группа'} isDividerNeed />
      <ListItemWithBottomTitle title={item.status_of_work} bottomTitle={'Статус'} isDividerNeed />
      {item.additional_information && (
        <ListItemWithBottomTitle
          title={item.additional_information}
          bottomTitle={'Дополнительная информация'}
          isDividerNeed
        />
      )}
      {item.review && <ListItemWithBottomTitle title={item.review} bottomTitle={'Рецензия'} isDividerNeed />}
      {item.grade && <ListItemWithBottomTitle title={item.grade} bottomTitle={'Оценка / баллы'} isDividerNeed />}
      {item.dataCheck && <ListItemWithBottomTitle title={item.dataCheck} bottomTitle={'Дата проверки'} isDividerNeed />}
      {item.comment && (
        <ListItemWithBottomTitle title={item.comment} bottomTitle={'Комментарий преподавателя'} isDividerNeed />
      )}

      {item.dataUpload && (
        <ListItemWithBottomTitle title={item.dataUpload} bottomTitle={'Дата изменения'} isDividerNeed />
      )}
    </View>
  )
}

export default Card
