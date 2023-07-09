import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'theme_usual',
      dataIdSelected: 0,
      isAuto: false,
      setTheme: (IsTheme, index) => {
        set({ theme: IsTheme, dataIdSelected: index })
        // console.log(IsTheme)
      },
      setSelected: (IdSelected) => {
        set({ dataIdSelected: IdSelected })
        // console.log(IdSelected)
      },
      setAuto: (autoState) => {
        set({ isAuto: autoState })
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useThemeStore
