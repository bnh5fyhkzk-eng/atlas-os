// Returns Hermes session token for /chat client-side inject
// Token from env or fallback empty
export default function handler(req, res) {
  const token = process.env.ATLAS_HERMES_TOKEN || '';
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.status(200).json({ token, source: token ? 'env' : 'unset' });
}
