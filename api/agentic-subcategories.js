// /api/agentic-subcategories · CRUD nested under category
// Step 2 NOTION-INTERACTIVE · brother creates subcategories inline

import fs from 'node:fs';
import path from 'node:path';

const STORE_DIR = path.join(process.env.HOME || '/tmp', '.claude/state/agentic-store');
const memStore = new Map();
let counter = 0;

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
  const method = req.method;
  const body = req.body || {};
  const q = req.query || {};

  if (method === 'GET') {
    const { arm, categoryId } = q;
    if (!arm || !categoryId) return res.status(400).json({ error: 'arm + categoryId required' });
    const data = loadArm(arm);
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    return res.status(200).json({ arm, categoryId, subcategories: cat.subcategories || [] });
  }

  if (method === 'POST') {
    const { arm, categoryId, name, description, order } = body;
    if (!arm || !categoryId || !name) return res.status(400).json({ error: 'arm + categoryId + name required' });
    const data = loadArm(arm);
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    cat.subcategories = cat.subcategories || [];
    counter += 1;
    const sub = {
      id: `sub-${Date.now()}-${counter}`,
      name: String(name).substring(0, 64),
      description: String(description || '').substring(0, 500),
      notes: [],
      order: typeof order === 'number' ? order : cat.subcategories.length,
      created_at: new Date().toISOString(),
    };
    cat.subcategories.push(sub);
    persistArm(arm);
    return res.status(200).json({ ok: true, subcategory: sub });
  }

  if (method === 'PUT') {
    const { arm, categoryId, id, name, description, order } = body;
    if (!arm || !categoryId || !id) return res.status(400).json({ error: 'arm + categoryId + id required' });
    const data = loadArm(arm);
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    const sub = (cat.subcategories || []).find(s => s.id === id);
    if (!sub) return res.status(404).json({ error: 'subcategory not found' });
    if (name !== undefined) sub.name = String(name).substring(0, 64);
    if (description !== undefined) sub.description = String(description).substring(0, 500);
    if (typeof order === 'number') sub.order = order;
    sub.updated_at = new Date().toISOString();
    persistArm(arm);
    return res.status(200).json({ ok: true, subcategory: sub });
  }

  if (method === 'DELETE') {
    const { arm, categoryId, id } = { ...q, ...body };
    if (!arm || !categoryId || !id) return res.status(400).json({ error: 'arm + categoryId + id required' });
    const data = loadArm(arm);
    const cat = data.categories.find(c => c.id === categoryId);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    const idx = (cat.subcategories || []).findIndex(s => s.id === id);
    if (idx < 0) return res.status(404).json({ error: 'subcategory not found' });
    cat.subcategories.splice(idx, 1);
    persistArm(arm);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
