import { Text, View } from 'react-native'
import Layout from '../../../shared/ui/Layout'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import ListItemWithDate from '../../../shared/ui/ListItemWithDate'
import useStore from '../store/store'
import ListBox from './../../../shared/ui/ListBox'
import ListItemWithRightTitle from './../../../shared/ui/ListItemWithRightTitle'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { useState } from 'react'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'
import moment from 'moment'
import Modal from 'react-native-modal'

LocaleConfig.locales['ru'] = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  today: 'Сегодня',
}
LocaleConfig.defaultLocale = 'ru'

const Form = ({ navigation }) => {
  const state = useStore()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  let myDate = moment(new Date()).format('YYYY-MM-DD')
  const [markedDateState, setMarkedDateState] = useState(myDate)
  const isTheme = useThemeStore((state) => state.theme)

  function renderCustomHeader(date) {
    const header = date.toString('MMMM yyyy')
    const [month, year] = header.split(' ')

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            marginLeft: 5,
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            paddingTop: 10,
            paddingBottom: 10,
            color: isTheme.includes('_dark') ? '#fff' : SwitchTheme(isTheme).checkIcon,
            paddingRight: 5,
          }}
        >{`${month}`}</Text>
        <Text
          style={{
            marginRight: 5,
            fontSize: 18,
            fontFamily: 'Roboto-Medium',
            paddingTop: 10,
            paddingBottom: 10,
            color: SwitchTheme(isTheme).checkIcon,
            paddingRight: 5,
          }}
        >
          {year}
        </Text>
      </View>
    )
  }

  return (
    <>
      <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={12}>
        <ListItemWithBottomTitleAndLink
          title={state?.discipline || 'Не выбрана'}
          header="Дисциплина"
          position="top"
          onPress={() => {
            navigation.navigate('Выбор дисциплины')
          }}
        />
        <ListItemWithBottomTitleAndLink
          title={state?.type || 'Не выбран'}
          header="Вид работы"
          position="bottom"
          onPress={() => {
            navigation.navigate('Выбор вида работы')
          }}
        />
      </ListBox>
      {state.discipline.length ? (
        <>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={16}>
            <ListItemWithBottomTitle bottomTitle="Группа" title={state?.group || 'Не выбрано'} isDividerNeed />
            <ListItemWithBottomTitle bottomTitle="Семестр" title={state?.semester || 'Не выбрано'} isDividerNeed />
            <ListItemWithBottomTitle bottomTitle="Форма проверки" title={state?.ranking || 'Не выбрано'} />
          </ListBox>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={16}>
            <ListItemWithBottomTitleAndLink
              title={state?.name || 'Не заполнено'}
              header="Название"
              position="all"
              onPress={() => {
                navigation.navigate('Правка', { value: 'name', setValue: 'setName', header: 'Название' })
              }}
            />
          </ListBox>

          <ListItemWithDate
            title="Дата"
            buttonTitle={state.date}
            onPress={() => {
              setDatePickerVisibility(true)
            }}
          />

          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={0}>
            <ListItemWithBottomTitleAndLink
              title={state?.review || 'Пусто'}
              header="Рецензия"
              position="top"
              onPress={() => {
                navigation.navigate('Правка', { value: 'review', setValue: 'setReview', header: 'Рецензия' })
              }}
            />
            <ListItemWithBottomTitleAndLink
              title={state?.extraInfo || 'Пусто'}
              header="Дополнительная информация"
              position="bottom"
              onPress={() => {
                navigation.navigate('Правка', {
                  value: 'extraInfo',
                  setValue: 'setExtraInfo',
                  header: 'Дополнительная информация',
                })
              }}
            />
          </ListBox>
        </>
      ) : null}
      <Modal
        isVisible={isDatePickerVisible}
        backdropOpacity={0.5}
        style={{
          justifyContent: 'flex-end',
          marginHorizontal: 10,
          marginBottom: 0,
          paddingTop: 50,
          // backgroundColor: 'red',
        }}
        backdropTransitionOutTiming={10}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onSwipeComplete={() => setDatePickerVisibility(false)}
        swipeDirection={['down']}
        onBackdropPress={() => setDatePickerVisibility(false)}
      >
        <Calendar
          style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
          onDayPress={(date) => {
            console.log(date)
            setMarkedDateState(date.dateString)
            setDatePickerVisibility(false)
            state.setDate(date.dateString)
            // loadWeekFromCalendar(date.dateString)
          }}
          renderHeader={renderCustomHeader}
          theme={{
            calendarBackground: SwitchTheme(isTheme).bgItem,
            textSectionTitleColor: isTheme.includes('theme_ftt_dark') ? '#fff' : SwitchTheme(isTheme).checkIcon,
            todayTextColor: SwitchTheme(isTheme).textMain,
            dayTextColor: SwitchTheme(isTheme).textMain,
            textDisabledColor: SwitchTheme(isTheme).textSec,
            arrowColor: isTheme.includes('theme_ftt_dark') ? '#fff' : SwitchTheme(isTheme).checkIcon,
          }}
          enableSwipeMonths
          firstDay={1}
          markingType={'period'}
          markedDates={{
            [markedDateState]: {
              startingDay: true,
              endingDay: true,
              customTextStyle: {
                color: !isTheme.includes('theme_ftt') ? SwitchTheme(isTheme).checkIcon : 'red',
                fontFamily: 'Roboto-Medium',
              },
            },
          }}
        />
      </Modal>
    </>
  )
}

export default Form
