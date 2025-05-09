export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig(event)
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });
         
     const internalCall = event['_path'] || false
     if(!internalCall == '/api/icommerce/verify-domain') {

      if (!whiteList.includes(ip)) {
        console.log(`403-Forbidden ip: ${ip}, route: ${internalCall}`);
        throw createError({
          statusCode: 403,
          statusMessage: 'Forbidden: Your IP is blocked.',
        });
      }

     }
     

    
    
   

  });
  