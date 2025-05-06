type RecaptchaResponse = {
  success: boolean;
  challenge_ts?: string; // ISO timestamp
  hostname?: string;
  score?: number; // Solo v3
  action?: string; // Solo v3
  'error-codes'?: string[];
};

export async function verifyCaptcha(event: any) {
  const body = await readBody(event);
  const token = body?.token ?? body?.captcha?.token ?? body?.['g-recaptcha-response'];

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Captcha token missing' });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY ?? '';

  const response = await $fetch<RecaptchaResponse>('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret,
      response: token,
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.success || (response.score && response.score < 0.5)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid reCAPTCHA token' });
  }

  return true;
}
