// /api/chat · real LLM call via OpenRouter · Atlas-OS v3 Phase A-real
// Key lives server-side only (OPENROUTER_API_KEY · Vercel env) · streams SSE through.
// Auth: atlas_auth cookie (password-gated UI) OR Bearer ATLAS_ARM_TOKEN (scripts).

export const config = { supportsResponseStreaming: true };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const cookie = req.headers.cookie || "";
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  const authed = cookie.includes("atlas_auth=ok") || (process.env.ATLAS_ARM_TOKEN && bearer === process.env.ATLAS_ARM_TOKEN);
  if (!authed) return res.status(401).json({ error: "auth required" });

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENROUTER_API_KEY not set" });

  const { model, messages, system } = req.body || {};
  if (!model || !Array.isArray(messages)) return res.status(400).json({ error: "model + messages required" });

  const body = {
    model,
    stream: true,
    messages: [...(system ? [{ role: "system", content: system }] : []), ...messages],
  };

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://atlasos.me",
      "X-Title": "Atlas-OS",
    },
    body: JSON.stringify(body),
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    return res.status(upstream.status).json({ error: "provider", detail: text.slice(0, 500) });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
  } finally {
    res.end();
  }
}
