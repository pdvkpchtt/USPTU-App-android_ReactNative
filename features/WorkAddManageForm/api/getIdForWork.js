import apiClient from './../../../shared/apiClient/index'

export default async function getIdForWork() {
  const data = await apiClient.post('', `idrazd=0`, {
    params: {
      obj: 'seq',
    },
  })

  return data.data[0]['ID']
}
