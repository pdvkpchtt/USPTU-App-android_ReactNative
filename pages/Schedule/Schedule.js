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

const Schedule = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showingWeekNumber = useScheduleStore((state) => state.showingWeekNumber)
  const loadWeekFromCalendar = useScheduleStore((state) => state.loadWeekFromCalendar)
  const isTheme = useThemeStore((state) => state.theme)

  const { width, height } = Dimensions.get('window')

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
    console.log('A date: ', date)
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
            color: SwitchTheme(isTheme).checkIcon,
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
      title: `${showingWeekNumber} неделя`,
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate('Новая заметка')
          }}
        >
          {({ pressed }) => {
            return <NoteIcon size="22px" color={SwitchTheme(isTheme).textHeaderButton} />
          }}
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable onPress={showDatePicker}>
          {({ pressed }) => {
            return (
              <View>
                <DatePicerIcon />
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
      <ScheduleList navigation={navigation} />
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
            console.log(date)
            setDatePickerVisibility(false)
            loadWeekFromCalendar(date.dateString)
          }}
          renderHeader={renderCustomHeader}
          theme={{
            calendarBackground: SwitchTheme(isTheme).bgItem,
            textSectionTitleColor: SwitchTheme(isTheme).checkIcon,
            todayTextColor: SwitchTheme(isTheme).textMain,
            dayTextColor: SwitchTheme(isTheme).textMain,
            textDisabledColor: SwitchTheme(isTheme).textSec,
            arrowColor: SwitchTheme(isTheme).checkIcon,
          }}
          enableSwipeMonths
          firstDay={1}
        />
      </Modal>
      {/* <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} /> */}
    </>
  )
}

export default Schedule
