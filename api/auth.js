// Vercel Function · /api/auth · password check · sets HttpOnly cookie
// Per v1 atlasos.me login pattern · 2026-06-08 archive · brother direct 2026-06-10 22:09
// Set ATLAS_PASSWORD env var in Vercel dashboard to activate

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  const expected = process.env.ATLAS_PASSWORD;
  if (!expected) {
    return res.status(500).json({ error: 'ATLAS_PASSWORD env not set' });
  }
  const { password } = req.body || {};
  if (typeof password !== 'string' || password !== expected) {
    return res.status(401).json({ error: 'wrong' });
  }
  // Cookie · 7 days · HttpOnly · Secure · SameSite=Lax
  res.setHeader('Set-Cookie', [
    `atlas_auth=ok; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7*24*60*60}`,
  ]);
  return res.status(200).json({ ok: true });
}
