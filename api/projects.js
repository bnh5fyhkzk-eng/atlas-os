// Step 6 · /api/projects CRUD · cookie-gated
// GET list · POST create · GET single · PUT update
//
// v1 · in-memory · resets cold-start
// v2 · gist-backed persistence

const store = new Map();
let counter = 0;

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required' });
  }
  if (req.method === 'GET') {
    const slug = (req.query && req.query.slug) || '';
    if (slug) {
      const p = store.get(slug);
      if (!p) return res.status(404).json({ error: 'not found', slug });
      return res.status(200).json(p);
    }
    return res.status(200).json({ count: store.size, projects: Array.from(store.values()) });
  }
  if (req.method === 'POST') {
    const { slug, name, owner_arm, priority, description } = req.body || {};
    if (!slug || !name) return res.status(400).json({ error: 'slug + name required' });
    counter += 1;
    const project = {
      slug: String(slug).substring(0, 64),
      name: String(name).substring(0, 200),
      owner_arm: owner_arm || 'unassigned',
      priority: priority || 'P2',
      description: (description || '').substring(0, 2000),
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      blocks: [],
    };
    store.set(project.slug, project);
    return res.status(200).json(project);
  }
  if (req.method === 'PUT') {
    const { slug } = req.query || {};
    if (!slug) return res.status(400).json({ error: 'slug required' });
    const p = store.get(slug);
    if (!p) return res.status(404).json({ error: 'not found' });
    Object.assign(p, req.body || {}, { updated_at: new Date().toISOString() });
    store.set(slug, p);
    return res.status(200).json(p);
  }
  return res.status(405).json({ error: 'method not allowed' });
}
