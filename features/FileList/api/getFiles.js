import apiClient from '../../../shared/apiClient'

export default async function getFiles(id, obj) {
  const data = await apiClient.post('https://ams.rusoil.net/pcs/GetFL', `id=${id}&obj=${obj}&json=y`)

  return data.data
}
