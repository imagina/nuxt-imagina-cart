import { verifyCaptcha } from '../../utils/verify-captcha';

export default defineEventHandler(async (event) => {
  try {
    // Verifica el token de reCAPTCHA
    await verifyCaptcha(event);

    // Lee el cuerpo del request
    const body = await readBody<Record<string, any>>(event);

    const baseUrl = process.env.N8N_BASE_URL ?? '';
    const appToken = process.env.N8N_APP_TOKEN ?? '';

    // Envía el cuerpo al webhook de n8n
    const n8nResponse = await $fetch(`${baseUrl}/domain/search`, {
      method: 'POST',
      body,
      headers: {
        'app_token': appToken
      },
    });

    return n8nResponse;
  } catch (error: any) {
    // Captura errores y lanza un error con contexto
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
    });
  }
});
