export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig(event)
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });

    const path = event['_path'] || false
    if(!path == '/api/icommerce/trm'){
      console.log('nopath')
      if (!whiteList.includes(ip)) {
        console.log(`Forbidden: IP: ${ip}`);      
        throw createError({
          statusCode: 403,        
          statusMessage: 'Forbidden: Your IP is blocked.',
        });
      }
    }
    
    
   

  });
  