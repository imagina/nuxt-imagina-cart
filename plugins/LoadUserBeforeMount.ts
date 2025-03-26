import { useAuthStore } from '../modules/iauth/stores/useAuth'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const userStore = useAuthStore(<any>nuxtApp.$pinia)

    // Carga los datos del usuario en el store de Pinia
    
    userStore.refreshSession()
    if(!userStore.settings) userStore.getSettings()    
  }
})
