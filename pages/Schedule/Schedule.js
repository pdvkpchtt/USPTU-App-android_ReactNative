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

const Schedule = ({ navigation }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showingWeekNumber = useScheduleStore((state) => state.showingWeekNumber)
  const loadWeekFromCalendar = useScheduleStore((state) => state.loadWeekFromCalendar)
  const isTheme = useThemeStore((state) => state.theme)

  const { width, height } = Dimensions.get('window')

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
      {/* <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} /> */}
    </>
  )
}

export default Schedule
