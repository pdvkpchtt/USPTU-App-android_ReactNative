import axios from 'axios'
import CONSTANTS from '../../../config'

export default async function refreshToken(accessToken) {
  const data = await axios.post(CONSTANTS.API_URL, null, {
    params: {
      access_token: accessToken,
      obj: 'AccessTokenUpd',
    },
  })
  return data.data
}
