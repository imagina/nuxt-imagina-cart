export default defineEventHandler((event) => {
    
    const config = useRuntimeConfig()
    const whiteList = config.public.ipWhiteList   
  
    const ip = getRequestIP(event, {
        xForwardedFor: true,
    });
    console.log(whiteList)
    console.log('the ip:'+ip)

    
    if (!['186.117.242.160', '181.56.253.64'].includes(ip)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Forbidden: Your IP is blocked---.'+ip,
      });
    }
   

  });
  