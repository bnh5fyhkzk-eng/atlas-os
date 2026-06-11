// /api/agentic-categories · CRUD per arm
// Step 1 NOTION-INTERACTIVE · brother creates categories inline

import fs from 'node:fs';
import path from 'node:path';

const STORE_DIR = path.join(process.env.HOME || '/tmp', '.claude/state/agentic-store');
const memStore = new Map(); // arm -> { categories: [...] }
let counter = 0;

function parseCookie(req, name) {
  const c = req.headers.cookie || '';
  const m = c.split(';').map(s => s.trim()).find(x => x.startsWith(name + '='));
  return m ? m.split('=')[1] : null;
}
function authed(req) {
  return parseCookie(req, 'atlas_auth') === 'ok';
}

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
    const p = path.join(STORE_DIR, `${arm}.json`);
    fs.writeFileSync(p, JSON.stringify(memStore.get(arm) || {}, null, 2));
  } catch (e) {}
}

export default function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: 'auth required' });
  const method = req.method;
  const body = req.body || {};
  const q = req.query || {};

  if (method === 'GET') {
    const { arm } = q;
    if (!arm) return res.status(400).json({ error: 'arm required' });
    const data = loadArm(arm);
    return res.status(200).json({ arm, categories: data.categories });
  }

  if (method === 'POST') {
    const { arm, name, emoji, description, order } = body;
    if (!arm || !name) return res.status(400).json({ error: 'arm + name required' });
    const data = loadArm(arm);
    counter += 1;
    const cat = {
      id: `cat-${Date.now()}-${counter}`,
      name: String(name).substring(0, 64),
      emoji: String(emoji || '📁').substring(0, 8),
      description: String(description || '').substring(0, 500),
      subcategories: [],
      order: typeof order === 'number' ? order : data.categories.length,
      created_at: new Date().toISOString(),
    };
    data.categories.push(cat);
    persistArm(arm);
    return res.status(200).json({ ok: true, category: cat });
  }

  if (method === 'PUT') {
    const { arm, id, name, emoji, description, order } = body;
    if (!arm || !id) return res.status(400).json({ error: 'arm + id required' });
    const data = loadArm(arm);
    const cat = data.categories.find(c => c.id === id);
    if (!cat) return res.status(404).json({ error: 'category not found' });
    if (name !== undefined) cat.name = String(name).substring(0, 64);
    if (emoji !== undefined) cat.emoji = String(emoji).substring(0, 8);
    if (description !== undefined) cat.description = String(description).substring(0, 500);
    if (typeof order === 'number') cat.order = order;
    cat.updated_at = new Date().toISOString();
    persistArm(arm);
    return res.status(200).json({ ok: true, category: cat });
  }

  if (method === 'DELETE') {
    const { arm, id } = { ...q, ...body };
    if (!arm || !id) return res.status(400).json({ error: 'arm + id required' });
    const data = loadArm(arm);
    const idx = data.categories.findIndex(c => c.id === id);
    if (idx < 0) return res.status(404).json({ error: 'category not found' });
    data.categories.splice(idx, 1);
    persistArm(arm);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
