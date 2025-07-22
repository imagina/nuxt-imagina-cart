import { useAuthStore } from '../modules/iauth/stores/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
    const appSettings =  await $fetch('/api/app/settings')
    useState('app.settings', () => appSettings)    

    const usdRates =  await $fetch('/api/icommerce/trm')
    useState('icommerce.trm', () => usdRates)
})
