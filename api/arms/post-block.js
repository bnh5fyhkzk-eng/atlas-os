// /api/arms/post-block · arm-token-gated POST endpoint for arms (server-side)
// Per brother direct 04:05 · infrastructure for arms to feed Atlas · structured + categorized
//
// Contract · POST {arm, block: {type, content, props?, category?, priority?, source?, run_id?}}
// Auth · header X-Arm-Token: $ATLAS_ARM_TOKEN (env var · arms have it · cookie not required)
// Validation · block.type must be in registry · category enum · priority P0/P1/P2

const VALID_ARMS = ['pascal', 'curiosity', 'research', 'dream', 'infra', 'code', 'hermes', 'charle'];
const VALID_TYPES = ['paragraph', 'heading', 'todo', 'callout', 'code', 'divider', 'embed', 'database', 'stat-card', 'brain-feed', 'notebooklm-briefing'];
const VALID_CATEGORIES = ['discovery', 'decision', 'action', 'risk', 'win', 'catch', 'research', 'note', 'briefing', 'idea'];
const VALID_PRIORITIES = ['P0', 'P1', 'P2'];

const queue = [];
let counter = 0;

export default function handler(req, res) {
  const armToken = req.headers['x-arm-token'] || '';
  const expected = process.env.ATLAS_ARM_TOKEN || '';
  if (!expected) {
    return res.status(500).json({ error: 'ATLAS_ARM_TOKEN env not set · brother sets on Vercel' });
  }
  if (armToken !== expected) {
    return res.status(401).json({ error: 'invalid arm-token · header X-Arm-Token required' });
  }
  if (req.method === 'POST') {
    const { arm, block } = req.body || {};
    if (!arm || !VALID_ARMS.includes(arm)) {
      return res.status(400).json({ error: 'invalid arm', valid: VALID_ARMS });
    }
    if (!block || typeof block !== 'object') {
      return res.status(400).json({ error: 'block object required' });
    }
    const type = String(block.type || 'paragraph');
    if (!VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: 'invalid block type', valid: VALID_TYPES });
    }
    const category = block.category && VALID_CATEGORIES.includes(block.category) ? block.category : 'note';
    const priority = block.priority && VALID_PRIORITIES.includes(block.priority) ? block.priority : 'P2';
    counter += 1;
    const entry = {
      id: `armpost-${Date.now()}-${counter}`,
      arm,
      block: {
        id: String(block.id || `b-${Date.now()}-${counter}`).substring(0, 32),
        type,
        props: block.props || {},
        content: typeof block.content === 'string' ? block.content.substring(0, 4000) : '',
        category,
        priority,
        source: String(block.source || 'arm-run').substring(0, 64),
        run_id: String(block.run_id || '').substring(0, 64),
      },
      posted_at: new Date().toISOString(),
    };
    queue.push(entry);
    if (queue.length > 200) queue.shift();
    return res.status(200).json({ ok: true, ...entry });
  }
  if (req.method === 'GET') {
    const arm = req.query?.arm;
    const recent = arm ? queue.filter(e => e.arm === arm).slice(-30) : queue.slice(-30);
    return res.status(200).json({
      contract_doc: '/arms-feed-contract.html',
      valid_arms: VALID_ARMS,
      valid_types: VALID_TYPES,
      valid_categories: VALID_CATEGORIES,
      valid_priorities: VALID_PRIORITIES,
      auth: 'header X-Arm-Token · ATLAS_ARM_TOKEN env on Vercel',
      total_posted: queue.length,
      recent,
    });
  }
  return res.status(405).json({ error: 'method not allowed' });
}
