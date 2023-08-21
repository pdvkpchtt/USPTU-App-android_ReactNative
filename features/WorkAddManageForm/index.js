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

const WorkAddManageForm = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)

  const { discipline, isShowSubmitForm, loadingFileName, isModalVisible } = useStore((state) => ({
    discipline: state.discipline,
    loadingFileName: state.loadingFileName,
    isShowSubmitForm: !!(state?.disciplineId && state.files.length && state?.typeId && state?.semester && state?.name),
    isModalVisible: state.isModalVisible,
  }))
  return (
    <>
      <Form navigation={navigation} route={route} />
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
