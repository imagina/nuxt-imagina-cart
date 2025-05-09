import { verifyCaptcha } from '../../utils/verify-captcha';

export default defineEventHandler(async (event) => {
  try {
    // Verifica el token de reCAPTCHA
    await verifyCaptcha(event);
    // Lee el cuerpo del request
    const body = await readBody<Record<string, any>>(event);

    const baseUrl = process.env.N8N_BASE_URL ?? '';
    const appToken = process.env.N8N_APP_TOKEN ?? '';

    const params: any = {
      method: 'POST',
      body,
      headers: {
        'app_token': appToken
      },
    };

    const [suggestionsResult, checkResult] = await Promise.allSettled([
      $fetch(`${baseUrl}domain/suggestions`, params),
      $fetch(`${baseUrl}domain/search`, params)
    ]);
    
    const suggestions: any = suggestionsResult.status === 'fulfilled' ? suggestionsResult.value : {};
    const check: any = checkResult.status === 'fulfilled' ? checkResult.value : {};
    
    // Opcional: podrías registrar errores
    if (suggestionsResult.status === 'rejected') {
      console.error('Error en suggestions:', suggestionsResult.reason);
    }
    if (checkResult.status === 'rejected') {
      console.error('Error en check:', checkResult.reason);
    }
    
    return { ...suggestions, ...check };
  } catch (error: any) {
    // Captura errores y lanza un error con contexto
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
