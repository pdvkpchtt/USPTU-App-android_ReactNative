import apiClient from '../../../shared/apiClient'

export default async function getAuditors(search) {
  const data = await apiClient.post('', `modul=get_auditors&param={"search":"${search ? search : ''}"}`, {
    params: {
      obj: 'rasp_out',
    },
  })

  return data.data
}
