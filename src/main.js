import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import interceptor from './plugins/interceptor'
import './assets/styles/main.scss'

const app = createApp(App)
app.use(store)
app.use(interceptor)
app.mount('#app')
