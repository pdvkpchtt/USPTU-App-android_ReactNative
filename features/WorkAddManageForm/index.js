import Form from './ui/Form'
import useStore from './store/store'
import FilesUploadForm from './ui/FilesUploadForm'
import FilesList from './ui/FilesList'
import SubmitForm from './ui/SubmitForm'
import ListBox from '../../shared/ui/ListBox'
import { ActivityIndicator, View, Text, Pressable, Modal as MyModal } from 'react-native'
import Modal from 'react-native-modal'
import { LoadingBox } from './../../shared/ui/LoadingBox'
import TextBody from './../../shared/ui/Text/TextBody'
import useThemeStore from '../../shared/theme/store/store'
import SwitchTheme from '../../shared/theme/SwitchTheme'
import { useState, useEffect } from 'react'

const WorkAddManageForm = ({ navigation, route }) => {
  const isTheme = useThemeStore((state) => state.theme)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [ev, setEv] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

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
    </>
  )
}

export default WorkAddManageForm
export { useStore as useWorkAddStore }
