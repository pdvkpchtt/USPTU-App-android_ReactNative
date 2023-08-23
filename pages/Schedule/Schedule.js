import { useEffect, useState } from 'react'
import { Alert, Dimensions, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'
import ScheduleList from '../../features/ScheduleList'
import NoteIcon from '../../shared/ui/Icons/NoteIcon'
import TextBody from '../../shared/ui/Text/TextBody'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'
import { useScheduleStore } from '../../entities/schedule'
import DatePicerIcon from '../../shared/ui/Icons/DatePicerIcon'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import Modal from 'react-native-modal'
import moment from 'moment'

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

const Schedule = ({ route, navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  let myDate = moment(new Date()).format('YYYY-MM-DD')
  const [markedDateState, setMarkedDateState] = useState(myDate)

  const showingWeekNumber = useScheduleStore((state) => state.showingWeekNumber)
  const loadWeekFromCalendar = useScheduleStore((state) => state.loadWeekFromCalendar)
  const isTheme = useThemeStore((state) => state.theme)

  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    if (route.params?.filterToDate) {
      const navigateDate = moment(route.params.filterToDate, 'DD.MM.YYYY HH:mm')
      ////console.log('sdf', navigateDate)
      loadWeekFromCalendar(navigateDate)
    }
  }, [route])

  useEffect(() => {
    setDatePickerVisibility(false)
  }, [isTheme])

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

  useEffect(() => {
    navigation.setOptions({
      title: `${showingWeekNumber > 52 ? showingWeekNumber - 52 : showingWeekNumber} неделя`,
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('Новая заметка')
          }}
        >
          {({ pressed }) => {
            return <NoteIcon size="22px" pressed={pressed} />
          }}
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable onPress={showDatePicker}>
          {({ pressed }) => {
            return (
              <View>
                <DatePicerIcon pressed={pressed} />
              </View>
            )
          }}
        </Pressable>
      ),
    })
  }, [navigation, isTheme, showingWeekNumber])

  const widthborder = PixelRatio.roundToNearestPixel(0.5)

  return (
    <>
      {/* <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} /> */}
      <ScheduleList navigation={navigation} myFunc={(val) => setMarkedDateState(val)} />
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        cancelTextIOS="Отмена"
        confirmTextIOS="Перейти"
        buttonTextColorIOS={SwitchTheme(isTheme).textbutton1}
        // pickerContainerStyleIOS={{
        //   backgroundColor: SwitchTheme(isTheme).bgItem,
        // }}
        // pickerStyleIOS={{
        //   backgroundColor: SwitchTheme(isTheme).bgItem,
        // }}
      /> */}
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
            const dateForCalendar = moment(date.dateString + ' 00:01', 'YYYY-MM-DD HH:mm') // чтобы недели ровно считались
            ////console.log(dateForCalendar)
            loadWeekFromCalendar(dateForCalendar)
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
      {/* <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} /> */}
    </>
  )
}

export default Schedule
