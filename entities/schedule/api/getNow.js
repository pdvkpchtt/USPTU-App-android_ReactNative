import apiClient from '../../../shared/apiClient'

export default async function getNow() {
  const data = await apiClient.post('', `modul=get_now`, {
    params: {
      obj: 'rasp_out',
    },
  })

  ////console.log(data.data)

  return data?.data?.now?.[0].NUMWEEK
}
