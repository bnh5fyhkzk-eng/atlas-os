// /api/agentic-projects · CRUD for projects on manager-v2
// Step 7 NOTION-INTERACTIVE · brother adds projects

import fs from 'node:fs';
import path from 'node:path';

const STORE_DIR = path.join(process.env.HOME || '/tmp', '.claude/state/agentic-store');
const STORE_FILE = path.join(STORE_DIR, '_projects.json');
let memStore = null;
let counter = 0;

function parseCookie(req, name) {
  const c = req.headers.cookie || '';
  const m = c.split(';').map(s => s.trim()).find(x => x.startsWith(name + '='));
  return m ? m.split('=')[1] : null;
}
function authed(req) { return parseCookie(req, 'atlas_auth') === 'ok'; }

function load() {
  if (memStore) return memStore;
  try {
    fs.mkdirSync(STORE_DIR, { recursive: true });
    if (fs.existsSync(STORE_FILE)) {
      memStore = JSON.parse(fs.readFileSync(STORE_FILE, 'utf8'));
      return memStore;
    }
  } catch (e) {}
  memStore = { projects: [] };
  return memStore;
}

function persist() {
  try {
    fs.mkdirSync(STORE_DIR, { recursive: true });
    fs.writeFileSync(STORE_FILE, JSON.stringify(memStore || {}, null, 2));
  } catch (e) {}
}

export default function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: 'auth required' });
  const method = req.method;
  const body = req.body || {};
  const q = req.query || {};

  if (method === 'GET') {
    const data = load();
    return res.status(200).json({ projects: data.projects });
  }

  if (method === 'POST') {
    const { name, emoji, description, priority, arms, categories } = body;
    if (!name) return res.status(400).json({ error: 'name required' });
    const data = load();
    counter += 1;
    const proj = {
      id: `proj-${Date.now()}-${counter}`,
      name: String(name).substring(0, 80),
      emoji: String(emoji || '📂').substring(0, 8),
      description: String(description || '').substring(0, 500),
      priority: ['P0', 'P1', 'P2'].includes(priority) ? priority : 'P2',
      arms: Array.isArray(arms) ? arms.slice(0, 16) : [],
      categories: Array.isArray(categories) ? categories.slice(0, 32) : [],
      created_at: new Date().toISOString(),
    };
    data.projects.push(proj);
    persist();
    return res.status(200).json({ ok: true, project: proj });
  }

  if (method === 'PUT') {
    const { id, name, emoji, description, priority, arms, categories } = body;
    if (!id) return res.status(400).json({ error: 'id required' });
    const data = load();
    const p = data.projects.find(x => x.id === id);
    if (!p) return res.status(404).json({ error: 'project not found' });
    if (name !== undefined) p.name = String(name).substring(0, 80);
    if (emoji !== undefined) p.emoji = String(emoji).substring(0, 8);
    if (description !== undefined) p.description = String(description).substring(0, 500);
    if (['P0', 'P1', 'P2'].includes(priority)) p.priority = priority;
    if (Array.isArray(arms)) p.arms = arms.slice(0, 16);
    if (Array.isArray(categories)) p.categories = categories.slice(0, 32);
    p.updated_at = new Date().toISOString();
    persist();
    return res.status(200).json({ ok: true, project: p });
  }

  if (method === 'DELETE') {
    const { id } = { ...q, ...body };
    if (!id) return res.status(400).json({ error: 'id required' });
    const data = load();
    const idx = data.projects.findIndex(x => x.id === id);
    if (idx < 0) return res.status(404).json({ error: 'project not found' });
    data.projects.splice(idx, 1);
    persist();
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
