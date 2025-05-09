export default defineNuxtRouteMiddleware(async (to, from) => {
    
    const ip = useState('ip', () => null)
    const config = useRuntimeConfig()
    const whiteList = config.public.ipWhiteList   
    console.log(whiteList)
    console.log(ip)
       
    if (!whiteList.includes(ip.value)) {
        throw createError({
          statusCode: 403,
          statusMessage: `Forbidden: Your IP ${ip.value} is blocked.`,
        });
      }
    
  })