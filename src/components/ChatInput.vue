<script setup>
import { ref, onMounted } from 'vue'
import SendIcon from './icons/IconSend.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'onSend'])

const textarea = ref()

const onInput = () => {
  let innerText = textarea.value.innerText

  if (innerText === '\n' || innerText ===  '<br>') innerText = ''

  emit('update:modelValue', innerText)
}

const clearInput = () => {
  textarea.value.innerText = ''
  emit('update:modelValue', '')
}

onMounted(() => {
  textarea.value.innerText = props.modelValue
})
</script>

<template>
  <div class="input w-100 d-flex a-center">
    <div
      ref="textarea"
      class="input__field o-y-auto w-100 relative"
      contenteditable="true"
      dir="auto"
      data-placeholder="Message"
      tabindex="-1"
      autocomplete="off"
      spellcheck="false"
      :class="{ 'is-empty': modelValue === '' }"
      @input="onInput"
    ></div>
    <div @click="$emit('onSend'); clearInput()" class="input__send d-flex a-center j-center" role="button">
      <SendIcon />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  height: 56px;
  min-height: 56px;
  border-radius: 12px;
  background-color: $base_bg;
  padding: 8px 16px;

  &__field {
    outline: none;
    max-height: 40px;
    padding-right: 16px;

    &.is-empty {
      + .input__send {
        pointer-events: none;
      }
    }
  }

  &__send {
    width: 24px;
    height: 24px;
  }
}
</style>
