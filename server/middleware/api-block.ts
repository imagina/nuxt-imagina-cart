export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig()
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });
    console.log(ip)

    
    if (!whiteList.includes(ip)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Your IP is blocked---.'+ip,
      });
    }
   

  });
  