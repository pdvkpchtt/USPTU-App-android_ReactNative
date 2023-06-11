import { create } from 'zustand'
import moment from 'moment'
import 'moment/locale/ru'
import getIdForWork from '../api/getIdForWork'
moment.locale('ru')

const useStore = create((set, get) => ({
  discipline: '',
  disciplineId: '',
  type: '',
  typeId: '',
  group: '',
  semester: '',
  ranking: '',
  name: '',
  date: moment().format('D MMM YYYY г.'),
  review: '',
  extraInfo: '',
  worknomer: '',
  files: [],
  isShowCalendar: false,
  loading: false,
  isModalVisible: false,
  loadingFileName: '',
  id: '',
  getDate: () => {
    return moment(date, 'D MMM YYYY г.').format('DD.MM.YYYY 00:00:00')
  },
  getId: async () => {
    const id = await getIdForWork()
    set({ id: id })
    return id
  },
  addFile: (file) => {
    set({ files: [...get().files, file] })
  },
  deleteFile: (key) => {
    const filteredFiles = get().files.filter((file) => file.key !== key)
    set({ files: filteredFiles })
  },
  setIsShowCalendar: (bool) => {
    set({ isShowCalendar: bool })
  },
  setDiscipline: (disc) => {
    set({ ...disc })
  },
  setType: (type) => {
    set({ ...type })
  },
  setName: (name) => {
    set({ name })
  },
  setReview: (review) => {
    set({ review })
  },
  setDate: (date) => {
    set({ date: moment(date).format('D MMM YYYY г.') })
  },
  setExtraInfo: (extraInfo) => {
    set({ extraInfo })
  },
  getDate: () => {
    // console.log(get().date)
    //return get().date.format('D MMM YYYY г.')
  },
  reset: () => {
    set({
      discipline: '',
      disciplineId: '',
      type: '',
      group: '',
      semester: '',
      ranking: '',
      name: '',
      date: moment().format('D MMM YYYY г.'),
      review: '',
      extraInfo: '',
      files: [],
      isShowCalendar: false,
      loading: false,
      isModalVisible: false,
      loadingFileName: '',
      id: '',
    })
  },
}))

export default useStore
