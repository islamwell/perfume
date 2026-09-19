// Cloudflare Pages Function: /api/auth
// Validates admin password

const ADMIN_PASSWORD = 'readquran2344';

export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const body = await context.request.json().catch(() => null);
    if (!body || body.password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ugyldig administratorpassord.'
      }), { status: 401, headers: corsHeaders });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Autentisering vellykket.'
    }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
