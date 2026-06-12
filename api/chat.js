// /api/chat · LLM call via OpenRouter · tool-calling loop server-side · GOAL-V3-ARMS-ALIVE
// Tools: create_note · search_folders · add_event — the arm ACTS, not just talks.
// Flow: call w/ tools (non-stream) → execute tool_calls against Supabase →
// emit tool events as SSE → final streaming answer with usage.
import { createClient } from "@supabase/supabase-js";

export const config = { supportsResponseStreaming: true };

const TOOLS = [
  {
    type: "function",
    function: {
      name: "create_note",
      description: "Create a note inside one of this arm's project folders. Use for plans, findings, summaries worth keeping.",
      parameters: {
        type: "object",
        properties: {
          folder_title: { type: "string", description: "Title of an existing folder in this arm (fuzzy matched)" },
          title: { type: "string" },
          markdown: { type: "string", description: "Note body as markdown" },
        },
        required: ["folder_title", "title"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_folders",
      description: "Search this arm's folders and notes by text before answering questions about prior work.",
      parameters: {
        type: "object",
        properties: { query: { type: "string" } },
        required: ["query"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_event",
      description: "Add a calendar event.",
      parameters: {
        type: "object",
        properties: {
          title: { type: "string" },
          starts_at: { type: "string", description: "ISO datetime" },
        },
        required: ["title", "starts_at"],
      },
    },
  },
];

function sb() {
  return createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

// markdown → minimal BlockNote paragraphs (keeps it simple + valid)
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

async function runTool(name, args, navId, model) {
  const db = sb();
  if (name === "create_note") {
    // V4-APPROVALS · ASK-mode arms write as PENDING · brother approves in Proposals page
    const { data: cap } = await db.from("atlas_arm_capabilities").select("config").eq("nav_id", navId).eq("capability", "autonomy").maybeSingle();
    const ask = cap?.config?.mode === "ask";
    const byPrefix = ask ? `tool:PENDING:${model}` : `tool:${model}`;
    const { data: folders } = await db.from("atlas_nodes").select("id,title").eq("nav_id", navId).eq("kind", "folder").eq("archived", false);
    const q = String(args.folder_title || "").toLowerCase();
    const folder = (folders ?? []).find((f) => f.title.toLowerCase() === q) ??
      (folders ?? []).find((f) => f.title.toLowerCase().includes(q) || q.includes(f.title.toLowerCase()));
    let parentId = folder?.id ?? null;
    if (!parentId) {
      const { data: created } = await db.from("atlas_nodes")
        .insert({ nav_id: navId, kind: "folder", title: args.folder_title || "Notes", emoji: "📁", created_by: byPrefix })
        .select("id").single();
      parentId = created?.id ?? null;
    }
    const { data: note, error } = await db.from("atlas_nodes")
      .insert({
        nav_id: navId, parent_id: parentId, kind: "note",
        title: args.title, emoji: "📝",
        content: mdToBlocks(args.markdown),
        proofs: [{ label: `written by ${model}`, kind: "ai" }],
        created_by: byPrefix,
      })
      .select("id,title").single();
    if (error) return { error: error.message };
    return { ok: true, note_id: note.id, note_title: note.title, folder_id: parentId, pending_approval: ask };
  }
  if (name === "search_folders") {
    const { data } = await db.from("atlas_nodes").select("id,title,kind,parent_id").eq("nav_id", navId).eq("archived", false).ilike("title", `%${args.query}%`).limit(10);
    return { results: data ?? [] };
  }
  if (name === "add_event") {
    const { error } = await db.from("atlas_events").insert({ title: args.title, starts_at: args.starts_at, source: `tool:${model}` });
    return error ? { error: error.message } : { ok: true };
  }
  return { error: "unknown tool" };
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method not allowed" });

  const cookie = req.headers.cookie || "";
  const bearer = (req.headers.authorization || "").replace("Bearer ", "");
  const authed = cookie.includes("atlas_auth=ok") || (process.env.ATLAS_ARM_TOKEN && bearer === process.env.ATLAS_ARM_TOKEN);
  if (!authed) return res.status(401).json({ error: "auth required" });

  const { model, messages, system, nav_id, use_tools } = req.body || {};
  if (!model || !Array.isArray(messages)) return res.status(400).json({ error: "model + messages required" });

  // native-key-first routing (V5-A) · brother's own keys are cheaper · OpenRouter fallback
  const NATIVE = {
    "openai/": { provider: "openai", base: "https://api.openai.com/v1" },
    "google/": { provider: "google", base: "https://generativelanguage.googleapis.com/v1beta/openai" },
    "x-ai/": { provider: "xai", base: "https://api.x.ai/v1" },
  };
  let base = "https://openrouter.ai/api/v1";
  let callKey = process.env.OPENROUTER_API_KEY;
  let callModel = model;
  const pfx = Object.keys(NATIVE).find((p) => model.startsWith(p));
  if (pfx) {
    const { nativeKeyFor } = await import("./providers.js");
    const nk = await nativeKeyFor(NATIVE[pfx].provider).catch(() => null);
    if (nk) {
      base = NATIVE[pfx].base;
      callKey = nk;
      callModel = model.slice(pfx.length);
    }
  } else {
    const { nativeKeyFor } = await import("./providers.js");
    const ork = await nativeKeyFor("openrouter").catch(() => null);
    if (ork) callKey = ork;
  }
  if (!callKey) return res.status(500).json({ error: "no provider key available" });

  const callOnce = (theBase, theKey, theModel, body) =>
    fetch(`${theBase}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${theKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://atlasos.me",
        "X-Title": "Atlas-OS",
      },
      body: JSON.stringify({
        max_tokens: 2048,
        ...body,
        model: theModel,
        ...(theBase.includes("openrouter.ai")
          ? { transforms: ["middle-out"], provider: { sort: "price" } }
          : {}),
      }),
    });

  // QUOTA-PROOF chain (brother hit raw 429 · 2026-06-12 16:32) · google native →
  // AI-Studio fallback key → OpenRouter same model (pennies) · raw quota errors never
  // reach the house
  const or = async (body) => {
    let r = await callOnce(base, callKey, callModel, body);
    if (r.status === 429 && base.includes("googleapis") ) {
      if (process.env.GOOGLE_FALLBACK_KEY && callKey !== process.env.GOOGLE_FALLBACK_KEY) {
        r = await callOnce(base, process.env.GOOGLE_FALLBACK_KEY, callModel, body);
      }
      if (r.status === 429 && process.env.OPENROUTER_API_KEY) {
        r = await callOnce("https://openrouter.ai/api/v1", process.env.OPENROUTER_API_KEY, model, body);
      }
    }
    return r;
  };

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  const convo = [...(system ? [{ role: "system", content: system }] : []), ...messages];
  const toolsOn = Boolean(use_tools && nav_id);

  try {
    // tool loop · max 4 rounds · non-streaming
    if (toolsOn) {
      for (let round = 0; round < 4; round++) {
        const r = await or({ model, messages: convo, tools: TOOLS, tool_choice: "auto" });
        if (!r.ok) {
          res.write(`data: ${JSON.stringify({ atlas_error: (await r.text()).slice(0, 300) })}\n\n`);
          return res.end();
        }
        const j = await r.json();
        const msg = j.choices?.[0]?.message;
        const calls = msg?.tool_calls;
        if (!calls || calls.length === 0) {
          // no tools wanted · stream the final answer fresh for typing feel
          break;
        }
        convo.push(msg);
        for (const c of calls) {
          let args = {};
          try { args = JSON.parse(c.function.arguments || "{}"); } catch { /* empty */ }
          // surface tool event to UI as chip
          res.write(`data: ${JSON.stringify({ atlas_tool: { name: c.function.name, args } })}\n\n`);
          const result = await runTool(c.function.name, args, nav_id, model);
          res.write(`data: ${JSON.stringify({ atlas_tool_result: { name: c.function.name, result } })}\n\n`);
          convo.push({ role: "tool", tool_call_id: c.id, content: JSON.stringify(result) });
        }
      }
    }

    // final streaming answer (usage accounting is OpenRouter-only · native APIs reject the field)
    const isOpenRouter = base.includes("openrouter.ai");
    const upstream = await or({ model, stream: true, messages: convo, ...(isOpenRouter ? { usage: { include: true } } : {}) });
    if (!upstream.ok) {
      res.write(`data: ${JSON.stringify({ atlas_error: (await upstream.text()).slice(0, 300) })}\n\n`);
      return res.end();
    }
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(decoder.decode(value, { stream: true }));
    }
  } catch (e) {
    res.write(`data: ${JSON.stringify({ atlas_error: String(e).slice(0, 300) })}\n\n`);
  } finally {
    res.end();
  }
}
