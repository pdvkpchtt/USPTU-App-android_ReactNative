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
import { useNotesStore } from '../../entities/notes'
import { useUserStore } from '../../entities/user'
import SecondaryButton from '../../shared/ui/secondaryButton'
import Svg, { G, Path, Rect, Defs, ClipPath } from 'react-native-svg'

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

const EditNote = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [markedDateState, setMarkedDateState] = useState(
    new Date(
      `${route.params.item.date.split('.')[2]}-${route.params.item.date.split('.')[1]}-${
        route.params.item.date.split('.')[0]
      }`
    )
  )
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const editNoteToStore = useNotesStore((state) => state.editNote)
  const deleteNoteToStore = useNotesStore((state) => state.removeNote)
  const notes = useNotesStore((state) => state.notes)
  const { getStudyGroup } = useUserStore((state) => ({
    getStudyGroup: state.getStudyGroup,
  }))

  const [text, setText] = useState(route.params.item.text)
  const [value, setValue] = useState(route.params.item.text)
  console.log(text, value)
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

  const saveNote = () => {
    // if (text.length < 3) {
    //   return
    // }
    const group = getStudyGroup()

    editNoteToStore(route.params.item.key, text, moment(markedDateState).format('DD.MM.YYYY'), group)
    navigation.navigate('Индивидуальное расписание', {
      filterToDate: moment(markedDateState).format('DD.MM.YYYY 00:01'),
    })
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={value.length > 0 ? saveNote : () => {}}>
          {({ pressed }) => {
            return (
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M8.80001 15.905L5.30001 12.405C4.91001 12.015 4.29001 12.015 3.90001 12.405C3.51001 12.795 3.51001 13.415 3.90001 13.805L8.09001 17.995C8.48001 18.385 9.11001 18.385 9.50001 17.995L20.1 7.40502C20.49 7.01502 20.49 6.39502 20.1 6.00502C19.71 5.61502 19.09 5.61502 18.7 6.00502L8.80001 15.905Z"
                  fill={
                    value.length < 1
                      ? isTheme.includes('theme_usual')
                        ? isTheme.includes('_dark')
                          ? SwitchTheme(isTheme).placeholderSearch
                          : '#b0b0b0'
                        : isTheme.includes('_dark')
                        ? SwitchTheme(isTheme).placeholderSearch
                        : SwitchTheme(isTheme).placeholderTextLight
                      : /////////////////////////
                      isTheme.includes('theme_usual')
                      ? pressed
                        ? SwitchTheme(isTheme).hoverBlue
                        : SwitchTheme(isTheme).checkIcon
                      : !isTheme.includes('_dark')
                      ? pressed
                        ? '#dddddd'
                        : '#fff'
                      : pressed
                      ? isTheme == 'theme_ftt_dark'
                        ? '#dddddd'
                        : SwitchTheme(isTheme).hoverEffect
                      : isTheme == 'theme_ftt_dark'
                      ? '#fff'
                      : SwitchTheme(isTheme).checkIcon
                  }
                />
              </Svg>
            )
          }}
        </Pressable>
      ),
    })
  }, [navigation, markedDateState, text, value, isTheme])

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
            value={value}
            placeholder="Содержимое заметки"
            onChangeText={(value) => {
              setValue(value)
              setText(value.trim().replace(/\n/g, ' '))
            }}
          />

          <View style={{ paddingHorizontal: 12 }}>
            <TextSmall color={SwitchTheme(isTheme).textOuterSec}>Не более 140 символов.</TextSmall>
          </View>
          <View style={{ borderRadius: 20, marginTop: 0 }}>
            {/* <ListItemWithSwitch title="Весь день" /> */}
            <ListItemWithDate
              title="Дата"
              buttonTitle={moment(markedDateState).format('DD.MM.YYYY')}
              onPress={() => {
                setDatePickerVisibility(true)
              }}
            />
          </View>

          <SecondaryButton
            color={SwitchTheme(isTheme).textButtonExit}
            marginTop={12}
            marginBottom={12}
            onPress={() => {
              deleteNoteToStore(route.params.item.key)
              navigation.navigate('Индивидуальное расписание', {
                filterToDate: moment(markedDateState).format('DD.MM.YYYY 00:01'),
              })
            }}
          >
            Удалить
          </SecondaryButton>
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
            setMarkedDateState(moment(date.dateString).toDate())
            //  setMarkedDateState(moment(date.timestamp).toDate())
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
            [moment(markedDateState).format('YYYY-MM-DD')]: {
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

export default EditNote
