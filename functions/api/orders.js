// Cloudflare Pages Function: /api/orders
// Handles order creation, storage in Cloudflare KV, and instant Telegram push notifications

const ADMIN_PASSWORD = 'readquran2344';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function getTelegramConfig(context) {
  let botToken = context.env?.TELEGRAM_BOT_TOKEN;
  let chatId = context.env?.TELEGRAM_CHAT_ID;

  if (context.env?.AROMATIX_CATALOG) {
    try {
      const savedConfig = await context.env.AROMATIX_CATALOG.get('telegram_config', { type: 'json' });
      if (savedConfig) {
        if (!botToken && savedConfig.botToken) botToken = savedConfig.botToken;
        if (!chatId && savedConfig.chatId) chatId = savedConfig.chatId;
      }
    } catch (e) {}
  }

  return { botToken, chatId };
}

function formatTelegramOrderMessage(order) {
  const isPickup = order.customer?.delivery === 'pickup';
  const deliveryText = isPickup
    ? 'Gratis henting: Tøyengata 3, 0190 Oslo (inne hos PakStar)'
    : `${order.customer?.street || ''}, ${order.customer?.postal || ''} ${order.customer?.city || ''} (Posten Norgespakke)`;

  const itemsList = (order.items || []).map(i => {
    const size = i.size || '100 ml';
    const scent = i.scent ? ` [Duft: ${i.scent}]` : '';
    return `• <b>${escapeHtml(i.name)}</b>${escapeHtml(scent)}\n   ${i.qty} stk × ${i.price} kr = <b>${i.qty * i.price} kr</b> (${escapeHtml(size)})`;
  }).join('\n');

  let osloTime = new Date().toISOString();
  try {
    osloTime = new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' });
  } catch (e) {}

  return `🛍️ <b>NY BESTILLING MOTTATT!</b> #${order.orderId}
━━━━━━━━━━━━━━━━━━
👤 <b>Kunde:</b> ${escapeHtml(order.customer?.name || 'Kunde')}
📞 <b>Vipps / Mobil:</b> <code>${escapeHtml(order.customer?.phone || 'Ikke oppgitt')}</code>
✉️ <b>E-post:</b> ${escapeHtml(order.customer?.email || 'Ikke oppgitt')}

🚚 <b>Levering:</b> ${isPickup ? '🏪 Gratis Henting i Butikk' : '📦 Posten Norgespakke'}
📍 <b>Mottak/Adresse:</b> ${escapeHtml(deliveryText)}

📦 <b>Bestilte varer:</b>
${itemsList || '• Ingen varer spesifisert'}

━━━━━━━━━━━━━━━━━━
💰 <b>Delsum:</b> ${order.subtotal} kr
🚚 <b>Frakt:</b> ${order.shipping === 0 ? 'Gratis' : order.shipping + ' kr'}
✨ <b>TOTALBELØP VIPPS: ${order.total} kr</b>
━━━━━━━━━━━━━━━━━━
⏰ <b>Tidspunkt:</b> ${osloTime}`;
}

