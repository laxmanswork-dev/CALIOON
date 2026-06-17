/**
 * Cloudflare Pages Function — POST /submit
 *
 * Set these in Cloudflare Pages → Settings → Environment Variables:
 *   RESEND_API_KEY   (required)  — your Resend API key  e.g. re_xxxx
 *   FROM_EMAIL       (required)  — a verified Resend sender  e.g. no-reply@yourdomain.com
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function respond(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost({ request, env }) {
  // 1 ── Parse body ────────────────────────────────────────────────────────────
  let data;
  try {
    data = await request.json();
  } catch {
    return respond({ ok: false, error: 'Invalid request body' }, 400);
  }

  const { name, email, phone, company, services, description } = data;

  // 2 ── Server-side validation ────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !description?.trim()) {
    return respond({ ok: false, error: 'Required fields missing' }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return respond({ ok: false, error: 'Invalid email address' }, 422);
  }
  if (!Array.isArray(services) || services.length === 0) {
    return respond({ ok: false, error: 'Select at least one pillar' }, 422);
  }

  // 3 ── Config from environment ───────────────────────────────────────────────
  const RESEND_API_KEY = env.RESEND_API_KEY;
  const FROM_EMAIL     = env.FROM_EMAIL || 'onboarding@resend.dev';

  if (!RESEND_API_KEY) {
    return respond({ ok: false, error: 'RESEND_API_KEY not configured' }, 500);
  }

  const pillarList = services.join(', ');
  const appTime    = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  });

  // 4 ── Email helper ──────────────────────────────────────────────────────────
  async function sendEmail(to, subject, html, replyTo) {
    const payload = { from: FROM_EMAIL, to, subject, html };
    if (replyTo) payload.reply_to = replyTo;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => 'no body');
      throw new Error(`Resend ${res.status}: ${errText}`);
    }
    return res.json();
  }

  // 5 ── Admin notification HTML ───────────────────────────────────────────────
  const adminHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:Georgia,serif;background:#050A12;color:#FDF0D5;margin:0;padding:32px}
  .wrap{background:#0B1526;border:1px solid rgba(198,160,98,.40);padding:36px;max-width:600px;margin:0 auto;border-radius:4px}
  h1{font-size:20px;letter-spacing:.18em;color:#c6a062;text-transform:uppercase;margin:0 0 6px}
  .sub{font-size:11px;letter-spacing:.14em;color:rgba(198,160,98,.50);text-transform:uppercase;margin:0 0 24px}
  hr{border:none;border-top:1px solid rgba(198,160,98,.25);margin:20px 0}
  .lbl{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(198,160,98,.65);margin-bottom:3px}
  .val{font-size:15px;color:#FDF0D5;line-height:1.6;margin-bottom:14px}
  .desc{white-space:pre-wrap;font-size:14px;color:rgba(253,240,213,.80);line-height:1.7;
        background:rgba(198,160,98,.06);padding:12px 16px;border-left:2px solid rgba(198,160,98,.40)}
  .foot{margin-top:28px;font-size:10px;letter-spacing:.18em;color:rgba(198,160,98,.30);text-transform:uppercase;text-align:center}
</style>
</head><body>
<div class="wrap">
  <h1>New Empire Application</h1>
  <p class="sub">Received via calioon.com</p>
  <hr>
  <div class="lbl">Full Name</div><div class="val">${esc(name)}</div>
  <div class="lbl">Email</div><div class="val">${esc(email)}</div>
  <div class="lbl">Phone</div><div class="val">${esc(phone)}</div>
  <div class="lbl">Company / Brand</div><div class="val">${esc(company || '—')}</div>
  <hr>
  <div class="lbl">Selected Pillar</div><div class="val">${esc(pillarList)}</div>
  <div class="lbl">Project Description</div><div class="desc">${esc(description)}</div>
  <hr>
  <div class="lbl">Application Time</div><div class="val">${esc(appTime)}</div>
  <div class="foot">CALIOON COLLECTIVE — STRATEGIC EMPIRE DIVISION</div>
</div>
</body></html>`;

  // 6 ── Auto-reply HTML ───────────────────────────────────────────────────────
  const replyHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body{font-family:Georgia,serif;background:#050A12;color:#FDF0D5;margin:0;padding:32px}
  .wrap{background:#0B1526;border:1px solid rgba(198,160,98,.40);padding:40px;max-width:560px;margin:0 auto;border-radius:4px;text-align:center}
  .logo{font-size:22px;letter-spacing:.28em;color:#c6a062;text-transform:uppercase;font-weight:bold;margin-bottom:6px}
  hr{border:none;border-top:1px solid rgba(198,160,98,.25);width:60px;margin:24px auto}
  h1{font-size:18px;letter-spacing:.16em;color:#FDF0D5;text-transform:uppercase;margin:0 0 20px}
  p{font-size:15px;color:rgba(253,240,213,.72);line-height:1.80;margin:0 0 14px}
  .sign{margin-top:28px;font-size:11px;letter-spacing:.22em;color:rgba(198,160,98,.50);text-transform:uppercase}
  .brand{font-size:16px;letter-spacing:.22em;color:#c6a062;font-weight:bold;text-transform:uppercase;margin-top:6px}
</style>
</head><body>
<div class="wrap">
  <div class="logo">CALIOON</div>
  <hr>
  <h1>Application Received</h1>
  <p>Thank you for contacting CALIOON.</p>
  <p>Your application has entered our evaluation process.</p>
  <p>Applications are reviewed within 48 hours.</p>
  <p>If your vision aligns with our standards, a member of CALIOON will contact you directly.</p>
  <hr>
  <p class="sign">Build Empires. Not Brands.</p>
  <div class="brand">CALIOON</div>
</div>
</body></html>`;

  // 7 ── Send admin notification ─────────────────────────────────────────────
  // Temporary: no verified domain yet — Resend only delivers to the account
  // owner email. Switch recipients + re-enable auto-reply once calioon.com
  // is verified in Resend and FROM_EMAIL env var is set.
  try {
    await sendEmail(
      ['laxman.calioon@gmail.com'],
      `New Empire Application — ${company || name}`,
      adminHtml,
      email,
    );

    return respond({ ok: true });

  } catch (err) {
    console.error('[submit] email error:', err.message);
    return respond({ ok: false, error: err.message }, 502);
  }
}
