import { defineStore } from 'pinia'

import { reactive, ref } from 'vue'

import { useRoute } from 'vue-router'


const baseUrl = `${import.meta.env.VITE_WS}?token=`

export const useSocketStore = defineStore('socket', () => {
  const route = useRoute()

  const state = reactive({
    pool: {},
    bath: {},
    opened: false,
    URL: '',
    reopen: false,
    loading: true,
    id: '',
    reconnecting: false
  })

  const socket = ref()

  function open() {
    socket.value = new WebSocket(state.URL)

    socket.value.onopen = function() {
      console.log("[open] Соединение установлено")
      state.opened = true
      state.reopen = false
    }
    
    socket.value.onmessage = function(event) {
      // console.log(`[message] Данные получены с сервера: ${event.data}`)
      const message = JSON.parse(event.data)
      state.pool = message.pool || state.pool
      state.bath = message.bath || state.bath
      state.reconnecting = false
      state.loading = false
    }
    
    socket.value.onclose = async function(event) {
      state.opened = false
      state.firstMessageReceived = false
      if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.log('[close] Соединение прервано', event)
        reconnect()
      }
    }
    
    socket.value.onerror = function(error) {
      console.log(error)
    }
  }
  
  async function reconnect() {
    state.reconnecting = true
    state.loading = false
    await poolStore.fetchToken()
    setURL()
    open()
  }

  function setURL () {
    state.URL = baseUrl + poolStore.pool.connect_token
  }

  function command(params) {
    if (!settingsStore.isDisableCommand) {
      settingsStore.isDisableCommand = true
      params.uuid = uuidv4(),
      params.module = route.params.name
      if (params.timer === 'off') {
        delete params.timer
      }
      socket.value.send(JSON.stringify(params))
      setTimeout(() => {
        settingsStore.isDisableCommand = false
      }, 8000)
      
    }
  }

  return {
   open,
   state,
   command,
   socket,
   setURL
  }

})