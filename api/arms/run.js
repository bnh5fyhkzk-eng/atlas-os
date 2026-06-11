// /api/arms/run · cookie-gated · POST {arm} → triggers arm-run + returns task_id
// Per brother direct · UI "Run arm now" button calls this
// In production · this POSTs to Hostinger webhook to trigger me-arm-run.sh
// For v1 · returns task_id stub + records intent

const queue = [];
let counter = 0;
const VALID_ARMS = ['pascal', 'curiosity', 'research', 'dream', 'infra', 'code', 'hermes', 'charle'];

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required' });
  }
  if (req.method === 'POST') {
    const { arm } = req.body || {};
    if (!arm || !VALID_ARMS.includes(arm)) {
      return res.status(400).json({ error: 'invalid arm', valid: VALID_ARMS });
    }
    counter += 1;
    const task = {
      task_id: `armrun-${Date.now()}-${counter}`,
      arm,
      status: 'queued',
      queued_at: new Date().toISOString(),
      runner_script: 'me-arm-run.sh',
      output_dir: `~/.claude/state/arm-outputs/${arm}/`,
      hermes_trigger: 'Pull from queue via Hermes-arm SSH (Hostinger 82.25.93.174 per #195) or local cron',
    };
    queue.push(task);
    if (queue.length > 100) queue.shift();
    return res.status(200).json(task);
  }
  if (req.method === 'GET') {
    const arm = req.query?.arm;
    if (arm) {
      const recent = queue.filter(q => q.arm === arm).slice(-10);
      return res.status(200).json({ arm, recent_runs: recent });
    }
    return res.status(200).json({ total_queued: queue.length, recent: queue.slice(-20) });
  }
  return res.status(405).json({ error: 'method not allowed' });
}
