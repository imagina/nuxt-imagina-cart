import { useAuthStore } from '../modules/iauth/stores/useAuth'


export default defineNuxtPlugin(async (nuxtApp) => {

  if (process.client) {
    const userStore = useAuthStore(<any>nuxtApp.$pinia)

    // Carga los datos del usuario en el store de Pinia
    
    userStore.refreshSession()
    if(!userStore.settings) userStore.getSettings()
    if(!userStore.usdRates) await userStore.getUsdRates()   
      checkUrlParams() 
      
  }
})


async function  checkUrlParams(){
  const route = useRoute()  
  if(route.path == '/cart'){
    console.log('indacart')  
    const query = route?.query || {}

    const options = {
      action: query?.a || null,
      pid: query?.pid || null,
      billingcycle: query?.billingcycle || null,
      promocode: query?.promocode || null
    }

    if(options.action && options.pid){
      console.log(options.pid, options)
      //getProduct(options.pid, options)
    }
  }
}