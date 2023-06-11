import { useEffect, useState } from 'react'
import useTokenStore from '../../shared/apiClient/store/store'
import { LoadingBox } from '../../shared/ui/LoadingBox'
import getFilesToDownload from './api/getFilesToDownload'
import List from './ui/List'

const WorkFiles = ({ id }) => {
  const [files, setFiles] = useState([])
  const accessToken = useTokenStore((state) => state.token)

  const uploadFiles = async () => {
    setFiles(await getFilesToDownload(id, 'StudWork'))
  }

  useEffect(() => {
    uploadFiles()
  }, [])

  return <>{files.length ? <List files={files} accessToken={accessToken} /> : <LoadingBox />}</>
}

export default WorkFiles
