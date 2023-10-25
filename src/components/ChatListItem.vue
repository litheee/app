<script setup>
import { computed } from 'vue'
const props = defineProps({
  last_message: [String, Boolean, Object],
  id: {
    type: Number,
    required: true
  },
  user: Object,
  count_new_messages: Number,
  companion_name: String
  // last_name: String,
  // first_name: String,
  // username: String
})

const time = computed(() => {
  let ts = props.last_message?.timestamp
  if (ts) {
    ts = ts.split(' ')[1].split(':')
    ts = `${ts[0]}:${ts[1]}`
  }

  return ts
})
</script>

<template>
  <RouterLink :to="'/m/' + id" class="item d-flex" role="button">
    <div class="avatar d-flex a-stretch">
      <!-- <img class="avatar__img w-100" :src="user.avatar" /> -->
    </div>
    <div class="info d-flex column">
      <div class="header d-flex a-center j-between">
        <div class="name">{{ companion_name }}</div>
        <div class="time">{{ time }}</div>
      </div>
      <div v-if="last_message" class="footer d-flex a-center j-between">
        <div class="message">{{ last_message.text }}</div>
        <div v-if="count_new_messages && id === last_message.author.id" class="unread">{{ count_new_messages }}</div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>
.item {
  user-select: none;
  padding: 12px 16px;

  &.router-link-active {
    background-color: #f5f5f5;
  }
}

.avatar {
  background-color: #8babd8;
  min-width: 48px;
  min-height: 48px;
  border-radius: 100px;
  overflow: hidden;
  margin-right: 16px;
}

.info {
  max-width: calc(100% - (48px + 16px));
  flex: 1;
}

.footer {
  margin-top: auto;
}

.name {
  font-weight: 600;
  max-width: calc(100% - 30px);
}

.time {
  font-size: 12px;
  color: $base_text;
}

.message {
  font-size: 14px;
  color: $base_text;
  max-width: calc(100% - 20px);
}

.message,
.name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.unread {
  width: 16px;
  height: 16px;
  background-color: #78e378;
  border-radius: 100px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
