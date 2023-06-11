import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUserStore } from '../../entities/user'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import ListItemWithRightTitle from '../../shared/ui/ListItemWithRightTitle'
import ListItemWithRightTitleAndLink from '../../shared/ui/ListItemWithRightTitleAndLink'
import capitalize from '../../shared/utils/capitalize'

const PersonalInfo = ({ navigation, route }) => {
  const getCurrentData = useUserStore((state) => state.getCurrentData)
  const [data, setData] = useState(getCurrentData())
  const focused = useIsFocused()
  // const { previous_screen } = route.params

  useEffect(() => {
    setData(getCurrentData())
  }, [focused])
  const isTheme = useThemeStore((state) => state.theme)
  return (
    <Layout>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
        {data.qualification !== '' ? (
          <>
            <ListItemWithBottomTitle bottomTitle={'Специальность'} title={data.speciality} isDividerNeed />
            <ListItemWithBottomTitle
              bottomTitle={'Квалификация'}
              title={capitalize(data.qualification)}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Уровень образования'} title={data.level_of_education} />
          </>
        ) : (
          <ListItemWithBottomTitle bottomTitle={'Уровень образования'} title={data.level_of_education} />
        )}
      </View>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
        <ListItemWithRightTitleAndLink
          title={'Группа'}
          position="top"
          rightTitle={data.study_group}
          onPress={() => {
            navigation.navigate('Смена группы')
          }}
          isDividerNeed
        />
        <ListItemWithRightTitle title={'Курс'} rightTitle={data.year} isDividerNeed />
        <ListItemWithRightTitle title={'Семестр'} rightTitle={data.semester} isDividerNeed />
        <ListItemWithRightTitle title={'Форма обучения'} rightTitle={data.mode_of_study} isDividerNeed />
        <ListItemWithRightTitle title={'Направление обучения'} rightTitle={data.education_type} />
      </View>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 13, marginTop: 24 }}>
        <ListItemWithRightTitle title={'Код специальности'} rightTitle={data.speciality_code} isDividerNeed />

        <ListItemWithRightTitle title={'Номер зачётной книжки'} rightTitle={data.record_book_number} isDividerNeed />
        <ListItemWithRightTitle title={'Средний балл'} rightTitle={data.grade_point_average} />
      </View>
    </Layout>
  )
}

export default PersonalInfo
