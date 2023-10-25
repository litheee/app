import { defineStore } from 'pinia'

import { ref } from 'vue'

import fetchData from '@/helpers/fetchData'

// import router from '@/router'

export const useChatStore = defineStore('chat', () => {
  const list = ref([])
  const room = ref({})

  async function fetchRooms() {
    const res = await fetchData({
      url: 'v1/room/',
      method: 'GET'
    })
    list.value = res
  }

  async function createRoom() {
    await fetchData({
      url: 'v1/room/',
      params: {
        username: 'av_kazmin@mail.ru'
      }
    })
  }

  async function fetchRoom(id) {
    // room.value = {}
    document.body.classList.add('pointer-none')
    const res = await fetchData({
      url: `v1/room/${id}`,
      method: 'GET'
    })
    room.value = res
    // console.log(res);
    setTimeout(() => {
      document.body.classList.remove('pointer-none')
    }, 200)
  }

  return {
    fetchRooms,
    createRoom,
    fetchRoom,
    list,
    room
  }
})
