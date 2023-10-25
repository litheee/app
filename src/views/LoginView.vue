<script setup>
import { ref } from 'vue'
import fetchData from '../helpers/fetchData'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
// const username = ref('89999999999')
// const password = ref('123admin')
const username = ref('')
const password = ref('')
const loading = ref(false)
const userStore = useUserStore()

const handleSubmit = async () => {
  loading.value = true

  const res = await fetchData({
    url: 'v1/token/',
    isToken: false,
    params: {
      username: username.value,
      password: password.value
    }
  })

  if (res.token) {
    userStore.token = res.token
    userStore.id = res.user_id

    router.replace({
      name: 'home'
    })
  }

  loading.value = false
}
</script>

<template>
  <form
    class="form mx-auto d-flex column"
    autocomplete="off"
    @submit.prevent="handleSubmit"
    :class="{ 'pointer-none': loading }"
  >
    <input class="form__item" v-model="username" type="text" placeholder="username " />
    <input class="form__item" v-model="password" type="password" placeholder="password" />
    <button type="submit" class="btn">Вход</button>
  </form>
</template>

<style scoped lang="scss">
.form {
  max-width: 500px;
  padding-top: 200px;

  &__item {
    border: 1px solid $base_blue;
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    height: 40px;
  }

  .btn {
    background-color: $base_blue;
    color: #fff;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
