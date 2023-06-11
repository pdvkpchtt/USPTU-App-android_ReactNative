import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { useUserStore } from '../../entities/user'
import getFiles from './api/getFiles'
import getMessages from './api/getFiles'
import List from './ui/List'
import validateFiles from './utils/validateFiles'

const FileList = ({ navigation, route }) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const getData = async () => {
    const data = validateFiles(await getFiles(route.params.id, 'DISC_DO'))
    setFiles(data)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  return <List items={files} navigation={navigation} refreshing={loading} />
}

export default FileList
