import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import Layout from '../../shared/ui/Layout'
import ListItemWithDate from '../../shared/ui/ListItemWithDate'
import ListItemWithSwitch from '../../shared/ui/ListItemWithSwitch'
import TextBody from '../../shared/ui/Text/TextBody'
import TextSmall from '../../shared/ui/Text/TextSmall'
import Modal from 'react-native-modal'
import moment from 'moment'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import CheckIcon from '../../shared/ui/Icons/CheckIcon'

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

const CreateNote = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)
  let myDate = moment(new Date()).format('YYYY-MM-DD')
  const [markedDateState, setMarkedDateState] = useState(myDate)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

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
      headerRight: () => (
        <Pressable>
          {({ pressed }) => {
            return <CheckIcon pressed={pressed} />
          }}
        </Pressable>
      ),
    })
  }, [navigation])

  return (
    <>
      <Layout>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            marginTop: 12,
            // marginHorizontal: 16,
          }}
        >
          <TextInput
            style={{
              // marginTop: 8,
              borderRadius: 20,
              fontSize: 17,
              fontFamily: 'Roboto-Regular',
              lineHeight: 22,
              textAlign: 'left',
              letterSpacing: -0.41,
              backgroundColor: SwitchTheme(isTheme).bgItem,
              color: SwitchTheme(isTheme).textMain,
              paddingHorizontal: 16,
              paddingVertical: 10,
              placeholder: 'Enter password',
            }}
            placeholderTextColor={SwitchTheme(isTheme).placeholderSearch}
            cursorColor={SwitchTheme(isTheme).placeholderSearch}
            selectionColor={SwitchTheme(isTheme).placeholderSearch}
            editable
            multiline
            placeholder="Содержимое заметки"
            // onChangeText={(value) => {
            //   setText(value)
            //   setValue(value.trim().replace(/\n/g, ' '))
            // }}
          />

          <View style={{ paddingHorizontal: 12 }}>
            <TextSmall color={SwitchTheme(isTheme).textOuterSec}>Не более 140 символов.</TextSmall>
          </View>
          <View style={{ borderRadius: 20, marginTop: 12 }}>
            <ListItemWithSwitch title="Весь день" />
            <ListItemWithDate
              title="Дата"
              buttonTitle={markedDateState}
              onPress={() => {
                setDatePickerVisibility(true)
              }}
            />
          </View>
        </View>
      </Layout>

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

export default CreateNote
