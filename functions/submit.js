/**
 * Cloudflare Pages Function — POST /submit
 * Receives the empire application form, validates, and emails via Resend.
 *
 * Required environment variable (set in Cloudflare Pages dashboard):
 *   RESEND_API_KEY — your Resend API key
 *
 * Optional:
 *   TO_EMAIL — recipient email (defaults to laxman.s.work@gmail.com)
 *   FROM_EMAIL — sender address (defaults to applications@calioon.com)
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  // ── CORS headers ──────────────────────────────────────────────────────────
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // ── Server-side validation ─────────────────────────────────────────────────
  const { name, email, phone, company, services, description } = body || {};

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Required fields missing' }),
      { status: 422, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Invalid email address' }),
      { status: 422, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  const apiKey = env?.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  const toEmail   = env?.TO_EMAIL   || 'laxman.s.work@gmail.com';
  const fromEmail = env?.FROM_EMAIL || 'CALIOON Applications <applications@calioon.com>';
  const serviceList = Array.isArray(services) && services.length > 0
    ? services.join(', ')
    : 'Not specified';

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Georgia, serif; background: #050A12; color: #FDF0D5; margin: 0; padding: 32px; }
    .card { background: #0B1526; border: 1px solid rgba(198,160,98,0.40); padding: 32px; max-width: 600px; margin: 0 auto; }
    h1 { font-size: 22px; letter-spacing: 0.16em; color: #c6a062; text-transform: uppercase; margin: 0 0 24px; }
    .rule { height: 1px; background: linear-gradient(90deg, transparent, rgba(198,160,98,0.55), transparent); margin: 20px 0; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(198,160,98,0.70); margin-bottom: 4px; }
    .value { font-size: 15px; color: #FDF0D5; line-height: 1.6; }
    .footer { margin-top: 28px; font-size: 10px; letter-spacing: 0.18em; color: rgba(198,160,98,0.35); text-transform: uppercase; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h1>⚡ New Empire Application</h1>
    <div class="rule"></div>
    <div class="field">
      <div class="label">Name</div>
      <div class="value">${escapeHtml(name)}</div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value">${escapeHtml(email)}</div>
    </div>
    <div class="field">
      <div class="label">Phone</div>
      <div class="value">${escapeHtml(phone)}</div>
    </div>
    <div class="field">
      <div class="label">Company / Brand</div>
      <div class="value">${escapeHtml(company || 'Not provided')}</div>
    </div>
    <div class="rule"></div>
    <div class="field">
      <div class="label">Service Pillars Selected</div>
      <div class="value">${escapeHtml(serviceList)}</div>
    </div>
    <div class="field">
      <div class="label">Project Description</div>
      <div class="value">${escapeHtml(description || 'Not provided')}</div>
    </div>
    <div class="rule"></div>
    <div class="footer">CALIOON COLLECTIVE — STRATEGIC EMPIRE DIVISION</div>
  </div>
</body>
</html>
`;

  // ── Send via Resend ────────────────────────────────────────────────────────
  let resendRes;
  try {
    resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New Empire Application — ${name}`,
        html: htmlBody,
        reply_to: email,
      }),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Network error contacting Resend' }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  if (!resendRes.ok) {
    const detail = await resendRes.text().catch(() => '');
    console.error('Resend error:', resendRes.status, detail);
    return new Response(
      JSON.stringify({ ok: false, error: 'Email delivery failed' }),
      { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
}

// Handle preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
