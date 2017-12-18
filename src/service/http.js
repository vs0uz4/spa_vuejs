import axios from 'axios'
import localforage from 'localforage'
import router from '@/router'
import store from '@/store'
import { bus } from '@/plugins/event-bus'

const http = axios.create({
  baseURL: process.env.API_URL
})

const setSearching = (state) => {
  store.dispatch('setSearching', { isSearching: state })
}

const interceptRequest = async (config) => {
  setSearching(true)
  const token = await localforage.getItem('token')
  config.headers.common['x-access-token'] = token
  return config
}

const interceptRequestError = (error) => {
  setSearching(false)
  Promise.reject(error)
}

const interceptResponse = (response) => {
  setSearching(false)
  return response
}

const interceptResponseError = (error) => {
  let message = error.message

  if (error.response != null) {
    /**
    * Verificação de Token Expirado ou Inválido
    */
    if (error.response.status === 403) {
      localforage.removeItem('token').then(() => {
        router.push({ name: 'auth.index', query: { expired: true } })
      })
    }
    message = error.response.data.error
  }

  bus.$emit('display-alert', {
    type: 'error',
    message
  })

  setSearching(false)
  Promise.reject(error)
}

http.interceptors.request.use(interceptRequest, interceptRequestError)
http.interceptors.response.use(interceptResponse, interceptResponseError)

export default http
