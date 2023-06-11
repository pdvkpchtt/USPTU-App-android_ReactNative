import apiClient from '../../../shared/apiClient'
import CONSTANTS from './../../../config'

export default async function deleteStudentWorkDraft(id) {
  const data = await apiClient.post(CONSTANTS.API_URL, `d=dl&id=${id}`, {
    params: {
      obj: 'StudWork',
    },
  })

  return data.data
}
