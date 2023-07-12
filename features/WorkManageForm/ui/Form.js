import { Alert, View } from 'react-native'
import DefaultButton from '../../../shared/ui/defaultButton'
import SecondaryButton from '../../../shared/ui/secondaryButton'

const Form = ({ draftSend, workSend }) => {
  return (
    <View style={{ marginTop: 12, marginBottom: 12 }}>
      <SecondaryButton
        marginTop={0}
        onPress={draftSend}
        // onPress={async () => {
        //   const res = await deleteStudentWorkDraft(access_token, route.params.id)
        //   //console.log(res)
        //   navigation.goBack()
        // }}
      >
        Удалить черновик
      </SecondaryButton>
      <DefaultButton
        marginTop={12}
        onPress={() => {
          Alert.alert(
            'Отправка на проверку',
            'Вы уверены, что хотите отправить работу?\n\nПосле отправки редактировать работу будет невозможно',
            [
              {
                text: 'Нет',
                onPress: null,
                style: 'default',
              },
              {
                text: 'Да',
                onPress: workSend,
                // onPress: async () => {
                //   const res = await sendStudentWork(access_token, route.params.id)
                //   //console.log(res)
                //   navigation.goBack()
                // },
                style: 'default',
              },
            ],
            { cancelable: true }
          )
        }}
      >
        Отправить на проверку
      </DefaultButton>
    </View>
  )
}

export default Form
