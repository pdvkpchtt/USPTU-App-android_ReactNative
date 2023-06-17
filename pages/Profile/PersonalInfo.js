import { useIsFocused } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useUserStore } from '../../entities/user'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithBottomTitle from '../../shared/ui/ListItemWithBottomTitle'
import ListItemWithBottomTitleAndLink from '../../shared/ui/ListItemWithBottomTitleAndLink'
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
    <Layout marginBottom={16}>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 12 }}>
        {data.qualification !== '' ? (
          <>
            <ListItemWithBottomTitleAndLink
              bottomTitle={'Группа'}
              title={data.study_group}
              position="top"
              onPress={() => {
                navigation.navigate('Смена группы')
              }}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Факультет'} title={capitalize(data.department)} isDividerNeed />
            <ListItemWithBottomTitle
              bottomTitle={'Курс, семестр'}
              title={`${data.year}, ${data.semester}`}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Форма'} title={capitalize(data.mode_of_study)} isDividerNeed />
            <ListItemWithBottomTitle bottomTitle={'Направление'} title={capitalize(data.education_type)} />
          </>
        ) : (
          <>
            <ListItemWithBottomTitleAndLink
              bottomTitle={'Группа'}
              title={data.study_group}
              position="top"
              onPress={() => {
                navigation.navigate('Смена группы')
              }}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Уровень образования'} title={data.level_of_education} />
          </>
        )}
      </View>

      {data.qualification !== '' ? (
        <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginVertical: 12 }}>
          <ListItemWithBottomTitle bottomTitle={'Код специальности'} title={data.speciality_code} isDividerNeed />
          <ListItemWithBottomTitle
            bottomTitle={'Номер зачётной книжки'}
            title={data.record_book_number}
            isDividerNeed
          />
          <ListItemWithBottomTitle bottomTitle={'Средний балл'} title={data.grade_point_average} />
        </View>
      ) : null}
    </Layout>
  )
}

export default PersonalInfo
