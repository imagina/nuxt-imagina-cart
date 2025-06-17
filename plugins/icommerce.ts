import { useAuthStore } from '../modules/iauth/stores/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const userStore = useAuthStore(<any>nuxtApp.$pinia)

    // Carga los datos del usuario en el store de Pinia
    
    userStore.refreshSession()
    if(!userStore.settings) userStore.getSettings()
    //userStore.getUsdRates()        
    const usdRates =  await $fetch('/api/icommerce/trm')  
    console.count('icommerce.trm')
    useState('icommerce.trm', () => usdRates)
    
  }
})
