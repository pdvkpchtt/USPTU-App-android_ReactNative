const uploadFiles = async () => {
  let uploadStatus = {
    status: 'success',
  }
  for (let file of files) {
    const res = await uploadStudentWork(access_token, id, file)
    if (res?.status === 'error') {
      setFiles(files.filter((item) => item.key !== file.key))
      setModalVisible(false)
      setLoading(false)
      // Alert.alert(`Файл с таким расширения не поддерживается(${file})`, [{ text: 'OK', onPress: null }])
      uploadStatus.status = 'error'
      uploadStatus.file = file.name
      break
    }
    setLoadingFile(file.name)
  }
  return uploadStatus
}
