import apiClient from '../../../shared/apiClient'

export default async function getGroups(search) {
  const data = await apiClient.post('', `modul=get_groups&param={"id_fak":0, "search":"${search ? search : ''}"}`, {
    params: {
      obj: 'rasp_out',
    },
  })

  return data.data
}
