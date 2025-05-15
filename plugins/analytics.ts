import Clarity from '@microsoft/clarity';

export default defineNuxtPlugin(() => {

	const config = useRuntimeConfig()        
    
  onNuxtReady(async () => {
    if (import.meta.env.MODE === 'production') {
        Clarity.init(config.public.clarityId);
    }    
  })
})
