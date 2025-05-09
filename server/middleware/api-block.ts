export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig(event)
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });
    
    console.log(`403-Forbidden ip: ${ip}`);

    
    if (!whiteList.includes(ip)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Your IP is blocked.',
      });
    }
   

  });
  