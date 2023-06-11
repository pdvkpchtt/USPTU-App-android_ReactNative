import apiClient from '../../../shared/apiClient'

export default async function getTypes() {
  const data = await apiClient.post('', `slov=rpd_slov_foscontrol`, {
    params: {
      obj: 'get_slov',
    },
  })

  return data.data
}
