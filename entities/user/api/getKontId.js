import CONSTANTS from '../../../config'
import apiClient from '../../../shared/apiClient/index'

export default async function getKontId() {
  const data = await apiClient.post('', null, {
    params: {
      obj: 'get_kont_id',
    },
  })
  ////console.log(data)
  return data.data
}
