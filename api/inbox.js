// /api/inbox · drop anything → DeepSeek categorizes into the right arm/page folder
// confidence ≥80 → filed there · <80 → lands in Inbox page for brother's glance
import { createClient } from "@supabase/supabase-js";

function sb() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });
  const cookie = req.headers.cookie || "";
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  const authed = cookie.includes("atlas_auth=ok") || (process.env.ATLAS_ARM_TOKEN && bearer === process.env.ATLAS_ARM_TOKEN);
  if (!authed) return res.status(401).json({ error: "auth required" });

  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ error: "text required" });

  const db = sb();
  const { data: navs } = await db.from("atlas_nav").select("id,title,template").eq("archived", false);
  const { data: folders } = await db.from("atlas_nodes").select("id,nav_id,title").eq("kind", "folder").eq("archived", false);
  const inboxNav = (navs ?? []).find((n) => n.title === "Inbox");

  const catalog = (folders ?? []).map((f) => {
    const nav = (navs ?? []).find((n) => n.id === f.nav_id);
    return { id: f.id, nav_id: f.nav_id, label: `${nav?.title ?? "?"} / ${f.title}` };
  });

  let target = null;
  let confidence = 0;
  let title = text.trim().split("\n")[0].slice(0, 60);

  try {
    const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        response_format: { type: "json_object" },
        max_tokens: 200,
        messages: [{
          role: "user",
          content:
            `Categorize this dropped item into one folder. Folders:\n` +
            catalog.map((c, i) => `${i}: ${c.label}`).join("\n") +
            `\n\nItem:\n${text.slice(0, 1500)}\n\n` +
            `Output strict JSON: {"folder_index": <number or -1 if none fits>, "confidence": <0-100>, "title": "<short title max 8 words>"}`,
        }],
      }),
    });
    const j = await r.json();
    const out = JSON.parse(j.choices?.[0]?.message?.content ?? "{}");
    confidence = Number(out.confidence) || 0;
    if (out.title) title = String(out.title).slice(0, 80);
    if (out.folder_index >= 0 && catalog[out.folder_index]) target = catalog[out.folder_index];
  } catch { /* fall through to inbox */ }

  const blocks = text.split(/\n+/).filter(Boolean).map((l) => ({ type: "paragraph", content: [{ type: "text", text: l, styles: {} }] }));
  const filed = target && confidence >= 80;
  const { data: note, error } = await db.from("atlas_nodes").insert({
    nav_id: filed ? target.nav_id : (inboxNav?.id ?? target?.nav_id),
    parent_id: filed ? target.id : null,
    kind: "note",
    title,
    emoji: "📥",
    content: blocks,
    proofs: [{ label: filed ? `auto-filed · ${confidence}%` : `inbox · ${confidence}% unsure`, kind: "ai" }],
    created_by: "inbox:deepseek-v3",
  }).select("id").single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json({ ok: true, note_id: note.id, filed: Boolean(filed), where: filed ? target.label : "Inbox", confidence });
}
