// Vercel Function · /api/studio · live Google AI Studio model catalog
// Per brother direct 2026-06-12 · "see all the free options google studio has · add a studio page"
// Lists every model the google key can reach, grouped by capability, free/paid tagged.
import { nativeKeyFor } from "./providers.js";

// media generation = paid on free tier (verified 2026-06-12); text/embed = free
function tier(name) {
  const n = name.toLowerCase();
  if (n.includes("imagen") || n.includes("veo") || n.includes("lyria") ||
      n.includes("banana") || n.includes("-image")) return "paid";
  return "free";
}
function group(name) {
  const n = name.toLowerCase();
  if (n.includes("imagen") || n.includes("banana") || n.includes("-image")) return "🖼️ image";
  if (n.includes("veo") || n.includes("video")) return "🎬 video";
  if (n.includes("tts") || n.includes("audio") || n.includes("lyria") || n.includes("speech")) return "🔊 audio + music";
  if (n.includes("embedding")) return "🧠 embedding";
  if (n.includes("deep-research")) return "🔬 deep research";
  if (n.includes("robot") || n.includes("computer-use") || n.includes("antigravity")) return "🤖 agents + robotics";
  if (n.includes("live") || n.includes("translate")) return "📞 real-time";
  if (n.includes("gemma")) return "💎 open (gemma)";
  if (n.includes("pro")) return "🧩 thinking (pro)";
  if (n.includes("flash")) return "⚡ flash";
  return "· other";
}

export default async function handler(req, res) {
  const cookieOk = (req.headers.cookie || "").includes("atlas_auth=ok");
  const token = process.env.ATLAS_ARM_TOKEN;
  const auth = req.headers.authorization || "";
  if (!cookieOk && auth !== `Bearer ${token}`) return res.status(401).json({ error: "auth required" });

  const key = await nativeKeyFor("google").catch(() => null);
  if (!key) return res.status(500).json({ error: "no google key in Providers" });

  const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", {
    headers: { "x-goog-api-key": key },
  });
  if (!r.ok) return res.status(502).json({ error: (await r.text()).slice(0, 300) });
  const j = await r.json();
  const grouped = {};
  for (const m of j.models || []) {
    const name = m.name.replace("models/", "");
    const g = group(name);
    (grouped[g] ||= []).push({
      id: name,
      label: m.displayName || name,
      desc: (m.description || "").slice(0, 140),
      tier: tier(name),
      methods: m.supportedGenerationMethods || [],
    });
  }
  return res.status(200).json({ total: (j.models || []).length, groups: grouped });
}
