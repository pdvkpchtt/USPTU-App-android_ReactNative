import apiClient from '../../../shared/apiClient'

export default async function getDisciplines() {
  const data = await apiClient.post('', `asSlov=1`, {
    params: {
      obj: 'getsessi',
    },
  })

  return data.data
}
