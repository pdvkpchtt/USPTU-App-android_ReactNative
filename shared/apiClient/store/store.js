import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useTokenStore = create(
  persist(
    (set, get) => ({
      token: '',
      authError: false,
      isAuth: false,
      connectionError: false,
      updateToken: (token) => {
        set({ token: token })
      },
      setError: (error) => {
        set({ authError: error })
      },
      logout: () => {
        set({ token: '', isAuth: false })
      },
    }),
    {
      name: 'token-new',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useTokenStore
