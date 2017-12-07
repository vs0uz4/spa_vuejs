import axios from 'axios'
import localforage from 'localforage'
import { bus } from '@/plugins/event-bus'

const http = axios.create({
  baseURL: process.env.API_URL
})

const interceptRequest = async (config) => {
  const token = await localforage.getItem('token')
  config.headers.common['x-access-token'] = token
  return config
}

const interceptRequestError = (error) => {
  Promise.reject(error)
}

const interceptResponse = (response) => response

const interceptResponseError = (error) => {
  bus.$emit('display-alert', {
    type: 'error',
    message: error.message
  })
  Promise.reject(error)
}

http.interceptors.request.use(interceptRequest, interceptRequestError)
http.interceptors.response.use(interceptResponse, interceptResponseError)

export default http
