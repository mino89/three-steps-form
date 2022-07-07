// plugins/i18n.js
import axios from 'axios'
export default {
  install: (app) => {
    const store = app.config.globalProperties.$store
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
      store.commit('UPDATE_LOADING', true)
      return config
    }, function (error) {
      store.commit('UPDATE_LOADING', false)
      store.commit('UPDATE_MESSAGE', error.response.data.message)
      return Promise.reject(error)
    })
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      store.commit('UPDATE_LOADING', false)
      return response
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      store.commit('UPDATE_LOADING', false)
      store.commit('UPDATE_MESSAGE', error.response.data.message)
      return Promise.reject(error)
    })
  }
}
