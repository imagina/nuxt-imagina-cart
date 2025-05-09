export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig(event)
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });
    
    console.log(`api-block${ip} , ${whiteList}`);

    
    if (!whiteList.includes(ip)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Forbidden: Your IP is blocked---.'+ip,
      });
    }
   

  });
  