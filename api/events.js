// /api/events · Gemma pipe (Mac mini) + manual · POST adds atlas_events row
// Bearer ATLAS_ARM_TOKEN for scripts · cookie for UI
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const cookie = req.headers.cookie || "";
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  const authed = cookie.includes("atlas_auth=ok") || (process.env.ATLAS_ARM_TOKEN && bearer === process.env.ATLAS_ARM_TOKEN);
  if (!authed) return res.status(401).json({ error: "auth required" });
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const { title, starts_at, ends_at, source } = req.body || {};
  if (!title || !starts_at) return res.status(400).json({ error: "title + starts_at required" });

  const db = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data, error } = await db.from("atlas_events")
    .insert({ title, starts_at, ends_at: ends_at ?? null, source: source ?? "gemma" })
    .select("id").single();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, event_id: data.id });
}
