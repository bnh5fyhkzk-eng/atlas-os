// Real /api/notes · POST stores user-notes per itemId · cookie-gated
// Per CONNECT-PLAN tier E.1 + brother direct overnight feature
// v1 storage · in-memory map (resets on cold-start) · v2 will use Vercel KV or Supabase
//
// POST · {itemId, text} → stores · returns {ok:true}
// GET · ?itemId=X → returns {text, updatedAt} OR 404
// DELETE · ?itemId=X → removes

const notes = new Map();

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required · login first' });
  }
  if (req.method === 'POST') {
    const { itemId, text } = req.body || {};
    if (!itemId || typeof itemId !== 'string') {
      return res.status(400).json({ error: 'itemId required' });
    }
    if (typeof text !== 'string') {
      return res.status(400).json({ error: 'text required' });
    }
    if (text.trim()) {
      notes.set(itemId, {
        text: text.trim().substring(0, 4000),
        updatedAt: new Date().toISOString(),
      });
    } else {
      notes.delete(itemId);
    }
    return res.status(200).json({ ok: true, count: notes.size });
  }
  if (req.method === 'GET') {
    const itemId = (req.query && req.query.itemId) || '';
    if (!itemId) {
      // List all
      return res.status(200).json({ count: notes.size, items: Array.from(notes.keys()).slice(0, 100) });
    }
    const n = notes.get(itemId);
    if (!n) return res.status(404).json({ error: 'not found' });
    return res.status(200).json(n);
  }
  if (req.method === 'DELETE') {
    const itemId = (req.query && req.query.itemId) || '';
    if (!itemId) return res.status(400).json({ error: 'itemId required' });
    notes.delete(itemId);
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: 'method not allowed' });
}
