// Step 3 · /api/voice/transcribe · proxy to me-hear:8125 Whisper
// POST audio blob → transcript
// v1 returns stub (Vercel can't reach LAN me-hear:8125 directly)
// v2 brother runs ngrok or Cloudflare tunnel to expose me-hear:8125

const ME_HEAR_PUBLIC_URL = process.env.ME_HEAR_PUBLIC_URL || '';

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default async function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  if (!ME_HEAR_PUBLIC_URL) {
    return res.status(200).json({
      transcript: '[v1 stub · ME_HEAR_PUBLIC_URL env var not set on Vercel · brother sets up ngrok/Cloudflare tunnel from Mac mini me-hear:8125]',
      stub: true,
    });
  }
  try {
    const upstream = await fetch(`${ME_HEAR_PUBLIC_URL}/transcribe`, {
      method: 'POST',
      headers: req.headers['content-type'] ? { 'content-type': req.headers['content-type'] } : {},
      body: req.body,
    });
    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: 'me-hear unreachable', detail: e.message });
  }
}
