import { Text } from 'react-native'
import Layout from '../../../shared/ui/Layout'
import useStore from '../store/store'
import ListItemWithButton from './../../../shared/ui/ListItemWithButton'
import ListBox from './../../../shared/ui/ListBox'

const FilesList = () => {
  const { files, deleteFile } = useStore((state) => ({ files: state.files, deleteFile: state.deleteFile }))

  return files.length ? (
    <ListBox paddingHorizontal={0} paddingVertical={0} marginTop={16}>
      {files.map((file, index, arr) => (
        <ListItemWithButton
          title={file.name}
          buttonTitle="Отмена"
          key={file.key}
          onPress={() => {
            deleteFile(file.key)
          }}
          position={arr.length === 1 ? 'all' : index === 0 ? 'top' : index === arr.length - 1 ? 'bottom' : 'middle'}
        />
      ))}
    </ListBox>
  ) : null
}

export default FilesList
