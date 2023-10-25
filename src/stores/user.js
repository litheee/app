import useLocalStorage from '@/helpers/useLocalStorage'

import { defineStore } from 'pinia'

import { ref } from 'vue'

// import fetchData from '@/helpers/fetchData'

// import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage('pinia/user/t', ref(false)),
    id = useLocalStorage('pinia/user/_id', ref(false))

  return {
    token,
    id
  }
})
