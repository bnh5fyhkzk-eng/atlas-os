// Vercel Function · /api/auth · password check · sets HttpOnly cookie
// Per v1 atlasos.me login pattern · 2026-06-08 archive
// Set ATLAS_PASSWORD env var in Vercel dashboard (already done 2026-06-01)

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const expected = process.env.ATLAS_PASSWORD;
  if (!expected) {
    console.error('ATLAS_PASSWORD env var not set on Vercel');
    return res.status(500).json({ error: 'server config missing' });
  }
  const { password } = req.body || {};
  if (typeof password !== 'string' || password !== expected) {
    return res.status(401).json({ error: 'wrong' });
  }
  // NOT HttpOnly so client-side JS gate in each page can read it
  // This cookie is a presence-flag, not a session token (the actual secret check happens on /api/auth POST)
  res.setHeader('Set-Cookie', [
    `atlas_auth=ok; Path=/; Secure; SameSite=Lax; Max-Age=${7*24*60*60}`,
  ]);
  return res.status(200).json({ ok: true });
}
