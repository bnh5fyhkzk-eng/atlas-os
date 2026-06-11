// /api/agentic-notes · 5-field schema (WHAT WHY WHEN HOW RECOMMENDATION) per arm/category/subcategory
// Per AGENTIC-OS-MEGA step 3 · brother direct 15:34 · no-erase + interactive

const store = new Map();
let counter = 0;

function parseCookie(req, name) {
  const c = req.headers.cookie || '';
  const m = c.split(';').map(s => s.trim()).find(x => x.startsWith(name + '='));
  return m ? m.split('=')[1] : null;
}

function authed(req) {
  return parseCookie(req, 'atlas_auth') === 'ok';
}

function getPath(arm, cat, sub) {
  if (!store.has(arm)) store.set(arm, new Map());
  const a = store.get(arm);
  if (!a.has(cat)) a.set(cat, new Map());
  const c = a.get(cat);
  if (!c.has(sub)) c.set(sub, []);
  return c.get(sub);
}

export default function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: 'auth required' });
  const method = req.method;

  if (method === 'GET') {
    const { arm, category, subcategory } = req.query || {};
    if (arm && category && subcategory) {
      const notes = store.get(arm)?.get(category)?.get(subcategory) || [];
      return res.status(200).json({ arm, category, subcategory, notes, count: notes.length });
    }
    if (arm) {
      const armData = store.get(arm);
      if (!armData) return res.status(200).json({ arm, categories: [] });
      const cats = [];
      for (const [cat, subs] of armData) {
        const subcats = [];
        let total = 0;
        for (const [sub, notes] of subs) {
          subcats.push({ name: sub, count: notes.length });
          total += notes.length;
        }
        cats.push({ name: cat, subcategories: subcats, total_notes: total });
      }
      return res.status(200).json({ arm, categories: cats });
    }
    const all = {};
    let totalNotes = 0;
    for (const [arm, cats] of store) {
      all[arm] = {};
      for (const [cat, subs] of cats) {
        all[arm][cat] = {};
        for (const [sub, notes] of subs) {
          all[arm][cat][sub] = notes.length;
          totalNotes += notes.length;
        }
      }
    }
    return res.status(200).json({ store: all, total_notes: totalNotes });
  }

  if (method === 'POST') {
    const { arm, category, subcategory, what, why, how, recommendation, when, source } = req.body || {};
    if (!arm || !category || !subcategory || !what) {
      return res.status(400).json({ error: 'arm + category + subcategory + what required' });
    }
    counter += 1;
    const note = {
      id: `note-${Date.now()}-${counter}`,
      what: String(what).substring(0, 1000),
      why: String(why || '').substring(0, 1000),
      when: when || new Date().toISOString(),
      how: String(how || '').substring(0, 1000),
      recommendation: String(recommendation || '').substring(0, 1000),
      source: String(source || 'brother-inline').substring(0, 64),
      created_at: new Date().toISOString(),
    };
    getPath(arm, category, subcategory).push(note);
    return res.status(200).json({ ok: true, note });
  }

  if (method === 'PUT') {
    const { arm, category, subcategory, id, what, why, how, recommendation } = req.body || {};
    if (!arm || !category || !subcategory || !id) {
      return res.status(400).json({ error: 'arm + category + subcategory + id required' });
    }
    const notes = store.get(arm)?.get(category)?.get(subcategory);
    if (!notes) return res.status(404).json({ error: 'subcategory not found' });
    const note = notes.find(n => n.id === id);
    if (!note) return res.status(404).json({ error: 'note not found' });
    if (what !== undefined) note.what = String(what).substring(0, 1000);
    if (why !== undefined) note.why = String(why).substring(0, 1000);
    if (how !== undefined) note.how = String(how).substring(0, 1000);
    if (recommendation !== undefined) note.recommendation = String(recommendation).substring(0, 1000);
    note.updated_at = new Date().toISOString();
    return res.status(200).json({ ok: true, note });
  }

  if (method === 'DELETE') {
    const { arm, category, subcategory, id } = req.query || req.body || {};
    if (!arm || !category || !subcategory || !id) {
      return res.status(400).json({ error: 'arm + category + subcategory + id required' });
    }
    const notes = store.get(arm)?.get(category)?.get(subcategory);
    if (!notes) return res.status(404).json({ error: 'subcategory not found' });
    const idx = notes.findIndex(n => n.id === id);
    if (idx < 0) return res.status(404).json({ error: 'note not found' });
    notes.splice(idx, 1);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'method not allowed' });
}
