// /api/arm-task · tasks drive arms · Bearer ATLAS_ARM_TOKEN (Mac cycle)
// GET ?slug= → next ready task for that arm (marks running)
// POST {task_id, result_node_id} → done
import { createClient } from "@supabase/supabase-js";

function db() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

export default async function handler(req, res) {
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  if (!process.env.ATLAS_ARM_TOKEN || bearer !== process.env.ATLAS_ARM_TOKEN) {
    return res.status(401).json({ error: "auth required" });
  }
  const d = db();

  if (req.method === "GET") {
    const { data: nav } = await d.from("atlas_nav").select("id").eq("agent_slug", req.query.slug).maybeSingle();
    if (!nav) return res.status(404).json({ error: "arm not found" });
    const { data: task } = await d.from("atlas_tasks").select("*")
      .eq("arm_nav_id", nav.id).eq("state", "ready")
      .order("order_idx").limit(1).maybeSingle();
    if (!task) return res.status(200).json({ task: null });
    await d.from("atlas_tasks").update({ state: "running", updated_at: new Date().toISOString() }).eq("id", task.id);
    return res.status(200).json({ task: { id: task.id, title: task.title, detail: task.detail } });
  }

  if (req.method === "POST") {
    const { task_id, result_node_id } = req.body || {};
    if (!task_id) return res.status(400).json({ error: "task_id required" });
    await d.from("atlas_tasks").update({
      state: "done", result_node_id: result_node_id ?? null, updated_at: new Date().toISOString(),
    }).eq("id", task_id);
    return res.status(200).json({ ok: true });
  }
  return res.status(405).json({ error: "method not allowed" });
}
