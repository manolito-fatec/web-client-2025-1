import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/styles/global.css'

import App from './App.vue'
import router from './router'
import Primevue from 'primevue/config'
import Aura from '@primeuix/themes/material'
import { definePreset } from '@primeuix/themes'

const app = createApp(App)
const YoutanTheme = definePreset(Aura, {
  secondary: '#9c27b0',
  accent: '#ff5722',
  error: '#f44336',
  warning: '#ffeb3b',
  info: '#2196f3',
  success: '#4caf50',
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
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
