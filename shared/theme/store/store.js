import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'theme_usual',
      dataIdSelected: 0,
      setTheme: async (IsTheme) => {
        set({ theme: IsTheme })
        // console.log(IsTheme)
      },
      setSelected: (IdSelected) => {
        set({ dataIdSelected: IdSelected })
        // console.log(IdSelected)
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useThemeStore
