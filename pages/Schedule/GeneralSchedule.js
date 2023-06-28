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

const GeneralSchedule = ({ navigation, route }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const showingWeekNumber = useGeneralScheduleStore((state) => state.showingWeekNumber)
  const loadWeekFromCalendar = useGeneralScheduleStore((state) => state.loadWeekFromCalendar)
  const isTheme = useThemeStore((state) => state.theme)
  const { width, height } = Dimensions.get('window')
  console.log(route.params)

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
                  <GeneralScheduleCalendarIcon />
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: 'Roboto-Bold',
                      color: isTheme.includes('theme_usual') ? SwitchTheme(isTheme).tabBarInactiveTintColor : '#fff',
                      lineHeight: 16,
                      textAlign: 'center',
                      width: 24,
                    }}
                  >
                    {`${showingWeekNumber}`}
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

      <GeneralScheduleList />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        cancelTextIOS="Отмена"
        confirmTextIOS="Перейти"
        buttonTextColorIOS={SwitchTheme(isTheme).textbutton1}
        // pickerContainerStyleIOS={{
        //   backgroundColor: 'white',
        // }}
        // pickerStyleIOS={{
        //   backgroundColor: 'white',
        // }}
      />
    </>
  )
}

export default GeneralSchedule
