import apiClient from '../../../shared/apiClient/index'

export default async function sendStudentWork(id) {
  const data = await apiClient.post('', `d=svWORKSEND&id=${id}`, {
    params: {
      obj: 'StudWork',
    },
  })

  return data.data
}
