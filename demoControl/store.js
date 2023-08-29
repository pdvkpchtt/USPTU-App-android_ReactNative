import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useDemoStore = create(
  persist(
    (set, get) => ({
      demo: false,
      setDemo: async (demoMode) => {
        set({ demo: demoMode })
      },
    }),
    {
      name: 'demo',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useDemoStore