async function sendTelegramMessage(botToken, chatId, messageText) {
  if (!botToken || !chatId) {
    return { success: false, error: 'Telegram Bot Token eller Chat ID er ikke konfigurert ennå.' };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data = await res.json().catch(() => null);
    if (res.ok && data?.ok) {
      return { success: true };
    }
    return {
      success: false,
      error: data?.description || `HTTP ${res.status}`
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function onRequestPost(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const body = await context.request.json().catch(() => null);
    if (!body) {
      return new Response(JSON.stringify({ success: false, error: 'Ugyldig forespørsel (tom body)' }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const kv = context.env?.AROMATIX_CATALOG;

    // 1. SAVE TELEGRAM CONFIG (Admin only)
    if (body.action === 'save_telegram_config') {
      if (body.password !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: false, error: 'Ugyldig passord' }), {
          status: 401,
          headers: corsHeaders
        });
      }

      if (!kv) {
        return new Response(JSON.stringify({ success: false, error: 'KV database ikke tilgjengelig' }), {
          status: 500,
          headers: corsHeaders
        });
      }

      const botToken = body.botToken?.trim() || '';
      const chatId = body.chatId?.trim() || '';

      await kv.put('telegram_config', JSON.stringify({ botToken, chatId }));

      return new Response(JSON.stringify({
        success: true,
        message: 'Telegram-oppsett lagret i skyen!'
      }), { headers: corsHeaders });
    }

    // 2. TEST TELEGRAM NOTIFICATION (Admin only)
    if (body.action === 'test_telegram') {
      if (body.password !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: false, error: 'Ugyldig passord' }), {
          status: 401,
          headers: corsHeaders
        });
      }

      const { botToken, chatId } = await getTelegramConfig(context);
      const testToken = body.botToken?.trim() || botToken;
      const testChatId = body.chatId?.trim() || chatId;

      let osloTime = new Date().toISOString();
      try {
        osloTime = new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' });
      } catch (e) {}

      const testMsg = `🔔 <b>Testvarsling fra Aromatix Oslo</b>\n\nTelegram-varsling er koblet opp og fungerer perfekt! Når nye kunder bestiller flakonger i nettbutikken, vil alle bestillingsdetaljer og Vipps-numre sendes hit umiddelbart.\n\n⏰ <i>${osloTime}</i>`;

      const tgRes = await sendTelegramMessage(testToken, testChatId, testMsg);
      if (tgRes.success) {
        return new Response(JSON.stringify({
          success: true,
          message: '✓ Testmelding sendt til Telegram! Sjekk telefonen din.'
        }), { headers: corsHeaders });
      } else {
        return new Response(JSON.stringify({
          success: false,
          error: `Telegram-feil: ${tgRes.error}`
        }), { status: 400, headers: corsHeaders });
      }
    }

    // 3. UPDATE ORDER STATUS (Admin only)
    if (body.action === 'update_order_status') {
      if (body.password !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ success: false, error: 'Ugyldig passord' }), {
          status: 401,
          headers: corsHeaders
        });
      }

      if (kv && body.orderId && body.status) {
        const orders = await kv.get('orders_data', { type: 'json' }) || [];
        const target = orders.find(o => o.orderId === body.orderId);
        if (target) {
          target.status = body.status;
          await kv.put('orders_data', JSON.stringify(orders));
        }
      }

      return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    }

    // 4. NEW ORDER SUBMISSION (From Customer Checkout)
    const newOrder = {
      orderId: body.orderId || ('ARX-' + Date.now().toString().slice(-6)),
      date: body.date || new Date().toISOString(),
      customer: {
        name: body.customer?.name?.trim() || 'Kunde',
        email: body.customer?.email?.trim() || '',
        phone: body.customer?.phone?.trim() || '',
        delivery: body.customer?.delivery || 'pickup',
        street: body.customer?.street?.trim() || '',
        postal: body.customer?.postal?.trim() || '',
        city: body.customer?.city?.trim() || ''
      },
      items: Array.isArray(body.items) ? body.items : [],
      subtotal: Number(body.subtotal) || 0,
      shipping: Number(body.shipping) || 0,
      total: Number(body.total) || 0,
      status: 'Mottatt (Avventer Vipps)'
    };

    // Save to Cloudflare KV if available
    let kvSaved = false;
    if (kv) {
      try {
        const existingOrders = await kv.get('orders_data', { type: 'json' }) || [];
        existingOrders.unshift(newOrder);
        // Retain last 300 orders
        const trimmed = existingOrders.slice(0, 300);
        await kv.put('orders_data', JSON.stringify(trimmed));
        kvSaved = true;
      } catch (err) {
        console.warn('Kunne ikke lagre ordre i KV:', err.message);
      }
    }

    // Dispatch Telegram message
    const { botToken, chatId } = await getTelegramConfig(context);
    const messageText = formatTelegramOrderMessage(newOrder);
    const tgResult = await sendTelegramMessage(botToken, chatId, messageText);

    return new Response(JSON.stringify({
      success: true,
      orderId: newOrder.orderId,
      kvSaved,
      telegramSent: tgResult.success,
      telegramError: tgResult.success ? null : tgResult.error
    }), { headers: corsHeaders });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), { status: 500, headers: corsHeaders });
  }
}

export async function onRequestGet(context) {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  try {
    const url = new URL(context.request.url);
    const password = url.searchParams.get('password');

    if (password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Uautorisert tilgang til ordreregister.'
      }), { status: 401, headers: corsHeaders });
    }

    const kv = context.env?.AROMATIX_CATALOG;
    let orders = [];
    let savedTg = null;

    if (kv) {
      orders = await kv.get('orders_data', { type: 'json' }) || [];
      savedTg = await kv.get('telegram_config', { type: 'json' });
    }

    const envToken = context.env?.TELEGRAM_BOT_TOKEN;
    const envChatId = context.env?.TELEGRAM_CHAT_ID;
    const effectiveToken = envToken || savedTg?.botToken || '';
    const effectiveChatId = envChatId || savedTg?.chatId || '';

    return new Response(JSON.stringify({
      success: true,
      orders,
      telegramConfig: {
        configured: !!(effectiveToken && effectiveChatId),
        chatId: effectiveChatId ? effectiveChatId.slice(0, 4) + '****' : '',
        rawChatId: effectiveChatId || '',
        rawBotToken: effectiveToken || ''
      }
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
