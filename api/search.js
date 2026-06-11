// Semantic /api/search · queries brain v3 via Hostinger-Hermes RRF endpoint
// Falls back to keyword search via gemma-tiered.json if brain endpoint unavailable

const BRAIN_RRF_URL = process.env.BRAIN_RRF_URL || '';

async function brainQuery(q) {
  if (!BRAIN_RRF_URL) return null;
  try {
    const r = await fetch(`${BRAIN_RRF_URL}?q=${encodeURIComponent(q)}&limit=20`);
    if (r.ok) return r.json();
  } catch (e) {}
  return null;
}

async function keywordFallback(q) {
  try {
    const r = await fetch('https://atlasos.me/gemma-tiered.json', {cache:'no-store'});
    const d = await r.json();
    const matches = [];
    const ql = q.toLowerCase();
    for (const [tier, td] of Object.entries(d.tiers || {})) {
      for (const [sub, sd] of Object.entries(td.subs || {})) {
        for (const [prio, pd] of Object.entries(sd.subsubs || {})) {
          for (const it of pd.items || []) {
            const text = ((it.source_filename || '') + ' ' + (it.summary || '')).toLowerCase();
            if (text.includes(ql)) matches.push({ ...it, _tier: tier, _sub: sub, _prio: prio });
          }
        }
      }
    }
    return matches.slice(0, 20);
  } catch (e) {
    return [];
  }
}

export default async function handler(req, res) {
  const q = (req.query?.q || '').trim();
  if (!q) return res.status(400).json({ error: 'q required' });
  const semantic = await brainQuery(q);
  if (semantic) return res.status(200).json({ source: 'brain-rrf', results: semantic });
  const fallback = await keywordFallback(q);
  return res.status(200).json({ source: 'keyword-fallback', results: fallback, note: 'BRAIN_RRF_URL env not set · using keyword search' });
}
