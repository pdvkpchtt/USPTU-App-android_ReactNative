import apiClient from '../../../shared/apiClient'

export default async function getPrepods(search) {
  const data = await apiClient.post('', `modul=get_prepod&param={"id_kaf":0, "search":"${search ? search : ''}"}`, {
    params: {
      obj: 'rasp_out',
    },
  })

  return data.data
}
