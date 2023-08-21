import { Alert, Text, View, Modal as MyModal, Pressable } from 'react-native'
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
import { useEffect, useState } from 'react'
import SwitchTheme from '../../../shared/theme/SwitchTheme'
import useThemeStore from '../../../shared/theme/store/store'
import moment from 'moment'
import Modal from 'react-native-modal'
import TextHead from '../../../shared/ui/Text/TextHead'

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

const Form = ({ navigation, route }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [ev, setEv] = useState(null)
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault()
        setEv(e)

        setModalVisible(true)
        // Prompt the user before leaving the screen
        // Alert.alert('Отменить изменения?', 'У вас есть несохраненный черновик работы. Вы действительно хотите выйти?', [
        //   { text: 'Нет', style: 'cancel', onPress: () => {} },
        //   {
        //     text: 'Да',
        //     style: 'destructive',
        //     // If the user confirmed, then we dispatch the action we blocked earlier
        //     // This will continue the action that had triggered the removal of the screen
        //     onPress: () => navigation.dispatch(e.data.action),
        //   },
        // ])
      }),
    [navigation, hasUnsavedChanges]
  )

  const state = useStore()

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  let myDate = moment(new Date()).format('YYYY-MM-DD')
  const [markedDateState, setMarkedDateState] = useState(myDate)
  const isTheme = useThemeStore((state) => state.theme)
  const [modalVisible, setModalVisible] = useState(false)

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
      <MyModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            padding: 8,
            backgroundColor: 'rgba(0,0,0,0.35)',
          }}
        >
          <View
            style={{
              backgroundColor: SwitchTheme(isTheme).bgItem,
              width: '100%',
              maxWidth: 340,
              elevation: 24,
              borderRadius: 2,
              padding: 24,
            }}
          >
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                color: SwitchTheme(isTheme).textMain,
                fontSize: 21,
                marginBottom: 12,
              }}
            >
              Отменить изменения?
            </Text>
            <Text style={{ fontFamily: 'Roboto-Regular', color: SwitchTheme(isTheme).textMain, fontSize: 16 }}>
              У вас есть несохраненный черновик работы. Вы действительно хотите выйти?
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 12,
              }}
            >
              <Pressable
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      color: pressed
                        ? isTheme.includes('theme_usual')
                          ? SwitchTheme(isTheme).hoverBlue
                          : SwitchTheme(isTheme).hoverEffect
                        : SwitchTheme(isTheme).checkIcon,
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginRight: 40,
                    }}
                  >
                    НЕТ
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.dispatch(ev.data.action)
                  setModalVisible(false)
                }}
              >
                {({ pressed }) => (
                  <Text
                    style={{
                      color: pressed
                        ? isTheme.includes('theme_usual')
                          ? SwitchTheme(isTheme).hoverBlue
                          : SwitchTheme(isTheme).hoverEffect
                        : SwitchTheme(isTheme).checkIcon,
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      marginRight: 8,
                    }}
                  >
                    ДА
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </MyModal>

      <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={12}>
        <ListItemWithBottomTitleAndLink
          title={state?.discipline || 'Не выбрана'}
          header="Дисциплина"
          position="top"
          onPress={() => {
            navigation.navigate('Выбор дисциплины', { setChanges: () => setHasUnsavedChanges(true) })
          }}
        />
        <ListItemWithBottomTitleAndLink
          title={state?.type || 'Не выбран'}
          header="Вид работы"
          position="bottom"
          onPress={() => {
            navigation.navigate('Выбор вида работы', { setChanges: () => setHasUnsavedChanges(true) })
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
