// Cloudflare Pages Function: /api/catalog
// Provides multi-device cloud synchronization for Aromatix Oslo catalog

const ADMIN_PASSWORD = 'readquran2344';

export async function onRequestGet(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  try {
    const kv = context.env.AROMATIX_CATALOG;
    if (!kv) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AROMATIX_CATALOG KV binding not configured on this environment'
      }), { status: 500, headers: corsHeaders });
    }

    const catalogData = await kv.get('catalog_data', { type: 'json' });
    const updatedAt = await kv.get('catalog_updated_at');

    return new Response(JSON.stringify({
      success: true,
      catalog: catalogData || null,
      updatedAt: updatedAt || null
    }), { headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const kv = context.env.AROMATIX_CATALOG;
    if (!kv) {
      return new Response(JSON.stringify({
        success: false,
        error: 'AROMATIX_CATALOG KV binding not configured'
      }), { status: 500, headers: corsHeaders });
    }

    const body = await context.request.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ugyldig forespørsel'
      }), { status: 400, headers: corsHeaders });
    }

    // Authenticate
    if (body.password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ugyldig passord for administrator.'
      }), { status: 401, headers: corsHeaders });
    }

    // Handle Reset Action
    if (body.action === 'reset') {
      await kv.delete('catalog_data');
      await kv.delete('catalog_updated_at');
      return new Response(JSON.stringify({
        success: true,
        message: 'Sky-katalog tilbakestilt til standard.'
      }), { headers: corsHeaders });
    }

    // Validate Catalog Payload
    if (!Array.isArray(body.catalog) || body.catalog.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Katalogen må være en gyldig liste av produkter.'
      }), { status: 400, headers: corsHeaders });
    }

    const now = new Date().toISOString();
    await kv.put('catalog_data', JSON.stringify(body.catalog));
    await kv.put('catalog_updated_at', now);

    return new Response(JSON.stringify({
      success: true,
      message: 'Katalog lagret i skyen og synkronisert!',
      updatedAt: now
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
