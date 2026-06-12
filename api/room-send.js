// /api/room-send · brother → Atlas room · cookie-verified server-side
// (anon key never writes the room · per final-check security upgrade 22:20)
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });
  const cookie = req.headers.cookie || "";
  if (!cookie.includes("atlas_auth=ok")) return res.status(401).json({ error: "auth required" });

  const { content, context } = req.body || {};
  if (!content || !content.trim()) return res.status(400).json({ error: "content required" });

  const db = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { data, error } = await db.from("atlas_room_messages")
    .insert({ role: "brother", content: content.slice(0, 8000), status: "pending", context: context ?? {} })
    .select("id").single();
  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, id: data.id });
}
