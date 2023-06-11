import apiClient from './../../../shared/apiClient/index'

export default async function uploadStudentWork(id, file) {
  const data = await apiClient.post(
    'https://ams.rusoil.net/pcs/SFile',
    `val1=${id}&param2=StudWork&fn=${file.name}&file_Base64Blob=${encodeURIComponent(file.base64)}`
  )

  return data.data
}
