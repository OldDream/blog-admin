import axios from 'axios'
console.log(process.env.NODE_ENV);
const isDev = process.env.NODE_ENV ==='development'

const instance = axios.create({
  baseURL: isDev?'http://localhost:3000/': 'http://106.15.67.223:7001/',
  timeout: 3000,
  withCredentials: true
})

// 拦截器
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

export default instance