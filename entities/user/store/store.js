import { create } from 'zustand'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import decrypt from '../../../shared/utils/decrypt'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import getProfileInformation from '../api/getProfileInformation'
import getKontId from '../api/getKontId'
import { updateToken } from '../../../shared/apiClient'
import useTokenStore from '../../../shared/apiClient/store/store'

const useStore = create(
  persist(
    (set, get) => ({
      id: null,
      deviceId: uuidv4(),
      par: null,
      name: null,
      surname: null,
      middlename: null,
      email: null,
      phone: null,
      data: [],
      dataIdSelected: 0,
      movements: [],
      loading: false,
      isShowIntro: true,
      isDemoMode: false,
      savePar: (par) => set({ par: par }),
      validateAccessToken: async (tokenEncrypted) => {
        const accessToken = await decrypt(tokenEncrypted, get().par)
        updateToken(accessToken)
        ////console.log(accessToken)
        const id = await getKontId(accessToken)
        // //console.log(id)
        set({ id: id })
        const profile = await getProfileInformation(id)
        set({ ...profile })
        useTokenStore.setState({ isAuth: true })
        //  updateToken(accessToken)
        // const id = await getKontId(accessToken)
        // //console.log(id)
        // if (!id?.R) {
        //   //console.log('tttt')
        //   set({ access_token: accessToken, id })
        //   const profile = await getProfileInformation(get().access_token, get().id)
        //   set({ ...profile })
        //   set({ isAuth: true })
        // } else {
        // }
      },
      getCurrentData: () => {
        // //console.log(get().data)
        return {
          ...get().data[get().dataIdSelected],
        }
      },
      getFullName: () => {
        return (get().surname + ' ' + get().name + ' ' + get().middlename).trim()
      },
      getProfileInformation: async () => {
        const profile = await getProfileInformation(get().id)
        set({ ...profile })
      },
      getStudyGroup: () => {
        return get().data[get().dataIdSelected].study_group
      },
      getPotok: () => {
        return get().data[get().dataIdSelected].study_group.slice(0, -3).toUpperCase()
      },

      getGroups: () => {
        const data = get().data
        const groups = []
        for (let item of data) {
          groups.push(item.study_group)
        }
        return groups
      },
      // updateTokenAndId: async () => {
      //   const accessToken = await upgradeAccessToken(get().accessToken)
      //   set({ access_token: accessToken })
      //   let id = await getKontId(access_token)
      //   //console.log(id)
      //   if (id?.R === 'Err') {
      //     throw new Error('false access_token')
      //   }
      //   return { access_token: access_token, id: id }
      // },
    }),
    {
      name: 'user-new',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

export default useStore
