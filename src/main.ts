import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import './style.css'
import App from './App.vue'

const router = createRouter({ history: createWebHistory(), routes: [] })

const app = createApp(App)
app.use(PrimeVue, { theme: 'none' })
app.use(router)

app.mount('#app')
