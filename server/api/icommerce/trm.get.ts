export default defineCachedEventHandler(async (event) => {
    try {
      const baseUrl = process.env.N8N_BASE_URL ?? '';
      const appToken = process.env.N8N_APP_TOKEN ?? '';

      // Envía el cuerpo al webhook de n8n
      const n8nResponse = await $fetch(`${baseUrl}imagina/get/trm`, {
        method: 'GET',
        headers: {
          'app_token': appToken
        },
      });
      return n8nResponse;
    } catch (error: any) {
      // Captura errores y lanza un error con contexto
      throw createError({
        statusCode: error.statusCode || 500,
        statusMessage: error.statusMessage || 'Error fetching TRM from n8n',
      });
    }
  }, {
     group: 'icommerce',
     name: 'trm',
     getKey: (event) => 'usd', 
     maxAge: 1,
  } 
  

);
  