export default defineNuxtRouteMiddleware(async (to, from) => {
    const ip = useState('ip', () => null)
    const config = useRuntimeConfig()
    const whiteList = config.public.ipWhiteList   
       
    if (!whiteList.includes(ip.value)) {
        throw createError({
          statusCode: 403,
          statusMessage: `Forbidden: Your IP is blocked.`,
        });
      }
  })