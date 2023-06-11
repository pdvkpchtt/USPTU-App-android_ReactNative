import { Alert } from 'react-native'
import DefaultButton from '../../../shared/ui/defaultButton'
import SecondaryButton from '../../../shared/ui/secondaryButton'
import addStudentWorkDescription from '../api/addStudentWorkDescription'
import sendStudentWork from '../api/sendStudentWork'
import uploadStudentWork from '../api/uploadStudentWork'
import useStore from '../store/store'

const SubmitForm = ({ navigation }) => {
  const { files, deleteFile, getId, id } = useStore((state) => ({
    files: state.files,
    deleteFile: state.deleteFile,
    getId: state.getId,
    id: state.id,
  }))

  const uploadFiles = async () => {
    let uploadStatus = {
      status: 'success',
    }
    for (let file of files) {
      const res = await uploadStudentWork(await getId(), file)
      // console.log(res)
      if (res?.status === 'error') {
        deleteFile(file.key)
        useStore.setState({ isModalVisible: false, loading: false })
        // Alert.alert(`Файл с таким расширения не поддерживается(${file})`, [{ text: 'OK', onPress: null }])
        uploadStatus.status = 'error'
        uploadStatus.file = file.name
        break
      }
      useStore.setState({ loadingFileName: file.name })
    }
    return uploadStatus
  }

  const saveDraft = async (isNeedGoBack = true) => {
    let error = false
    useStore.setState({ isModalVisible: true, loading: true })
    // setHasUnsavedChanges(false)
    const uploadStatus = await uploadFiles()
    // console.log(uploadStatus)
    if (uploadStatus.status == 'success') {
      const res = await addStudentWorkDescription(useStore.getState())
      useStore.setState({ isModalVisible: false })
      if (isNeedGoBack) {
        navigation.goBack()
      }
    } else {
      Alert.alert(
        'Ошибка загрузки файла',
        `Файл (${uploadStatus.file}) с таким расширением или размером не поддерживается`
      )
      error = true
    }
    return error
  }

  const sendWork = async () => {
    const error = await saveDraft(false)
    if (!error) {
      const res = await sendStudentWork(useStore.getState().id)
      console.log(res)

      navigation.goBack()
    }
  }

  return (
    <>
      <SecondaryButton marginTop={24} onPress={saveDraft}>
        Сохранить как черновик
      </SecondaryButton>
      <DefaultButton
        marginTop={12}
        onPress={() => {
          Alert.alert(
            'Отправка на проверку',
            'Вы уверены, что хотите отправить работу? \nПосле отправки редактировать работу будет невозможно',
            [
              {
                text: 'Нет',
                onPress: null,
                style: 'default',
              },
              {
                text: 'Да',
                onPress: sendWork,
                style: 'default',
              },
            ],
            { cancelable: true }
          )
        }}
      >
        Отправить на проверку
      </DefaultButton>
    </>
  )
}

export default SubmitForm
