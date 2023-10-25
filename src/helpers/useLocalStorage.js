import { watch } from 'vue'

export default (key, data) => {
  const localData = localStorage.getItem(key)

  if (localData) {
    data.value = JSON.parse(localData)
  } else {
    localStorage.setItem(key, JSON.stringify(data.value))
  }

  watch(
    () => data.value,
    (v) => {
      localStorage.setItem(key, JSON.stringify(v))
    },
    {
      deep: true
    }
  )
  return data
}
