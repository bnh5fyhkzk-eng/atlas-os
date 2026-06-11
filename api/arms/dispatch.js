// Step 2 · /api/arms/dispatch backend · cookie-gated arm dispatch
// POST {arm, prompt} → returns {task_id, arm, status, queued_at}
//
// v1 records dispatch intent · v2 wires Hostinger SSH via webhook
// Storage · in-memory FIFO queue (resets cold-start) · v2 Vercel KV

const queue = [];
let counter = 0;

const VALID_ARMS = ['pascal', 'curiosity', 'research', 'dream', 'infra', 'code', 'hermes', 'charle'];

function checkAuth(req) {
  const cookie = req.headers.cookie || '';
  return cookie.includes('atlas_auth=ok');
}

export default function handler(req, res) {
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'auth required · login first' });
  }
  if (req.method === 'POST') {
    const { arm, prompt } = req.body || {};
    if (!arm || !VALID_ARMS.includes(arm)) {
      return res.status(400).json({ error: 'invalid arm', valid: VALID_ARMS });
    }
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt required' });
    }
    counter += 1;
    const task = {
      task_id: `arm-${Date.now()}-${counter}`,
      arm,
      prompt: prompt.substring(0, 4000),
      status: 'queued',
      queued_at: new Date().toISOString(),
    };
    queue.push(task);
    if (queue.length > 100) queue.shift();
    return res.status(200).json(task);
  }
  if (req.method === 'GET') {
    return res.status(200).json({
      queue_depth: queue.length,
      recent: queue.slice(-20),
      valid_arms: VALID_ARMS,
    });
  }
  return res.status(405).json({ error: 'method not allowed' });
}
