<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import fetchData from '../helpers/fetchData'
import { useUserStore } from '../stores/user'
import { useChatStore } from '../stores/chat'
import ChatInput from '../components/ChatInput.vue'
import ChatHeader from '../components/ChatHeader.vue'
import MessageItem from '../components/MessageItem.vue'
const userStore = useUserStore()
const chatStore = useChatStore()
const route = useRoute()
const chatId = ref()
const socket = ref()
const msg = ref('')
const isOpen = ref(false)
const isReady = ref(false)

watch(
  () => route.params.id, 
  async (id) => {
    isReady.value = false
    chatId.value = id
    if (isOpen.value) {
      socket.value.close()
    }
    await chatStore.fetchRoom(chatId.value)

    const url = `ws://77.222.53.135/ws/chat/${id}/?token=${userStore.token}`
    socket.value = new WebSocket(url)
    socket.value.onopen = function() {
      console.log('[open] Соединение установлено')
      scrollBottom()
      isOpen.value = true
      isReady.value = true
    }
    socket.value.onmessage = async function(event) {
      const message = JSON.parse(event.data)
      console.log({message})
      await getRoom()
    }
    socket.value.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`)
      } else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.log('[close] Соединение прервано', event)
      }
    }
    socket.value.onerror = function(error) {
      console.log({error})
    }
  },
  {
    immediate: true
  }
)
const chatRef = ref()

const sendMsg = () => {
  const params = {
    message: msg.value
  }
  socket.value.send(JSON.stringify(params))
  // await getRoom()
}

const getRoom = async () => {
  await chatStore.fetchRoom(chatId.value)
  scrollBottom()
}

const scrollBottom = () => {
  if (chatRef.value.scrollHeight) {
    chatRef.value.scrollTop = chatRef.value.scrollHeight
  }
}

onMounted(() => {
  window.addEventListener('resize', scrollBottom)
})

onUnmounted(() => {
  window.removeEventListener('resize', scrollBottom)
})
const userFrom = id => chatStore.room.data.user1 === id ? 'user1' : 'user2'
// :userName="chatStore.room.data[userFrom(chatStore.room.data.id)].username"
</script>

<template>
  <div ref="chatRef" class="chat w-100 d-flex column relative o-y-auto" :class="{'loading': !isReady}">
    <ChatHeader v-if="chatStore.room?.data?.messages" :userName="chatStore.room.data[userFrom(chatStore.room.data.id)].username" />
    <div class="inner d-flex column" v-if="chatStore.room?.data?.messages">
      <!-- <div class="date">
        Today
      </div> -->
      <div class="messages d-flex j-end">
        <MessageItem :user-id="userStore.id" :author-id="message.author.id" :message="message" v-for="message in chatStore.room.data.messages" :key="message.id" />
      </div>
    </div>
    <ChatInput v-if="chatStore.room?.data?.messages" v-model="msg" class="input" @on-send="sendMsg" />
  </div>
</template>

<style lang="scss" scoped>
.inner {
  flex-grow: 1;
  padding: 36px 40px;
}

.input {
  position: -webkit-sticky;
  position: sticky;
  bottom: 20px;
  margin: auto 40px 20px;
  width: auto;
}

.date {
  color: #fff;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: rgba(61, 112, 184, 0.60);
  display: inline-block;
  margin: 16px auto;
}

.messages {
  flex-direction: column-reverse;
  margin-top: auto;
}
.chat {
  &.loading {
    opacity: 0;
    overflow: hidden;
  }
  &::-webkit-scrollbar {
    width: 12px;
  }
 
  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c1dbff;
  }
}
</style>
