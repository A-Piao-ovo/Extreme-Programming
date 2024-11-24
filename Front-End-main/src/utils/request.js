import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 3000
})

// 请求拦截器
request.interceptors.request.use(config => {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = user.token
  }
  return config
}, error => {
  console.log(error)
})

request.interceptors.response.use(result => {
  return result
}, async error => {
  if (error.response.status === 401) {
    Message.error(error.response.res)
    await router.push('/login')
  } else {
    // 处理响应异常
    return Promise.reject(error)
  }
})

export default request
