export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig(event)
    const whiteList = config.public.ipWhiteList
    const ipVerify = config.public.ipVerify
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });

    console.log(ipVerify)
    if(ipVerify){
      if (!whiteList.includes(ip)) {
        console.log(`Forbidden: IP: ${ip}`);      
        throw createError({
          statusCode: 403,        
          statusMessage: 'Forbidden: Your IP is blocked.',
        });
      }  
    }   

  });
  