import { create } from 'zustand'
import getPayments from '../api/getPayments'

const useStore = create((set, get) => ({
  activePayments: [],
  inActivePayments: [],
  refreshing: true,
  getInfo: async () => {
    set({ refreshing: true })
    try {
      const { activePayments, inActivePayments } = await getPayments()
      set({ activePayments: activePayments, inActivePayments: inActivePayments })
    } catch (err) {
    } finally {
      setTimeout(() => set({ refreshing: false }), 200)
    }
  },
}))

export default useStore
