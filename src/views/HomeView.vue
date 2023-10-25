<script setup>
import { onMounted } from 'vue'
import { useChatStore } from '../stores/chat'
import { useUserStore } from '../stores/user'
import ChatList from '../components/ChatList.vue'

const chatStore = useChatStore()
const userStore = useUserStore()

onMounted(() => {
  chatStore.fetchRooms()
  setInterval(() => {
    chatStore.fetchRooms()
  }, 2000)
})
</script>

<template>
  <div class="sidebar o-y-auto fixed">
    <ChatList :user-id="userStore.id" :list="chatStore.list" />
  </div>
  <main class="main fixed d-flex">
    <RouterView />
  </main>
</template>
<style lang="scss" scoped>
.sidebar {
  width: 370px;
  border-right: 1px solid #D9DCE0;
  z-index: 5;
  background-color: #fff;
}
.main {
  z-index: 2;
  left: 370px;
  width: calc(100% - 370px);
  background: center / cover no-repeat url(../assets/images/bg.png),#8BABD8;
  background-blend-mode: overlay;
}
</style>
