import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const useStore = create(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (text, date, group) => {
        const note = { key: uuidv4(), text: text, date: date, group: group }
        const newNotes = [...get().notes, note]
        ////console.log(newNotes)
        set({ notes: newNotes })
      },
      editNote: (key, text, date, group) => {
        const filteredNotes = get().notes.filter((note) => note.key !== key)
        set({ notes: [...filteredNotes, { key: uuidv4(), text, date, group }] })
      },
      removeNote: (key) => {
        const filteredNotes = get().notes.filter((note) => note.key !== key)
        set({ notes: [...filteredNotes] })
      },
    }),
    {
      name: 'note',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useStore
