
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import naive from 'naive-ui'
import './index.css'
import 'tailwindcss/tailwind.css';

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)
app.use(router)
app.use(resourcesPlugin)
app.use(naive)
app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)
app.mount('#app')
