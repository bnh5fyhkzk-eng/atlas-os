// Step 4+5 · /api/blocks · cookie-gated · GET ?arm=X · POST {arm, blocks}
// In-memory store (resets cold-start) · v2 persist to upstream

const store = new Map();
let saveLog = [];

const VALID_ARMS = ['pascal', 'curiosity', 'research', 'dream', 'infra', 'code', 'hermes', 'charle'];

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required · login first' });
  }
  if (req.method === 'POST') {
    const { arm, blocks } = req.body || {};
    if (!arm || !VALID_ARMS.includes(arm)) {
      return res.status(400).json({ error: 'invalid arm', valid: VALID_ARMS });
    }
    if (!Array.isArray(blocks)) {
      return res.status(400).json({ error: 'blocks must be array' });
    }
    if (blocks.length > 200) {
      return res.status(400).json({ error: 'max 200 blocks' });
    }
    const now = new Date().toISOString();
    const trimmed = blocks.slice(0, 200).map(b => ({
      id: String(b.id || '').substring(0, 32),
      type: String(b.type || 'paragraph').substring(0, 32),
      props: b.props || {},
      content: typeof b.content === 'string' ? b.content.substring(0, 8000) : '',
      updated_at: now,
    }));
    store.set(arm, { arm, blocks: trimmed, updated_at: now });
    saveLog.push({ arm, count: trimmed.length, at: now });
    if (saveLog.length > 50) saveLog.shift();
    return res.status(200).json({ ok: true, arm, count: trimmed.length, updated_at: now });
  }
  if (req.method === 'GET') {
    const arm = (req.query && req.query.arm) || '';
    if (!arm) {
      return res.status(200).json({
        arms_stored: Array.from(store.keys()),
        save_log_recent: saveLog.slice(-10),
      });
    }
    if (!VALID_ARMS.includes(arm)) {
      return res.status(400).json({ error: 'invalid arm' });
    }
    const data = store.get(arm);
    if (!data) {
      return res.status(404).json({ error: 'not yet saved', arm });
    }
    return res.status(200).json(data);
  }
  return res.status(405).json({ error: 'method not allowed' });
}
