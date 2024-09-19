// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  pages: true,
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome',
    'nuxt-quasar-ui'
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
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  runtimeConfig: {
    public: {
      apiRoute: process.env.API_ROUTE || ''
    }
  },
  quasar: {
    plugins: ['Notify']
  }
})