import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/styles/global.css'
import './assets/styles/styles.scss'

import App from './App.vue'
import router from './router'
import Primevue from 'primevue/config'
import Aura from '@primeuix/themes/material'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)
const YoutanTheme = definePreset(Aura, {
  semantic: {
    primary: {
      400: '{#01081f}',
    }
  },

})

app.use(createPinia())
app.use(router)
app.use(Primevue, {
  //
  theme: {
    preset: YoutanTheme,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})

app.mount('#app')
