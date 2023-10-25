<script setup>
import ChatListItem from './ChatListItem.vue'

const props = defineProps(['list', 'userId'])

// const userFrom = id => props.userId === id ? 'user1' : 'user2'
// :user="item[userFrom(item.user2.id)]"

</script>

<template>
  <div v-if="list.length" class="list">
    <ChatListItem
      v-for="item in list"
      :key="item.id"
      :id="item.id"
      :last_message="item.last_message"
      :count_new_messages="item.count_new_messages"
      :companion_name="item.companion_name"
    />
  </div>
</template>

<style lang="scss" scoped></style>
