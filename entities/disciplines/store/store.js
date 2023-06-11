import { create } from 'zustand'
import getOnlineDiscipline from '../api/getOnlineDiscipline'
import filterDisciplines from '../utils/filterDisciplines'

const useStore = create((set, get) => ({
  messages: [],
  messagesForShow: [],
  info: [],
  infoForShow: [],
  files: [],
  filesForShow: [],
  refreshing: true,
  getDisciplines: async (filter, potok) => {
    set({ refreshing: true })
    // console.log('potok', potok)
    const { messages, info, files } = await getOnlineDiscipline(potok)
    set({
      messages: messages,
      messagesForShow: filterDisciplines(messages, filter),
      info: info,
      infoForShow: filterDisciplines(info, filter),
      files: files,
      filesForShow: filterDisciplines(files, filter),
    })
    setTimeout(() => set({ refreshing: false }), 200)
  },

  filterDisciplines: (filter) => {
    set({
      messagesForShow: filterDisciplines(get().messages, filter),
      infoForShow: filterDisciplines(get().info, filter),
      filesForShow: filterDisciplines(get().files, filter),
    })
  },
}))

export default useStore
