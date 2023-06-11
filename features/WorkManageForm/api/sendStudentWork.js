import axios from 'axios'
import CONSTANTS from '../../../config'
import { useUserStore } from '../../../entities/user'

export default async function sendStudentWork(id) {
  const accessToken = useUserStore((state) => state.access_token)
  const data = await axios.post(CONSTANTS.API_URL, `d=svWORKSEND&id=${id}`, {
    params: {
      access_token: accessToken,
      obj: 'StudWork',
    },
  })

  return data.data
}
