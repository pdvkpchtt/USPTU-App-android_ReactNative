import { View } from 'react-native'
import Layout from '../../../shared/ui/Layout'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import ListItemWithDate from '../../../shared/ui/ListItemWithDate'
import useStore from '../store/store'
import ListBox from './../../../shared/ui/ListBox'
import ListItemWithRightTitle from './../../../shared/ui/ListItemWithRightTitle'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const Form = ({ navigation }) => {
  const state = useStore()

  return (
    <>
      <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
        <ListItemWithBottomTitleAndLink
          title={state?.discipline || 'Не выбрана'}
          bottomTitle="Дисциплина"
          position="top"
          onPress={() => {
            navigation.navigate('Выбор дисциплины')
          }}
        />
        <ListItemWithBottomTitleAndLink
          title={state?.type || 'Не выбран'}
          bottomTitle="Вид работы"
          position="bottom"
          onPress={() => {
            navigation.navigate('Выбор вида работы')
          }}
        />
      </ListBox>
      {state.discipline.length ? (
        <>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
            <ListItemWithRightTitle title="Группа" rightTitle={state?.group || 'Не выбрано'} isDividerNeed />
            <ListItemWithRightTitle title="Семестр" rightTitle={state?.semester || 'Не выбрано'} isDividerNeed />
            <ListItemWithRightTitle title="Форма проверки" rightTitle={state?.ranking || 'Не выбрано'} />
          </ListBox>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
            <ListItemWithBottomTitleAndLink
              title={state?.name || 'Не заполнено'}
              bottomTitle="Название работы"
              position="top"
              onPress={() => {
                navigation.navigate('Правка', { value: 'name', setValue: 'setName' })
              }}
            />
            <ListItemWithDate
              title="Дата"
              buttonTitle={state.date}
              onPress={() => {
                state.setIsShowCalendar(true)
              }}
            />
          </ListBox>
          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={24}>
            <ListItemWithBottomTitleAndLink
              title={state?.review || 'Не заполнено'}
              bottomTitle="Рецензия"
              position="top"
              onPress={() => {
                navigation.navigate('Правка', { value: 'review', setValue: 'setReview' })
              }}
            />
            <ListItemWithBottomTitleAndLink
              title={state?.extraInfo || 'Не заполнено'}
              bottomTitle="Дополнительная информация"
              position="bottom"
              onPress={() => {
                navigation.navigate('Правка', { value: 'extraInfo', setValue: 'setExtraInfo' })
              }}
            />
          </ListBox>
        </>
      ) : null}
      <DateTimePickerModal
        //  display="inline"
        locale="ru-RU"
        isVisible={state.isShowCalendar}
        mode="date"
        onConfirm={(selectedDate) => {
          state.setDate(selectedDate)
          state.setIsShowCalendar(false)
        }}
        onCancel={() => state.setIsShowCalendar(false)}
        cancelTextIOS="Отмена"
        confirmTextIOS="Задать"
        // minimumDate={minDate}
        // maximumDate={maxDate}
      />
    </>
  )
}

export default Form
