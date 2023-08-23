import { useEffect, useState } from 'react'
import { Alert, Dimensions, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'
import ScheduleList from '../../features/ScheduleList'
import NoteIcon from '../../shared/ui/Icons/NoteIcon'
import TextBody from '../../shared/ui/Text/TextBody'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'
import { useScheduleStore } from '../../entities/schedule'
import { useGeneralScheduleStore } from '../../entities/generalSchedule'
import GeneralScheduleList from '../../features/GeneralScheduleList'
import Layout from '../../shared/ui/Layout'
import { GeneralScheduleCalendarIcon } from '../../shared/ui/Icons/GeneralScheduleCalendarIcon'
import Modal from 'react-native-modal'
import moment from 'moment'
import { Calendar, LocaleConfig } from 'react-native-calendars'

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

const GeneralSchedule = ({ navigation, route }) => {
  let myDate = moment(new Date()).format('YYYY-MM-DD')
  const [markedDateState, setMarkedDateState] = useState(myDate)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const showingWeekNumber = useGeneralScheduleStore((state) => state.showingWeekNumber)
  const loadWeekFromCalendar = useGeneralScheduleStore((state) => state.loadWeekFromCalendar)
  const isTheme = useThemeStore((state) => state.theme)
  const { width, height } = Dimensions.get('window')
  ////console.log(route.params)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    ////console.log('A date: ', date)
    loadWeekFromCalendar(date)
    hideDatePicker()
  }

  const validatePrepodName = (name) => {
    if (route.params.is_prepod) {
      let fio = name.split(' ')
      if (fio.length === 3) {
        fio = fio[0] + ' ' + fio[1][0] + '. ' + fio[2][0] + '.'
        return fio
      }
    }
    return name
  }

  useEffect(() => {
    navigation.setOptions({
      title: validatePrepodName(route.params.title),
      headerRight: () => (
        <Pressable onPress={showDatePicker}>
          {({ pressed }) => {
            return (
              <>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <GeneralScheduleCalendarIcon pressed={pressed} />
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Roboto-Medium',
                      color: pressed
                        ? isTheme == 'theme_usual' || isTheme.includes('_dark') || isTheme == 'theme_ftt'
                          ? '#B0B0B0'
                          : '#e4e4e4'
                        : isTheme.includes('theme_usual')
                        ? isTheme.includes('_dark')
                          ? '#dddddd'
                          : '#5F5F5F'
                        : '#fff',
                      lineHeight: 16,
                      textAlign: 'center',
                      width: 24,
                    }}
                  >
                    {`${showingWeekNumber > 52 ? showingWeekNumber - 52 : showingWeekNumber}`}
                  </Text>
                </View>
              </>
            )
          }}
        </Pressable>
      ),
    })
  }, [navigation, isTheme, showingWeekNumber])

  const widthborder = PixelRatio.roundToNearestPixel(0.5)

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
      <View
        style={{
          position: 'absolute',
          height: height,
          width,
          bottom: 0,
          top: -70,
          right: 0,
          left: 0,
          zIndex: -1,
          lineHeight: 0,
          // borderTopColor: 'red',
          // borderTopWidth: 2,
          backgroundColor: SwitchTheme(isTheme).bgFon,
        }}
      >
        {SwitchTheme(isTheme).fonImage}
      </View>

      <GeneralScheduleList myFunc={(val) => setMarkedDateState(val)} />

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
            ////console.log(date)
            setMarkedDateState(date.dateString)
            setDatePickerVisibility(false)
            loadWeekFromCalendar(date.dateString)
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

export default GeneralSchedule
