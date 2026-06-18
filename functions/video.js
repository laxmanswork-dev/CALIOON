/**
 * Cloudflare Pages Function — GET /video
 *
 * Cloudflare Pages' default static asset serving was returning 200 OK with
 * the full file for every Range request instead of 206 Partial Content,
 * forcing browsers (especially Safari/iOS) to re-download the entire video
 * on every seek/loop-restart. This manually implements proper byte-range
 * responses by reading the underlying static asset and slicing it.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Range',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestGet({ request, env }) {
  const assetUrl = new URL('/hero-video.mp4', request.url);
  const assetResponse = await env.ASSETS.fetch(new Request(assetUrl));

  if (!assetResponse.ok) {
    return new Response('Video not found', { status: 404 });
  }

  const buffer = await assetResponse.arrayBuffer();
  const totalSize = buffer.byteLength;
  const range = request.headers.get('Range');

  const baseHeaders = {
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
    ...CORS_HEADERS,
  };

  if (!range) {
    return new Response(buffer, {
      status: 200,
      headers: { ...baseHeaders, 'Content-Length': String(totalSize) },
    });
  }

  const match = range.match(/bytes=(\d*)-(\d*)/);
  if (!match) {
    return new Response('Invalid Range', { status: 416 });
  }

  const start = match[1] ? parseInt(match[1], 10) : 0;
  let end = match[2] ? parseInt(match[2], 10) : totalSize - 1;

  if (start >= totalSize) {
    return new Response('Range Not Satisfiable', {
      status: 416,
      headers: { 'Content-Range': `bytes */${totalSize}` },
    });
  }

  end = Math.min(end, totalSize - 1);
  const chunk = buffer.slice(start, end + 1);

  return new Response(chunk, {
    status: 206,
    headers: {
      ...baseHeaders,
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Content-Length': String(chunk.byteLength),
    },
  });
}
