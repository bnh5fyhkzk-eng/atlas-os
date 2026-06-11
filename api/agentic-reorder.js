// /api/agentic-reorder · step 9 · drag-reorder categories + subcategories
// PUT {arm, kind:'category|subcategory', categoryId?, order:[id1,id2,...]}
import fs from 'node:fs';
import path from 'node:path';
const STORE_DIR = path.join(process.env.HOME || '/tmp', '.claude/state/agentic-store');
const memStore = new Map();

function parseCookie(req, name) {
  const c = req.headers.cookie || '';
  const m = c.split(';').map(s => s.trim()).find(x => x.startsWith(name + '='));
  return m ? m.split('=')[1] : null;
}
function authed(req) { return parseCookie(req, 'atlas_auth') === 'ok'; }

function loadArm(arm) {
  if (memStore.has(arm)) return memStore.get(arm);
  try {
    fs.mkdirSync(STORE_DIR, { recursive: true });
    const p = path.join(STORE_DIR, `${arm}.json`);
    if (fs.existsSync(p)) {
      const d = JSON.parse(fs.readFileSync(p, 'utf8'));
      memStore.set(arm, d);
      return d;
    }
  } catch (e) {}
  const fresh = { categories: [] };
  memStore.set(arm, fresh);
  return fresh;
}
function persistArm(arm) {
  try {
    fs.mkdirSync(STORE_DIR, { recursive: true });
    fs.writeFileSync(path.join(STORE_DIR, `${arm}.json`), JSON.stringify(memStore.get(arm) || {}, null, 2));
  } catch (e) {}
}

export default function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: 'auth required' });
  if (req.method !== 'PUT' && req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const { arm, kind, categoryId, order } = req.body || {};
  if (!arm || !kind || !Array.isArray(order)) return res.status(400).json({ error: 'arm + kind + order array required' });
  const data = loadArm(arm);
  if (kind === 'category') {
    const map = new Map(data.categories.map(c => [c.id, c]));
    const reordered = order.filter(id => map.has(id)).map((id, i) => { const c = map.get(id); c.order = i; return c; });
    const missing = data.categories.filter(c => !order.includes(c.id));
    data.categories = [...reordered, ...missing];
    persistArm(arm);
    return res.status(200).json({ ok: true, reordered: reordered.length });
  }
  if (kind === 'subcategory') {
    if (!categoryId) return res.status(400).json({ error: 'categoryId required for subcategory reorder' });
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    const map = new Map((cat.subcategories || []).map(s => [s.id, s]));
    const reordered = order.filter(id => map.has(id)).map((id, i) => { const s = map.get(id); s.order = i; return s; });
    const missing = (cat.subcategories || []).filter(s => !order.includes(s.id));
    cat.subcategories = [...reordered, ...missing];
    persistArm(arm);
    return res.status(200).json({ ok: true, reordered: reordered.length });
  }
  return res.status(400).json({ error: 'kind must be category or subcategory' });
}
