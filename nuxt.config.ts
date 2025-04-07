import fontawesomeV6 from 'quasar/icon-set/svg-fontawesome-v6'
import materialIconsOutlined from 'quasar/icon-set/material-icons-outlined'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  pages: true,
  css: ['~/assets/css/tailwind.css','~/assets/css/app.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n'
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  i18n: {
    defaultLocale: 'es',
    locales: [
      {
        code: 'en',
        file: 'en.js', 
        name: 'English'
      },
      {
        code: 'es',
        file: 'es.js', 
        name: 'Español'
      },      
    ],
    lazy: true,
    langDir: "locales",
    strategy: 'no_prefix',
    detectBrowserLanguage: false, 
    compilation: {
      strictMessage: false
    }    
  },
  pinia: {
    storesDirs: ['./stores/**', './modules/*/stores/**'],
  },
  runtimeConfig: {
    public: {
      apiRoute: process.env.API_ROUTE || ''
    }
  },
  quasar: {
    plugins: [
      'AppFullscreen',
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
    ],
    sassVariables: true,
    iconSet: {
      ...materialIconsOutlined, ...fontawesomeV6
    },
    extras: {
      //font: 'roboto-font',
      fontIcons: ['material-icons', 'material-icons-outlined', 'fontawesome-v6'],
      animations: 'all',
    },
  }
})