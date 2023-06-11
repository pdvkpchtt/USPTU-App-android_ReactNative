import { create } from 'zustand'
import getHostelInfo from '../api/getHostelInfo'

const useStore = create((set, get) => ({
  info: {},
  bills: [],
  refreshing: true,
  getInfo: async () => {
    set({ refreshing: true })
    try {
      const data = await getHostelInfo()
      if (data) {
        set({ info: data.info, bills: data.bills })
      }
    } catch (err) {
    } finally {
      setTimeout(() => set({ refreshing: false }), 200)
    }
  },
}))

export default useStore
