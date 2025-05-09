export default defineNuxtRouteMiddleware(async (to, from) => {
    const ip = useState('ip', () => null)
    const whiteList = process.env.IP_WHITElIST
    
    if (!whiteList.includes(ip.value)) {
        throw createError({
          statusCode: 403,
          statusMessage: `Forbidden: Your IP is blocked.`,
        });
      }
     
  })