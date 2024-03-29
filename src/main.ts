import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './utils/firebase'
import './index.css'

createApp(App).use(router).mount('#app')
