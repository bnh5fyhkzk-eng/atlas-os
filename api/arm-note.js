// /api/arm-note · arms (Mac-mini cycle) write notes into their own folders · Bearer ATLAS_ARM_TOKEN
// GET ?slug=curiosity → {nav_id, paused, folders:[{id,title}]}
// POST {slug, folder_title, title, markdown, created_by} → creates note
import { createClient } from "@supabase/supabase-js";

function sb() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

function mdToBlocks(md) {
  return String(md || "")
    .split(/\n+/)
    .filter((l) => l.trim())
    .map((line) => {
      const h = line.match(/^(#{1,3})\s+(.*)/);
      if (h) return { type: "heading", props: { level: h[1].length }, content: [{ type: "text", text: h[2], styles: {} }] };
      return { type: "paragraph", content: [{ type: "text", text: line, styles: {} }] };
    });
}

export default async function handler(req, res) {
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  if (!process.env.ATLAS_ARM_TOKEN || bearer !== process.env.ATLAS_ARM_TOKEN) {
    return res.status(401).json({ error: "auth required" });
  }
  const db = sb();

  if (req.method === "GET") {
    const slug = req.query.slug;
    const { data: nav } = await db.from("atlas_nav").select("id,paused,model").eq("agent_slug", slug).eq("archived", false).maybeSingle();
    if (!nav) return res.status(404).json({ error: "arm not found" });
    const { data: folders } = await db.from("atlas_nodes").select("id,title").eq("nav_id", nav.id).eq("kind", "folder").eq("archived", false);
    return res.status(200).json({ nav_id: nav.id, paused: nav.paused, model: nav.model, folders: folders ?? [] });
  }

  if (req.method === "POST") {
    const { slug, folder_title, title, markdown, created_by } = req.body || {};
    if (!slug || !title) return res.status(400).json({ error: "slug + title required" });
    const { data: nav } = await db.from("atlas_nav").select("id,paused").eq("agent_slug", slug).eq("archived", false).maybeSingle();
    if (!nav) return res.status(404).json({ error: "arm not found" });
    if (nav.paused) return res.status(200).json({ skipped: "arm paused" });

    const { data: folders } = await db.from("atlas_nodes").select("id,title").eq("nav_id", nav.id).eq("kind", "folder").eq("archived", false);
    const q = String(folder_title || "Auto").toLowerCase();
    let folder = (folders ?? []).find((f) => f.title.toLowerCase() === q) ??
      (folders ?? []).find((f) => f.title.toLowerCase().includes(q));
    if (!folder) {
      const { data: created } = await db.from("atlas_nodes")
        .insert({ nav_id: nav.id, kind: "folder", title: folder_title || "Auto", emoji: "🤖", created_by: created_by || "cycle" })
        .select("id,title").single();
      folder = created;
    }
    const { data: note, error } = await db.from("atlas_nodes")
      .insert({
        nav_id: nav.id, parent_id: folder.id, kind: "note",
        title, emoji: "📝", content: mdToBlocks(markdown),
        proofs: [{ label: created_by || "cycle", kind: "ai" }],
        created_by: created_by || "cycle",
      })
      .select("id").single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, note_id: note.id, folder: folder.title });
  }

  return res.status(405).json({ error: "method not allowed" });
}
