import { View } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from './../../shared/ui/ListItemWithBottomTitle'

const GradeInfo = ({ route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 12, marginBottom: 12 }}>
        <ListItemWithBottomTitle title={route.params.discipline_name} bottomTitle={'Название предмета'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.department} bottomTitle={'Кафедра'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.educator_name} bottomTitle={'Преподаватель'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.ranking} bottomTitle={'Форма проверки знаний'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.group} bottomTitle={'Группа'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.year} bottomTitle={'Курс'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.semester} bottomTitle={'Семестр'} isDividerNeed />
        <ListItemWithBottomTitle title={route.params.grade_date} bottomTitle={'Дата сдачи'} isDividerNeed />
        <ListItemWithBottomTitle
          title={['', 'x', '-', 'X'].includes(route.params.grade) ? 'Не оценено' : route.params.grade}
          bottomTitle={route.params.ranking === 'Зачет' ? 'Зачет' : 'Оценка'}
        />
      </View>
    </Layout>
  )
}

export default GradeInfo
