import Form from './ui/Form'
import useStore from './store/store'
import FilesUploadForm from './ui/FilesUploadForm'
import FilesList from './ui/FilesList'
import SubmitForm from './ui/SubmitForm'
import ListBox from '../../shared/ui/ListBox'
import { ActivityIndicator, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { LoadingBox } from './../../shared/ui/LoadingBox'
import TextBody from './../../shared/ui/Text/TextBody'

import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import { useState } from 'react'

const WorkAddManageForm = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const { discipline, isShowSubmitForm, loadingFileName, isModalVisible } = useStore((state) => ({
    discipline: state.discipline,
    loadingFileName: state.loadingFileName,
    isShowSubmitForm: !!(state?.disciplineId && state.files.length && state?.typeId && state?.semester && state?.name),
    isModalVisible: state.isModalVisible,
  }))

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

  return (
    <>
      <Form navigation={navigation} route={route} setHasUnsavedChanges={setHasUnsavedChanges} />
      <FilesList />
      {discipline && <FilesUploadForm />}
      {isShowSubmitForm ? <SubmitForm navigation={navigation} /> : null}
      <Modal isVisible={isModalVisible}>
        <ListBox>
          <ActivityIndicator size="large" color={SwitchTheme(isTheme).colorIndicator} />
          <TextBody marginTop={12}>
            {loadingFileName.length ? `Загружается файл ${loadingFileName}` : 'Загружаются файлы'}
          </TextBody>
        </ListBox>
      </Modal>
    </>
  )
}

export default WorkAddManageForm
export { useStore as useWorkAddStore }
