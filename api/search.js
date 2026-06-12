// Vercel Function · /api/search · semantic house search (GOAL: nervous system)
// 2026-06-12 · gemini-embedding free tier · pgvector match_nodes RPC.
// POST { q } → { results: [{node_id, similarity}] }
// POST { embed: [texts] } → { vectors } (used by me-house-embed.py backfill)
import { nativeKeyFor } from "./providers.js";

const EMBED_MODEL = "gemini-embedding-001";

async function embedOnce(key, texts) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:batchEmbedContents`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        requests: texts.map((t) => ({
          model: `models/${EMBED_MODEL}`,
          content: { parts: [{ text: String(t).slice(0, 6000) }] },
          outputDimensionality: 768,
        })),
      }),
    },
  );
  if (!r.ok) throw new Error((await r.text()).slice(0, 300));
  const j = await r.json();
  return (j.embeddings || []).map((e) => e.values);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const token = process.env.ATLAS_ARM_TOKEN;
  const auth = req.headers.authorization || "";
  const cookieOk = (req.headers.cookie || "").includes("atlas_auth=ok");
  if (!cookieOk && (!token || auth !== `Bearer ${token}`)) {
    return res.status(401).json({ error: "auth required" });
  }
  const key = await nativeKeyFor("google").catch(() => null);
  if (!key) return res.status(500).json({ error: "no google key" });
  // two quota pools · vault key first, AI-Studio fallback on 429 (free tier daily caps)
  const embed = async (k, texts) => {
    try { return await embedOnce(k, texts); }
    catch (e) {
      if (String(e).includes("429") && process.env.GOOGLE_FALLBACK_KEY && k !== process.env.GOOGLE_FALLBACK_KEY) {
        return embedOnce(process.env.GOOGLE_FALLBACK_KEY, texts);
      }
      throw e;
    }
  };

  const { q, embed: texts, match_count } = req.body || {};
  try {
    if (Array.isArray(texts)) {
      const vectors = await embed(key, texts.slice(0, 50));
      return res.status(200).json({ vectors });
    }
    if (!q) return res.status(400).json({ error: "q or embed required" });
    const [qv] = await embed(key, [q]);
    const sb = await fetch(`${process.env.VITE_SUPABASE_URL}/rest/v1/rpc/match_nodes`, {
      method: "POST",
      headers: {
        apikey: process.env.VITE_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.VITE_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query_embedding: qv, match_count: match_count || 8 }),
    });
    if (!sb.ok) return res.status(502).json({ error: (await sb.text()).slice(0, 300) });
    return res.status(200).json({ results: await sb.json() });
  } catch (e) {
    return res.status(502).json({ error: String(e).slice(0, 300) });
  }
}
