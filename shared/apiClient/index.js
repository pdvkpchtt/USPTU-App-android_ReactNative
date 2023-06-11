import axios from 'axios'
import CONSTANTS from './../../config'
import refreshToken from './api/refreshToken'
import useTokenStore from './store/store'
import Toast from 'react-native-toast-message'

const apiClient = axios.create({
  baseURL: CONSTANTS.API_URL,
})

apiClient.interceptors.request.use((config) => {
  const accessToken = useTokenStore.getState().token
  config.params = { ...config.params, access_token: accessToken }
  config.body = { ...config.body, access_token: accessToken }
  return config
})

apiClient.interceptors.response.use(
  async (response) => {
    if (!response.config._isRetry && typeof response.data === 'Object' && 'Mess' in response.data) {
      try {
        const accessToken = useTokenStore.getState().token
        const token = await refreshToken(accessToken)
        if (token !== 'Error') {
          updateToken(token)
          const originalRequest = response.config
          originalRequest._isRetry = true
          return apiClient.request(originalRequest)
        } else {
          useTokenStore.setState({ isAuth: false })
        }
      } catch (error) {
        // console.log(JSON.stringify(error))
      }
    }
    return response
  },
  async (error) => {
    useTokenStore.setState({ connectionError: true })
    Toast.show({
      type: 'custom',
      text1: 'Не удалось подключиться к серверу. Проверьте интернет-соединение',
    })
    // const originalRequest = error.config
    // if (error.response.status == 401 && error.config && !error.config._isRetry) {
    //   originalRequest._isRetry = true
    //   try {
    //     const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })
    //     localStorage.setItem('token', response.data.accessToken)
    //     return $api.request(originalRequest)
    //   } catch (e) {
    //     console.log('НЕ АВТОРИЗОВАН')
    //   }
    // }
    //throw error
  }
)

export default apiClient
export const updateToken = (token) => {
  useTokenStore.setState({ token: token })
}
