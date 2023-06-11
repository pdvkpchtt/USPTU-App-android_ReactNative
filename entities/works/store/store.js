import { create } from 'zustand'
import getStudentWorks from '../api/getStudentWorks'
import validateForShow from './../utils/validateForShow'
import filterWorks from './../utils/filterWorks'

const useStore = create((set, get) => ({
  works: [],
  worksForShow: [],
  filteredWorks: [],
  refreshing: true,
  isEmpty: false,
  getWorks: async (filter, group) => {
    set({ refreshing: true })
    const data = await getStudentWorks(group)
    const validatedData = filterWorks(data, filter)
    set({ works: data, worksForShow: validatedData, filteredWorks: validatedData, isEmpty: !validatedData.length })
    setTimeout(() => set({ refreshing: false }), 200)
  },

  filterWorks: (filter) => {
    set({ refreshing: true })
    if (get().works.length) {
      const data = filterWorks(get().works, filter)
      set({ worksForShow: data, isEmpty: !data.length })
    }
    setTimeout(() => set({ refreshing: false }), 200)
  },
}))

export default useStore
