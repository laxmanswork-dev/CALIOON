/**
 * Cloudflare Pages Function — POST /submit
 *
 * Environment variables (set in Cloudflare Pages dashboard → Settings → Variables):
 *   RESEND_API_KEY  — your Resend API key (required)
 *   TO_EMAIL        — CALIOON inbox (default: calioon.global@gmail.com)
 *   FROM_EMAIL      — verified sender domain (default: onboarding@resend.dev for testing)
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return res;
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Parse body
  let body;
  try { body = await request.json(); }
  catch { return json({ ok: false, error: 'Invalid JSON' }, 400); }

  const { name, email, phone, company, services, description } = body ?? {};

  // Validation
  if (!name?.trim() || !email?.trim() || !phone?.trim() || !description?.trim()) {
    return json({ ok: false, error: 'Required fields missing' }, 422);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Invalid email address' }, 422);
  }
  if (!Array.isArray(services) || services.length === 0) {
    return json({ ok: false, error: 'Select at least one service pillar' }, 422);
  }

  const apiKey = env?.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, error: 'Server configuration error' }, 500);

  const toEmails  = (env?.TO_EMAIL || 'calioon.global@gmail.com,laxman.calioon@gmail.com').split(',').map(e => e.trim());
  const fromEmail = env?.FROM_EMAIL || 'onboarding@resend.dev';
  const pillarList = services.join(', ');
  const appTime  = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short',
  });

  // ── 1. Admin notification to CALIOON ────────────────────────────────────────
  const adminHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body{font-family:Georgia,serif;background:#050A12;color:#FDF0D5;margin:0;padding:32px}
  .wrap{background:#0B1526;border:1px solid rgba(198,160,98,.40);padding:36px;max-width:600px;margin:0 auto;border-radius:4px}
  h1{font-size:20px;letter-spacing:.18em;color:#c6a062;text-transform:uppercase;margin:0 0 6px}
  .sub{font-size:12px;letter-spacing:.12em;color:rgba(198,160,98,.55);text-transform:uppercase;margin:0 0 24px}
  .rule{height:1px;background:linear-gradient(90deg,transparent,rgba(198,160,98,.55),transparent);margin:20px 0}
  .field{margin-bottom:16px}
  .lbl{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:rgba(198,160,98,.70);margin-bottom:4px}
  .val{font-size:15px;color:#FDF0D5;line-height:1.6}
  .desc{white-space:pre-wrap;font-size:14px;color:rgba(253,240,213,.80);line-height:1.7;background:rgba(198,160,98,.06);padding:12px 16px;border-left:2px solid rgba(198,160,98,.40)}
  .foot{margin-top:28px;font-size:10px;letter-spacing:.18em;color:rgba(198,160,98,.35);text-transform:uppercase;text-align:center}
</style>
</head>
<body>
<div class="wrap">
  <h1>New Empire Application</h1>
  <p class="sub">Received via calioon.com</p>
  <div class="rule"></div>
  <div class="field"><div class="lbl">Full Name</div><div class="val">${escapeHtml(name)}</div></div>
  <div class="field"><div class="lbl">Email</div><div class="val">${escapeHtml(email)}</div></div>
  <div class="field"><div class="lbl">Phone</div><div class="val">${escapeHtml(phone)}</div></div>
  <div class="field"><div class="lbl">Company / Brand</div><div class="val">${escapeHtml(company || '—')}</div></div>
  <div class="rule"></div>
  <div class="field"><div class="lbl">Selected Pillar</div><div class="val">${escapeHtml(pillarList)}</div></div>
  <div class="field"><div class="lbl">Project Description</div><div class="desc">${escapeHtml(description)}</div></div>
  <div class="rule"></div>
  <div class="field"><div class="lbl">Application Time</div><div class="val">${escapeHtml(appTime)}</div></div>
  <div class="foot">CALIOON COLLECTIVE — STRATEGIC EMPIRE DIVISION</div>
</div>
</body>
</html>`;

  // ── 2. Auto-reply to client ──────────────────────────────────────────────────
  const replyHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8">
<style>
  body{font-family:Georgia,serif;background:#050A12;color:#FDF0D5;margin:0;padding:32px}
  .wrap{background:#0B1526;border:1px solid rgba(198,160,98,.40);padding:40px;max-width:560px;margin:0 auto;border-radius:4px;text-align:center}
  .logo{font-size:22px;letter-spacing:.28em;color:#c6a062;text-transform:uppercase;font-weight:bold;margin-bottom:6px}
  .rule{height:1px;background:linear-gradient(90deg,transparent,rgba(198,160,98,.55),transparent);margin:24px auto;width:80px}
  h1{font-size:18px;letter-spacing:.16em;color:#FDF0D5;text-transform:uppercase;margin:0 0 16px}
  p{font-size:15px;color:rgba(253,240,213,.72);line-height:1.80;margin:0 0 14px}
  .sign{margin-top:32px;font-size:11px;letter-spacing:.22em;color:rgba(198,160,98,.55);text-transform:uppercase}
  .bold-sign{font-size:16px;letter-spacing:.22em;color:#c6a062;font-weight:bold;text-transform:uppercase;margin-top:6px}
</style>
</head>
<body>
<div class="wrap">
  <div class="logo">CALIOON</div>
  <div class="rule"></div>
  <h1>Application Received</h1>
  <p>Thank you for contacting CALIOON.</p>
  <p>Your application has entered our evaluation process.</p>
  <p>Applications are reviewed within 48 hours.</p>
  <p>If your vision aligns with our standards, a member of CALIOON will contact you directly.</p>
  <div class="rule"></div>
  <p class="sign">Build Empires. Not Brands.</p>
  <div class="bold-sign">CALIOON</div>
</div>
</body>
</html>`;

  try {
    await sendEmail(apiKey, {
      from: fromEmail,
      to: toEmails,
      subject: `New Empire Application — ${escapeHtml(company || name)}`,
      html: adminHtml,
      reply_to: email,
    });

    await sendEmail(apiKey, {
      from: fromEmail,
      to: [email],
      subject: 'Your Empire Application Has Been Received',
      html: replyHtml,
    });

    return json({ ok: true });
  } catch (err) {
    console.error('Email error:', err.message);
    return json({ ok: false, error: 'Email delivery failed' }, 502);
  }
}
