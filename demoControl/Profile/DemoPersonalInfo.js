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
import { personal } from '../demoData'

const PersonalInfo = ({ navigation, route }) => {
  const getCurrentData = useUserStore((state) => state.getCurrentData)
  const focused = useIsFocused()
  // const { previous_screen } = route.params
  const isTheme = useThemeStore((state) => state.theme)

  return (
    <Layout marginBottom={16}>
      <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginTop: 12 }}>
        {personal.qualification !== '' ? (
          <>
            <ListItemWithBottomTitleAndLink
              bottomTitle={'Группа'}
              title={personal.study_group}
              position="top"
              // onPress={() => {
              //   navigation.navigate('Смена группы')
              // }}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Факультет'} title={capitalize(personal.department)} isDividerNeed />
            <ListItemWithBottomTitle
              bottomTitle={'Курс, семестр'}
              title={`${personal.year}, ${personal.semester}`}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Форма'} title={capitalize(personal.mode_of_study)} isDividerNeed />
            <ListItemWithBottomTitle
              bottomTitle={'Направление'}
              title={capitalize(personal.education_type)}
              isDividerNeed
            />
            <ListItemWithBottomTitle
              bottomTitle={'Уровень образования'}
              title={personal.level_of_education}
              isDividerNeed
            />
            <ListItemWithBottomTitle bottomTitle={'Квалификация'} title={personal.qualification} />
          </>
        ) : (
          <>
            <ListItemWithBottomTitleAndLink
              bottomTitle={'Группа'}
              title={personal.study_group}
              position="top"
              // onPress={() => {
              //   navigation.navigate('Смена группы')
              // }}
            />
          </>
        )}
      </View>

      {personal.qualification !== '' ? (
        <View style={{ backgroundColor: SwitchTheme(isTheme).bgItem, borderRadius: 20, marginVertical: 12 }}>
          <ListItemWithBottomTitle bottomTitle={'Код специальности'} title={personal.speciality_code} isDividerNeed />
          <ListItemWithBottomTitle
            bottomTitle={'Номер зачётной книжки'}
            title={personal.record_book_number}
            isDividerNeed
          />
          <ListItemWithBottomTitle bottomTitle={'Средний балл'} title={personal.grade_point_average} />
        </View>
      ) : null}
    </Layout>
  )
}

export default PersonalInfo
