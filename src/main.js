import { createApp } from 'vue'
import './style.css'
import './input.css'
import App from './App.vue'
import router from './routers/router'

// createApp(App).mount('#app')
// app.use(router)
const app=createApp(App)
app.use(router)
app.mount('#app')