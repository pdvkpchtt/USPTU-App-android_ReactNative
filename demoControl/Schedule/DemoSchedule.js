import { useEffect, useState } from 'react'
import { Alert, Dimensions, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native'
import ScheduleList from '../../features/ScheduleList'
import NoteIcon from '../../shared/ui/Icons/NoteIcon'
import TextBody from '../../shared/ui/Text/TextBody'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import useThemeStore from '../../shared/theme/store/store'
import { useScheduleStore } from '../../entities/schedule'
import DemoSheduleList from '../../demoControl/DemoSheduleList'
import useDemoStore from '../../demoControl/store'

const DemoSchedule = ({ navigation }) => {
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
      title: `1 неделя`,
    })
  }, [navigation, isTheme, showingWeekNumber])

  const widthborder = PixelRatio.roundToNearestPixel(0.5)
  // фзц
  return (
    <>
      <View style={{ backgroundColor: SwitchTheme(isTheme).colorlineBottomNav, height: widthborder }} />
      <DemoSheduleList />
    </>
  )
}

export default DemoSchedule
