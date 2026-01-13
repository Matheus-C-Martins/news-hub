import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './styles/main.scss'

import en from './locales/en.json'
import pt from './locales/pt.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('language') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    pt,
    es,
    fr,
    de
  }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
