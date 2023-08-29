import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import getGrades from '../api/getGrades'
import filterGrades from '../utils/filterGrades'

const useStore = create(
  persist(
    (set, get) => ({
      grades: [],
      gradesForShow: [],
      gradesBySemesters: [],
      refreshing: true,
      filtering: false,
      getGrades: async (filter, group) => {
        set({ refreshing: true })
        const data = await getGrades()
        const { rawData, filteredDataBySemesters } = filterGrades(data, filter, group)
        set({ grades: data, gradesForShow: rawData, gradesBySemesters: filteredDataBySemesters })
        setTimeout(() => set({ refreshing: false }), 200)
      },

      filterGrades: (filter, group) => {
        set({ filtering: true })
        const { rawData, filteredDataBySemesters } = filterGrades(get().grades, filter, group)
        set({ gradesForShow: rawData, gradesBySemesters: filteredDataBySemesters })
        setTimeout(() => set({ filtering: false }), 200)
      },
    }),

    {
      name: 'grades-new',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useStore
