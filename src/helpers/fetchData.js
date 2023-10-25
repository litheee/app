import { useUserStore } from '../stores/user'

export default async ({ url = '', params = false, method = 'POST', isToken = true }) => {
  const userStore = useUserStore()

  let options = {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }
  if ('GET' === method || 'HEAD' === method) {
    if (params) url += '?' + new URLSearchParams(params).toString()
  } else {
    options.body = JSON.stringify(params)
  }

  if (isToken) {
    options.headers.Authorization = `Token ${userStore.token}`
  }
  try {
    const response = await fetch(`${import.meta.env.VITE_API}${url}`, options)
    if (response.ok !== true) {
      return response.ok
    }
    if (response.status === 204) {
      return true
    } else {
      return await response.json()
    }
  } catch (error) {
    return error
  }
}
