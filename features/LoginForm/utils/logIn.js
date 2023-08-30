import getRandomString from '../../../shared/utils/getRandomString'
import moment from 'moment'
import * as Device from 'expo-device'
import encrypt from '../../../shared/utils/encrypt'
import CONSTANTS from '../../../config'
import axios from 'axios'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
export const logIn = async (savePar, deviceId, validateAccessToken) => {
  let par = getRandomString(16) // пока заглушка
  savePar(par)
  //dispatch(savePar({ par: par }));

  par += '|' + getRandomString(16) + '|' + moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  par += '|' + deviceId + ' ' + Device.deviceName
  console.warn(par)
  par = par.replace('/', '').replace('.', '').replace(':', '')

  par = await encrypt(par, CONSTANTS.API_KEY)
  console.warn(CONSTANTS.OAUTH_URL + '&par=' + par)
  // const isAvailableServer = await axios.get('https://ams.rusoil.net/pcs/')
  // if (isAvailableServer?.status === 200) {
  //   const result = await WebBrowser.openAuthSessionAsync(CONSTANTS.OAUTH_URL + '&par=' + par)
  //   if (result?.url) {
  //     const token = result.url.split('access_token:')[1]
  //     validateAccessToken(token)
  //   }
  // }

  await Linking.openURL(CONSTANTS.OAUTH_URL + '&par=' + par)
}
