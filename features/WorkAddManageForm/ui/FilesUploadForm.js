import { Alert, Text } from 'react-native'
import SecondaryButton from './../../../shared/ui/secondaryButton'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import useStore from '../store/store'
import formatBytes from './../../../shared/utils/formatBytes'
import * as mime from 'mime'
import useThemeStore from '../../../shared/theme/store/store'
import SwitchTheme from '../../../shared/theme/SwitchTheme'

const FilesUploadForm = ({ navigation }) => {
  const isTheme = useThemeStore((state) => state.theme)

  const { files, addFile } = useStore((state) => ({ files: state.files, addFile: state.addFile }))

  const addFileFromStorage = async () => {
    const response = await DocumentPicker.getDocumentAsync({
      base64: true,
      copyToCacheDirectory: true,
      type: '*/*',
    })
    const fileInfo = await FileSystem.getInfoAsync(response.uri)
    const size = fileInfo.size / Math.pow(1024, 2)

    if (size <= 50) {
      const chunks = fileInfo.uri.split('/')
      try {
        const fileBase64 = await FileSystem.readAsStringAsync(response.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })
        const exists = files.find((file) => file.base64 === fileBase64)
        if (!exists) {
          const file = {
            name: response.name,
            base64: fileBase64,
            mimeType: response.mimeType,
            size: formatBytes(fileInfo.size),
            key: uuidv4(),
          }
          addFile(file)
        } else {
          Alert.alert('Ошибка добавления файла', `Файл с таким именем (${response.name}) уже добавлен`)
        }
      } catch (e) {
        Alert.alert('Ошибка добавления файла', `Файл (${response.name}) не поддерживается`)
      }
    } else {
      Alert.alert('Ошибка добавления файла', `Размер файла (${response.name}) превышает лимит`)
    }
  }

  const addImageFromStorage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        quality: 1,
      })

      // //console.log(response)
      for (let asset of response.assets) {
        const fileInfo = await FileSystem.getInfoAsync(asset.uri)
        const size = fileInfo.size / Math.pow(1024, 2)

        if (size <= 50) {
          const chunks = asset.uri.split('/')
          const fileName = decodeURI(chunks[chunks.length - 1])
          const exists = files.find((file) => file.base64 === asset.base64)
          if (!exists) {
            const file = {
              name: fileName,
              base64: asset.base64,
              mimeType: mime.getType(fileName),
              size: formatBytes(fileInfo.size),
              key: uuidv4(),
            }
            // //console.log(file.name + file.mimeType)
            addFile(file)
          } else {
            Alert.alert('Ошибка добавления файла', `Данный файл уже добавлен`)
          }
        } else {
          Alert.alert('Ошибка добавления файла', `Размер файла (${fileName}) более 50 МБ`)
        }
      }
    } catch (e) {
      Alert.alert('Ошибка добавления файла', `Файл не поддерживается`)
    }
  }

  return (
    <>
      <SecondaryButton marginTop={16} onPress={addFileFromStorage}>
        Добавить файл
      </SecondaryButton>
      <SecondaryButton marginTop={8} marginBottom={8} onPress={addImageFromStorage}>
        Добавить изображение
      </SecondaryButton>
      <Text
        style={{
          marginBottom: 16,
          fontFamily: 'Roboto',
          fontSize: 12,
          lineHeight: 16,
          color: SwitchTheme(isTheme).textOuterSec,
          paddingHorizontal: 12,
        }}
      >
        Размер файла не более 8 МБ.
      </Text>
    </>
  )
}

export default FilesUploadForm
