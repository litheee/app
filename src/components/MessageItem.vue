<script setup>
import { useUserStore } from '../stores/user'

const props = defineProps({
  message: Object,
  userId: [String, Number],
  authorId: [String, Number]
})
</script>

<template>
  <div class="message" :class="{'message--own': userId === authorId}">
    <div class="message__inner">
      <p v-html="message.text">
      </p>
      <div class="info">
        <span class="time">{{ message.timestamp }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  max-width: 50%;
  
  margin-bottom: 16px;

  &__inner {
    padding: 0 12px 4px;
    border-radius: 12px;
    background-color: #fff;
    display: inline-block;
    min-width: 85px;

    p {
      margin: 4px 0;
    }
  }

  &--own {
    margin-left: auto;
    .message__inner {
      background-color: #78e378;
      text-align: right;
    }
    .time {
      color: #fff;
    }
  }
}
.info {
  text-align: right;
}
.time {
  font-size: 12px;
}
</style>
