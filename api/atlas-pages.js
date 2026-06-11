// /api/atlas-pages · page tree CRUD
// Per FOUNDATION-REBUILD Phase 1+3
import { createClient } from "@supabase/supabase-js";

const URL  = process.env.VITE_SUPABASE_URL  || process.env.SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
          || process.env.VITE_SUPABASE_ANON_KEY
          || process.env.SUPABASE_ANON_KEY;

let _c = null;
function client() {
  if (_c) return _c;
  if (!URL || !KEY) throw new Error("Missing Supabase URL or KEY");
  _c = createClient(URL, KEY, { auth: { persistSession: false } });
  return _c;
}
function parseCookie(req, name) {
  const c = req.headers.cookie || "";
  const m = c.split(";").map(s => s.trim()).find(x => x.startsWith(name + "="));
  return m ? m.split("=")[1] : null;
}
function authed(req) {
  const auth = (req.headers.authorization || "");
  if (auth.startsWith("Bearer ") && auth.slice(7) === process.env.ATLAS_ARM_TOKEN) return true;
  return parseCookie(req, "atlas_auth") === "ok";
}

export default async function handler(req, res) {
  if (!authed(req)) return res.status(401).json({ error: "auth required" });
  const body = req.body || {};
  const q = req.query || {};

  try {
    const sb = client();

    if (req.method === "GET") {
      const { arm, parentId, id } = q;
      if (id) {
        const { data, error } = await sb.from("atlas_pages").select("*").eq("id", id).single();
        if (error) return res.status(404).json({ error: error.message });
        return res.status(200).json({ page: data });
      }
      if (!arm) return res.status(400).json({ error: "arm required" });
      let query = sb.from("atlas_pages").select("*").eq("arm_slug", arm).eq("archived", false).order("order_idx");
      if (parentId === "null" || parentId === undefined) {
        // return all pages for arm (client builds tree)
      } else {
        query = query.eq("parent_id", parentId);
      }
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json({ pages: data });
    }

    if (req.method === "POST") {
      const { arm_slug, parent_id, title, emoji, view_type } = body;
      if (!arm_slug) return res.status(400).json({ error: "arm_slug required" });
      const { data, error } = await sb
        .from("atlas_pages")
        .insert({
          arm_slug,
          parent_id: parent_id || null,
          title: title || "Untitled",
          emoji: emoji || "📄",
          view_type: view_type || "doc",
        })
        .select().single();
      if (error) throw error;
      return res.status(200).json({ page: data });
    }

    if (req.method === "PUT") {
      const { id, ...patch } = body;
      if (!id) return res.status(400).json({ error: "id required" });
      const allowed = ["title","emoji","icon","cover_url","order_idx","view_type","archived","parent_id"];
      const safe = Object.fromEntries(Object.entries(patch).filter(([k]) => allowed.includes(k)));
      const { data, error } = await sb.from("atlas_pages").update(safe).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json({ page: data });
    }

    if (req.method === "DELETE") {
      const id = (q.id || body.id);
      if (!id) return res.status(400).json({ error: "id required" });
      // soft-delete · archive instead of drop (per LADDER #27089)
      const { error } = await sb.from("atlas_pages").update({ archived: true }).eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
