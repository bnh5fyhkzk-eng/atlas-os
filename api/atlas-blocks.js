// /api/atlas-blocks · server-side block CRUD via Supabase
// Per FOUNDATION-REBUILD Phase 2 · Hermes-DeepSeek writes here
// Uses publishable anon key · RLS policies permissive · cookie-gated
import { createClient } from "@supabase/supabase-js";

const URL  = process.env.VITE_SUPABASE_URL  || process.env.SUPABASE_URL;
const KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
          || process.env.VITE_SUPABASE_ANON_KEY
          || process.env.SUPABASE_ANON_KEY;

let _client = null;
function client() {
  if (_client) return _client;
  if (!URL || !KEY) throw new Error("Missing Supabase URL or KEY env");
  _client = createClient(URL, KEY, { auth: { persistSession: false } });
  return _client;
}

function parseCookie(req, name) {
  const c = req.headers.cookie || "";
  const m = c.split(";").map(s => s.trim()).find(x => x.startsWith(name + "="));
  return m ? m.split("=")[1] : null;
}
function authed(req) {
  // Allow service-role bearer (Hermes) OR atlas_auth cookie (brother)
  const auth = (req.headers.authorization || req.headers.Authorization || "");
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
      const { pageId } = q;
      if (!pageId) return res.status(400).json({ error: "pageId required" });
      const { data, error } = await sb
        .from("atlas_blocks").select("*").eq("page_id", pageId).order("order_idx");
      if (error) throw error;
      return res.status(200).json({ blocks: data });
    }

    if (req.method === "POST") {
      const { page_id, block_type, content, props, order_idx, created_by } = body;
      if (!page_id) return res.status(400).json({ error: "page_id required" });
      const { data, error } = await sb
        .from("atlas_blocks")
        .insert({
          page_id,
          block_type: block_type || "native",
          content: content ?? [],
          props: props ?? {},
          order_idx: order_idx ?? 0,
          created_by: created_by || "atlas",
        })
        .select().single();
      if (error) throw error;
      return res.status(200).json({ block: data });
    }

    if (req.method === "PUT") {
      const { id, content, props, order_idx, block_type } = body;
      if (!id) return res.status(400).json({ error: "id required" });
      const patch = {};
      if (content !== undefined) patch.content = content;
      if (props !== undefined) patch.props = props;
      if (typeof order_idx === "number") patch.order_idx = order_idx;
      if (block_type) patch.block_type = block_type;
      const { data, error } = await sb
        .from("atlas_blocks").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json({ block: data });
    }

    if (req.method === "DELETE") {
      const id = (q.id || body.id);
      if (!id) return res.status(400).json({ error: "id required" });
      const { error } = await sb.from("atlas_blocks").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "method not allowed" });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
