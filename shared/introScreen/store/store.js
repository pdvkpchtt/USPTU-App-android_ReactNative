import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useIntroStore = create(
  persist(
    (set, get) => ({
      showIntro: true,
      setShowIntro: (action, index) => {
        set({ showIntro: action })
      },
    }),
    {
      name: 'intro',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useIntroStore
