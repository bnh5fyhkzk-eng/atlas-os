// /api/atlas-arms · list arms (public-read)
import { createClient } from "@supabase/supabase-js";

const URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let _c = null;
function client() {
  if (_c) return _c;
  if (!URL || !KEY) throw new Error("Missing Supabase URL or KEY");
  _c = createClient(URL, KEY, { auth: { persistSession: false } });
  return _c;
}

export default async function handler(req, res) {
  try {
    const sb = client();
    const { data, error } = await sb.from("atlas_arms").select("*").order("order_idx");
    if (error) throw error;
    return res.status(200).json({ arms: data });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
