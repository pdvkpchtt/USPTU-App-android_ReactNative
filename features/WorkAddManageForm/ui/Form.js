import { View } from 'react-native'
import Layout from '../../../shared/ui/Layout'
import ListItemWithBottomTitleAndLink from '../../../shared/ui/ListItemWithBottomTitleAndLink'
import ListItemWithButton from '../../../shared/ui/ListItemWithButton'
import ListItemWithDate from '../../../shared/ui/ListItemWithDate'
import useStore from '../store/store'
import ListBox from './../../../shared/ui/ListBox'
import ListItemWithRightTitle from './../../../shared/ui/ListItemWithRightTitle'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import ListItemWithBottomTitle from '../../../shared/ui/ListItemWithBottomTitle'

const Form = ({ navigation }) => {
  const state = useStore()

  return (
    <>
      <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={12}>
        <ListItemWithBottomTitleAndLink
          title={state?.discipline || 'Не выбрана'}
          header="Дисциплина"
          position="top"
          onPress={() => {
            navigation.navigate('Выбор дисциплины')
          }}
        />
        <ListItemWithBottomTitleAndLink
          title={state?.type || 'Не выбран'}
          header="Вид работы"
          position="bottom"
          onPress={() => {
            navigation.navigate('Выбор вида работы')
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
                navigation.navigate('Правка', { value: 'name', setValue: 'setName' })
              }}
            />
          </ListBox>

          <ListItemWithDate
            title="Дата"
            buttonTitle={state.date}
            onPress={() => {
              state.setIsShowCalendar(true)
            }}
          />

          <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={0}>
            <ListItemWithBottomTitleAndLink
              title={state?.review || 'Пусто'}
              header="Рецензия"
              position="top"
              onPress={() => {
                navigation.navigate('Правка', { value: 'review', setValue: 'setReview' })
              }}
            />
            <ListItemWithBottomTitleAndLink
              title={state?.extraInfo || 'Пусто'}
              header="Дополнительная информация"
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
