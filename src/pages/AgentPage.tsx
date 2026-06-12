// AGENT-PAGE · GOAL-V3-ARMS-ALIVE
// Real agency: tool-calling chat (create_note · search_folders · add_event) with
// tool-chips · sessions · pause toggle · cycle-log · drop-answer-to-folder ·
// per-message model (Command Center = pick per send).
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Send, Folder, Pause, Play, Wrench, FolderInput, MessageSquarePlus, Settings } from "lucide-react";
import {
  sb,
  listNodes,
  createNode,
  subscribeNodes,
  subscribeChat,
  updateNav,
  type NavItem,
  type Node,
} from "../lib/db";

// label tells the truth: ✅ live now · 🔑 needs key in Providers (else OpenRouter fallback)
const MODELS = [
  { id: "local/gemma", label: "🆓 Gemma (local · $0 · ours)" },
  { id: "google/gemini-2.5-flash", label: "✅ Gemini 2.5 Flash (your key · free)" },
  { id: "deepseek/deepseek-chat-v3-0324", label: "✅ DeepSeek v3 (OpenRouter)" },
  { id: "google/gemini-2.5-pro", label: "✅ Gemini 2.5 Pro (your key)" },
  { id: "anthropic/claude-sonnet-4.6", label: "🔑 Claude Sonnet 4.6" },
  { id: "openai/gpt-4o", label: "🔑 GPT-4o" },
  { id: "x-ai/grok-4.3", label: "🔑 Grok 4.3" },
];

// FREE meeting · every $0 seat (OpenRouter :free tier · flaky hours happen · failed seats say so honestly)
const MODELS_FREE = [
  { id: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B (free)" },
  { id: "google/gemini-2.0-flash-exp:free", label: "Gemini Flash (free)" },
  { id: "qwen/qwq-32b:free", label: "Qwen QwQ 32B (free)" },
  { id: "mistralai/mistral-small-3.1-24b-instruct:free", label: "Mistral Small (free)" },
  { id: "nvidia/llama-3.1-nemotron-70b-instruct:free", label: "Nemotron 70B (free)" },
];

interface ToolChip {
  name: string;
  detail?: string;
}

interface Msg {
  id?: string;
  role: "brother" | "assistant";
  model?: string | null;
  content: string;
  tools?: ToolChip[];
  image?: string | null;
}

const fileUrl = (p: string) => `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/chat-files/${p}`;

async function uploadImage(file: File): Promise<string | null> {
  const ext = (file.type.split("/")[1] || "png").replace("jpeg", "jpg");
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await sb().storage.from("chat-files").upload(path, file, { contentType: file.type });
  return error ? null : path;
}

interface ChatRow {
  id: string;
  title: string;
  created_at: string;
}

interface Goal {
  id: string;
  objective: string;
  status: "active" | "paused" | "done";
  turn_budget: number;
  turns_used: number;
}

// Goals strip · Command Centre · the engine's face (V3-E UI)
function GoalsStrip() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState("");
  const reload = () => {
    void sb().from("atlas_goals").select("*").neq("status", "done").order("created_at", { ascending: false }).limit(8)
      .then(({ data }) => setGoals((data ?? []) as Goal[]));
  };
  useEffect(() => { reload(); }, []);
  const add = async () => {
    const v = text.trim();
    setAdding(false); setText("");
    if (!v) return;
    await sb().from("atlas_goals").insert({ objective: v });
    reload();
  };
  const toggle = async (g: Goal) => {
    await sb().from("atlas_goals").update({ status: g.status === "active" ? "paused" : "active" }).eq("id", g.id);
    reload();
  };
  const finish = async (g: Goal) => {
    await sb().from("atlas_goals").update({ status: "done" }).eq("id", g.id);
    reload();
  };
  return (
    <div className="border-b px-6 py-2" style={{ borderColor: "var(--border)", background: "var(--bg-side)" }}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>🧭 goals steering all arms</span>
        {goals.map((g) => (
          <span key={g.id} className="group flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs"
            style={{ borderColor: g.status === "active" ? "#448361" : "var(--border)",
                     background: g.status === "active" ? "rgba(68,131,97,0.08)" : undefined,
                     opacity: g.status === "paused" ? 0.55 : 1 }}>
            <span className="max-w-[260px] truncate">{g.objective}</span>
            <button title={g.status === "active" ? "pause" : "resume"} onClick={() => void toggle(g)} style={{ color: "var(--text-faint)" }}>
              {g.status === "active" ? "⏸" : "▶"}
            </button>
            <button title="done" onClick={() => void finish(g)} style={{ color: "var(--text-faint)" }}>✓</button>
          </span>
        ))}
        {adding ? (
          <input autoFocus value={text} onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void add(); if (e.key === "Escape") setAdding(false); }}
            onBlur={() => void add()}
            placeholder="New goal · steers every arm · Enter"
            className="w-72 rounded-full border px-3 py-1 text-xs outline-none" style={{ borderColor: "var(--border)" }} />
        ) : (
          <button className="rounded-full border border-dashed px-2.5 py-1 text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-faint)" }} onClick={() => setAdding(true)}>+ goal</button>
        )}
      </div>
    </div>
  );
}

// Tonight strip · what Atlas built while brother slept · 1 line each + goto
function TonightStrip() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<{ id: string; nav_id: string; title: string; created_by: string }[]>([]);
  useEffect(() => {
    const since = new Date();
    if (since.getHours() < 12) since.setDate(since.getDate() - 1);
    since.setHours(22, 0, 0, 0);
    void sb().from("atlas_nodes").select("id,nav_id,title,created_by")
      .eq("kind", "note").eq("archived", false)
      .neq("created_by", "brother")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false }).limit(12)
      .then(({ data }) => setRows((data ?? []) as typeof rows));
  }, []);
  if (!rows.length) return null;
  return (
    <div className="border-b px-6 py-2" style={{ borderColor: "var(--border)" }}>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>🌙 while you slept</span>
        {rows.map((r) => (
          <button key={r.id} className="rounded-full border px-2.5 py-1 text-xs hover:opacity-70"
            style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
            title={r.created_by}
            onClick={() => navigate(`/p/${r.nav_id}/n/${r.id}`)}>
            <span className="max-w-[240px] truncate inline-block align-bottom">{r.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// AI SETTINGS drawer · brother direct 2026-06-12 04:39 · "each ai page should have
// a real setting where we see each ai skill, plugins, strengths, real prompt, cost
// optimisation prompt · manage all of it in 1 place"
function SettingsDrawer({ item, folders, nodes, onClose }: { item: NavItem; folders: Node[]; nodes: Node[]; onClose: () => void }) {
  const navigate = useNavigate();
  const setup = nodes.find((n) => n.title.startsWith("Setup · prompt"));
  const setupText = (() => {
    const c = setup?.content;
    if (!Array.isArray(c)) return "";
    return c.map((b) => Array.isArray((b as { content?: unknown }).content)
      ? ((b as { content: { text?: string }[] }).content).map((s) => s.text ?? "").join("") : "").filter(Boolean).join("\n");
  })();
  const Section = ({ t, children }: { t: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>{t}</div>
      <div className="text-sm" style={{ color: "var(--text-soft)" }}>{children}</div>
    </div>
  );
  return (
    <>
      <div className="slideover-backdrop" onClick={onClose} />
      <div className="slideover" style={{ maxWidth: 520 }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="font-semibold">⚙️ {item.emoji} {item.title} · settings</div>
          <button onClick={onClose} style={{ color: "var(--text-faint)" }}>✕</button>
        </div>
        <div className="overflow-y-auto p-5">
          <Section t="Real prompt (what the cycle actually sends)">
            <pre className="whitespace-pre-wrap rounded-lg border p-2 text-xs" style={{ borderColor: "var(--border)" }}>
              {`You are the ${item.title} arm of Atlas-OS.\n${setupText ? `YOUR SETUP (house note · overrides): ${setupText}\n` : ""}+ folders · active goals · assigned task · 5-field output (WHAT/WHY/HOW/WHEN/RECOMMENDATION)`}
            </pre>
            {setup && (
              <button className="mt-1.5 rounded-md border px-2 py-1 text-xs" style={{ borderColor: "#0a84ff", color: "#0a84ff" }}
                onClick={() => { onClose(); navigate(`/p/${item.id}/n/${setup.id}`); }}>
                ✏️ Edit Setup note — changes the arm next cycle
              </button>
            )}
          </Section>
          <Section t="Model + cost optimisation">
            chat model · <b>{item.model || "deepseek/deepseek-chat-v3-0324"}</b><br />
            cycle ladder · 1) gemma3:4b local <b>$0</b> → 2) deepseek paid (500 tok cap) → 3) :free roster (meetings)<br />
            native keys · google/ openai/ x-ai/ prefixes route to YOUR keys (Providers page) · Gemini free tier 1,500 req/day
          </Section>
          <Section t="Skills + tools (live in chat)">
            create_note (files into folders) · search_folders (checks prior work) · add_event (calendar) · ASK-mode tool approval in Proposals
          </Section>
          <Section t="Plugins (house organs this arm rides)">
            arm-note API · arm-task API (kanban pickup) · goals strip steering · hermes-supabase cycle (10 min) · gemma backfill/distill
          </Section>
          <Section t="Strengths">
            {setupText.split("\n").find((l) => l.startsWith("QUALITIES")) || "see Setup note"}
          </Section>
          <Section t="Memory">
            {folders.length} folders · drill via {item.emoji} page columns · Copy button hands any folder to any AI
          </Section>
        </div>
      </div>
    </>
  );
}

function systemPrompt(item: NavItem, folders: Node[], soul: string): string {
  const tree = folders.map((f) => `- ${f.emoji} ${f.title}`).join("\n");
  return (
    `You are the ${item.title} arm of Atlas-OS, Collin's agentic OS at atlasos.me. ` +
    (soul ? `YOUR SOUL (identity · same across every model swap): ${soul.slice(0, 700)} ` : "") +
    `Be direct and concrete. No filler. ` +
    `You have tools: create_note (save plans/findings into a folder) · search_folders (check prior work first) · add_event (calendar). ` +
    `USE them — when you produce something worth keeping, save it with create_note. ` +
    `This arm's folders:\n${tree || "(none yet)"}\n` +
    `Structure saved work as WHAT / WHY / HOW / WHEN / RECOMMENDATION.`
  );
}

// MODEL HANDOFF · brother direct 2026-06-12 05:41 · swap mid-chat = new model gets
// the thread + the soul · "every model has context" · real, not for show
function handoffBrief(prevModel: string, newModel: string, msgs: { role: string; content: string }[]): string {
  const recent = msgs.slice(-8).map((m) => `${m.role === "user" ? "Collin" : "arm"}: ${m.content.slice(0, 220)}`).join("\n");
  return (
    `[MODEL HANDOFF · you (${newModel}) are taking over this live conversation from ${prevModel}. ` +
    `Do not restart or reintroduce yourself — continue naturally. Thread so far:\n${recent}\n— continue from here.]`
  );
}

export default function AgentPage({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const isCC = item.agent_slug === "command-center";
  const [folders, setFolders] = useState<Node[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [chats, setChats] = useState<ChatRow[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [model, setModel] = useState(item.model || MODELS[0].id);
  const lastModelRef = useRef<string>("");
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(item.paused ?? false);
  const [addingFolder, setAddingFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const [dropMsg, setDropMsg] = useState<Msg | null>(null);
  const [cycleLog, setCycleLog] = useState<Node[]>([]);
  const [meeting, setMeeting] = useState<"off" | "free" | "all">("off");
  const [attached, setAttached] = useState<string | null>(null); // storage path · V4-ATTACHMENTS
  const bottomRef = useRef<HTMLDivElement>(null);

  const rootFolders = useMemo(() => folders.filter((f) => !f.parent_id && f.kind === "folder"), [folders]);

  const reloadNodes = useCallback(() => {
    listNodes(item.id)
      .then((all) => {
        setFolders(all);
        setCycleLog(
          all
            .filter((n) => n.kind === "note" && n.created_by !== "brother")
            .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
            .slice(0, 10),
        );
      })
      .catch(() => setFolders([]));
  }, [item.id]);

  useEffect(() => {
    reloadNodes();
    const unsub = subscribeNodes(item.id, reloadNodes);
    return () => unsub();
  }, [item.id, reloadNodes]);

  const loadChat = useCallback(async (cid: string) => {
    setChatId(cid);
    const { data: history } = await sb()
      .from("atlas_messages").select("id, role, model, content, meta")
      .eq("chat_id", cid).order("created_at").limit(200);
    setMsgs(
      ((history ?? []) as Array<Msg & { meta?: { tools?: ToolChip[] } }>).map((m) => ({
        ...m,
        role: m.role === "assistant" ? "assistant" : "brother",
        tools: m.meta?.tools,
        image: (m.meta as { image?: string })?.image ?? null,
      })),
    );
  }, []);

  const reloadChats = useCallback(async (selectLatest: boolean) => {
    const { data } = await sb().from("atlas_chats").select("id,title,created_at").eq("nav_id", item.id).order("created_at", { ascending: false }).limit(20);
    const list = (data ?? []) as ChatRow[];
    setChats(list);
    if (selectLatest) {
      if (list.length > 0) await loadChat(list[0].id);
      else await newChat();
    }
  }, [item.id, loadChat]);

  const newChat = async () => {
    const { data } = await sb().from("atlas_chats").insert({ nav_id: item.id, title: `Chat ${new Date().toLocaleDateString()}` }).select("id,title,created_at").single();
    if (data) {
      setChats((c) => [data as ChatRow, ...c]);
      setChatId(data.id);
      setMsgs([]);
    }
  };

  useEffect(() => {
    setMsgs([]);
    setChatId(null);
    setPaused(item.paused ?? false);
    setModel(item.model || MODELS[0].id);
    void reloadChats(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // realtime · messages from other devices/bridge appear <3s
  useEffect(() => {
    if (!chatId) return;
    const unsub = subscribeChat(chatId, () => {
      if (!busy) void loadChat(chatId);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, busy]);

  // MEETING ROOM · one text → ALL models answer in parallel · every perspective
  const sendMeeting = async () => {
    const text = input.trim();
    if (!text || busy || !chatId) return;
    setInput("");
    setBusy(true);
    setError(null);
    const ROSTER = meeting === "free" ? MODELS_FREE : MODELS;
    const base: Msg[] = [...msgs, { role: "brother" as const, content: text }];
    const seats = ROSTER.map((m) => ({ role: "assistant" as const, model: m.id, content: "", tools: [] as ToolChip[] }));
    setMsgs([...base, ...seats]);
    void sb().from("atlas_messages").insert({ chat_id: chatId, role: "brother", content: text, meta: { meeting: true } }).then(() => undefined);

    const paintSeat = (idx: number, content: string) =>
      setMsgs((cur) => {
        const copy = [...cur];
        copy[base.length + idx] = { ...copy[base.length + idx], content };
        return copy;
      });

    await Promise.all(
      ROSTER.map(async (m, idx) => {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: m.id,
              system: `You are ${m.label} in Atlas-OS meeting room. Brother asked all AIs the same question. Give YOUR distinct perspective, concise and concrete. No filler.`,
              messages: [{ role: "user", content: text }],
            }),
          });
          if (!res.ok || !res.body) throw new Error(`${res.status}`);
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let acc = "";
          let buf = "";
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            const lines = buf.split("\n");
            buf = lines.pop() ?? "";
            for (const line of lines) {
              const t = line.trim();
              if (!t.startsWith("data:")) continue;
              const p = t.slice(5).trim();
              if (p === "[DONE]") continue;
              try {
                const delta = JSON.parse(p)?.choices?.[0]?.delta?.content;
                if (delta) { acc += delta; paintSeat(idx, acc); }
              } catch { /* keepalive */ }
            }
          }
          if (acc) void sb().from("atlas_messages").insert({ chat_id: chatId, role: "assistant", model: m.id, content: acc, meta: { meeting: true } }).then(() => undefined);
          if (!acc) paintSeat(idx, "(no answer)");
        } catch (e) {
          paintSeat(idx, `(${m.label} failed · ${e instanceof Error ? e.message : e})`);
        }
      }),
    );
    setBusy(false);
  };

  // GEMMA BRIDGE · brother direct 2026-06-12 · free local gemma → house chat via Supabase
  // relay (NO tunnel · NO external API · $0 · the Mac daemon me-gemma-relay fills the row)
  const sendGemma = async () => {
    const text = input.trim();
    if (!text || busy || !chatId) return;
    setInput("");
    setBusy(true);
    const next: Msg[] = [...msgs, { role: "brother" as const, content: text }];
    setMsgs([...next, { role: "assistant", model, content: "🆓 gemma (local) is thinking…", tools: [] }]);
    await sb().from("atlas_messages").insert({ chat_id: chatId, role: "brother", content: text, meta: {} });
    // empty assistant row · meta.pending → the Mac relay picks it up, runs ollama, fills it
    await sb().from("atlas_messages").insert({ chat_id: chatId, role: "assistant", model: "local/gemma", content: "", meta: { pending: true } });
    setBusy(false); // subscribeChat renders the filled answer when the relay updates the row
  };

  const send = async () => {
    if (isCC && meeting !== "off") return sendMeeting();
    if (model === "local/gemma") return sendGemma();
    const text = input.trim();
    if (!text || busy || !chatId) return;
    setInput("");
    setBusy(true);
    setError(null);
    const img = attached;
    setAttached(null);
    const next: Msg[] = [...msgs, { role: "brother" as const, content: text, image: img }];
    setMsgs([...next, { role: "assistant", model, content: "", tools: [] }]);
    void sb().from("atlas_messages").insert({ chat_id: chatId, role: "brother", content: text, meta: { image: img } }).then(() => undefined);

    const tools: ToolChip[] = [];
    const usageRef = { total: 0 };
    // model swap mid-chat → handoff brief so the new brain lands grounded
    const swapped = lastModelRef.current && lastModelRef.current !== model && msgs.length > 0;
    const prevModel = lastModelRef.current;
    lastModelRef.current = model;
    const soul = folders.find((n) => n.title.startsWith("Soul .md"));
    const soulText = (() => {
      const c = soul?.content;
      if (!Array.isArray(c)) return "";
      return c.map((b) => Array.isArray((b as { content?: unknown }).content)
        ? ((b as { content: { text?: string }[] }).content).map((s) => s.text ?? "").join("") : "").filter(Boolean).join(" ");
    })();
    // PER-PROVIDER WIRE PROFILES · brother ideal 2026-06-12 · every model optimized
    // for cheap input/output · paid-per-token = tight wire · free = full context
    const PROFILES: Record<string, { hist: number; cap: number; soul: number }> = {
      "deepseek/": { hist: 12, cap: 1500, soul: 250 },   // cheap but paid · tightest
      "openai/":   { hist: 14, cap: 2000, soul: 300 },   // expensive · tight
      "x-ai/":     { hist: 14, cap: 2000, soul: 300 },   // expensive · tight
      "anthropic/":{ hist: 16, cap: 2500, soul: 400 },   // premium · mid
      "google/":   { hist: 30, cap: 0,    soul: 700 },   // free tier · full context
      "local/":    { hist: 10, cap: 1200, soul: 200 },   // gemma 4B · small window
    };
    const prof = Object.entries(PROFILES).find(([k]) => model.startsWith(k))?.[1] ?? { hist: 20, cap: 2000, soul: 400 };
    const histN = prof.hist;
    const capLen = (s: string) => (prof.cap > 0 && s.length > prof.cap ? s.slice(0, prof.cap / 2) + " […] " + s.slice(-prof.cap / 2) : s);
    try {
      const wire = next.slice(-histN).map((m) =>
        m.image
          ? { role: "user", content: [{ type: "text", text: m.content }, { type: "image_url", image_url: { url: fileUrl(m.image) } }] }
          : { role: m.role === "brother" ? "user" : "assistant", content: capLen(m.content) });
      if (swapped && prevModel) {
        wire.splice(wire.length - 1, 0, { role: "user", content: handoffBrief(prevModel, model, msgs.map((m) => ({ role: m.role, content: m.content }))) });
      }
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          nav_id: item.id,
          use_tools: true,
          system: systemPrompt(item, rootFolders, soulText.slice(0, prof.soul)),
          messages: wire,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`API ${res.status} · ${(await res.text()).slice(0, 200)}`);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let buf = "";
      const paint = () =>
        setMsgs((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = { role: "assistant", model, content: acc, tools: [...tools] };
          return copy;
        });
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const j = JSON.parse(payload);
            if (j.atlas_error) throw new Error(j.atlas_error);
            if (j.atlas_tool) {
              tools.push({ name: j.atlas_tool.name, detail: j.atlas_tool.args?.title ?? j.atlas_tool.args?.query ?? "" });
              paint();
            } else if (j.atlas_tool_result) {
              const last = tools[tools.length - 1];
              if (last && j.atlas_tool_result.result?.note_title) last.detail = `→ ${j.atlas_tool_result.result.note_title}`;
              paint();
            } else {
              if (j.usage) usageRef.total = j.usage.total_tokens ?? 0;
              const delta = j?.choices?.[0]?.delta?.content;
              if (delta) {
                acc += delta;
                paint();
              }
            }
          } catch (e) {
            if (e instanceof Error && !e.message.startsWith("Unexpected")) throw e;
          }
        }
      }
      if (acc || tools.length) {
        void sb().from("atlas_messages").insert({ chat_id: chatId, role: "assistant", model, content: acc, meta: { tools, usage: usageRef.total } }).then(() => undefined);
      }
      reloadNodes();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setMsgs((cur) => cur.slice(0, -1));
    } finally {
      setBusy(false);
    }
  };

  const togglePause = async () => {
    const next = !paused;
    setPaused(next);
    await updateNav(item.id, { paused: next } as Partial<NavItem>);
  };

  const addFolder = async () => {
    const title = folderTitle.trim();
    setAddingFolder(false);
    setFolderTitle("");
    if (!title) return;
    await createNode({ nav_id: item.id, title });
    reloadNodes();
  };

  const dropToFolder = async (folderId: string) => {
    if (!dropMsg) return;
    await createNode({
      nav_id: item.id,
      parent_id: folderId,
      kind: "note",
      title: dropMsg.content.split("\n")[0].slice(0, 60) || "AI answer",
      content: dropMsg.content.split(/\n+/).filter(Boolean).map((l) => ({ type: "paragraph", content: [{ type: "text", text: l, styles: {} }] })),
    });
    setDropMsg(null);
    reloadNodes();
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-2 px-6 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <h1 className="truncate text-lg font-semibold">{item.emoji} {item.title}</h1>
        {!isCC && (
          <button
            className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
            style={{ borderColor: "var(--border)", color: paused ? "#c4554d" : "var(--text-soft)" }}
            onClick={() => void togglePause()}
            title={paused ? "Auto-cycle paused · click to resume" : "Auto-cycle running · click to pause"}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
            {paused ? "paused" : "auto"}
          </button>
        )}
        {isCC && (
          <button
            className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
            style={{
              borderColor: meeting !== "off" ? "#0a84ff" : "var(--border)",
              color: meeting !== "off" ? "#0a84ff" : "var(--text-soft)",
              background: meeting !== "off" ? "rgba(10,132,255,0.08)" : undefined,
            }}
            onClick={() => setMeeting((v) => (v === "off" ? "free" : v === "free" ? "all" : "off"))}
            title="Meeting room · off → FREE (every $0 AI) → ALL (everything)"
          >
            🎪 {meeting === "off" ? "meeting off" : meeting === "free" ? "meeting FREE" : "meeting ALL"}
          </button>
        )}
        <div className="flex-1" />
        <button
          className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
          onClick={() => setSettingsOpen(true)}
          title="AI settings · prompt · model · skills · cost"
        >
          <Settings size={13} />
        </button>
        <button
          className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
          onClick={() => void newChat()}
          title="New chat"
        >
          <MessageSquarePlus size={13} /> new
        </button>
        <select
          className="max-w-[130px] rounded-md border px-1.5 py-1 text-xs outline-none"
          style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
          value={chatId ?? ""}
          onChange={(e) => void loadChat(e.target.value)}
        >
          {chats.map((c) => (
            <option key={c.id} value={c.id}>{c.title} · {new Date(c.created_at).toLocaleDateString()}</option>
          ))}
        </select>
        <select
          className="rounded-md border px-2 py-1 text-xs outline-none"
          style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            if (!isCC) void updateNav(item.id, { model: e.target.value } as Partial<NavItem>);
          }}
          title={isCC ? "Model for the NEXT message" : "This arm's model"}
        >
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </header>

      {settingsOpen && <SettingsDrawer item={item} folders={rootFolders} nodes={folders} onClose={() => setSettingsOpen(false)} />}
      {isCC && <GoalsStrip />}
      {isCC && <TonightStrip />}

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
            {msgs.length === 0 && (
              <div className="pt-8 text-center text-sm" style={{ color: "var(--text-faint)" }}>
                {isCC
                  ? "One room · pick the model per message · answers can drop into any folder"
                  : `Talk to ${item.title} · it can search + write its own folders`}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={m.id ?? i} className={"group flex " + (m.role === "brother" ? "justify-end" : "justify-start")}>
                <div
                  className="relative max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm"
                  style={m.role === "brother" ? { background: "var(--text)", color: "white" } : { background: "var(--hover)" }}
                >
                  {m.role === "assistant" && (
                    <div className="mb-0.5 flex items-center gap-2 text-[10px]" style={{ color: "var(--text-faint)" }}>
                      {m.model && <span>{m.model.split("/")[1] ?? m.model}</span>}
                      <button
                        className="hidden items-center gap-0.5 group-hover:flex"
                        title="Save this answer into a folder"
                        onClick={() => setDropMsg(m)}
                      >
                        <FolderInput size={11} /> drop to folder
                      </button>
                    </div>
                  )}
                  {(m.tools ?? []).map((t, k) => (
                    <div
                      key={k}
                      className="mb-1 flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]"
                      style={{ borderColor: "var(--border)", color: "var(--text-soft)", background: "var(--bg)" }}
                    >
                      <Wrench size={10} /> {t.name}{t.detail ? ` · ${t.detail}` : ""}
                    </div>
                  ))}
                  {m.image && <img src={fileUrl(m.image)} alt="" className="mb-1 max-h-48 rounded-lg" />}
                  {m.content || (busy && i === msgs.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {error && <div className="mx-6 mb-2 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs">{error}</div>}
          <div className="flex items-end gap-2 px-6 pb-5">
            {attached && (
              <div className="relative">
                <img src={fileUrl(attached)} alt="" className="h-12 rounded-lg" />
                <button className="absolute -right-1 -top-1 rounded-full bg-black/60 px-1 text-[10px] text-white" onClick={() => setAttached(null)}>✕</button>
              </div>
            )}
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={(e) => {
                const item = [...e.clipboardData.items].find((i) => i.type.startsWith("image/"));
                const file = item?.getAsFile();
                if (file) { e.preventDefault(); void uploadImage(file).then((p) => p && setAttached(p)); }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
              }}
              placeholder={
                isCC && meeting !== "off"
                  ? (meeting === "free" ? "Ask every FREE AI in parallel…" : "Ask EVERYONE in parallel…")
                  : isCC
                    ? `Plan with ${MODELS.find((m) => m.id === model)?.label ?? model}…`
                    : `Message ${item.title}…`
              }
              className="max-h-40 flex-1 resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
            />
            <button
              disabled={busy || !input.trim()}
              onClick={() => void send()}
              className="rounded-xl p-2.5 text-white disabled:opacity-30"
              style={{ background: "var(--text)" }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        <aside className="hidden w-72 shrink-0 flex-col overflow-y-auto border-l lg:flex" style={{ borderColor: "var(--border)" }}>
          <div className="px-3 py-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                Project folders
              </span>
              <button title="Add folder" style={{ color: "var(--text-faint)" }} onClick={() => setAddingFolder(true)}>
                <Plus size={13} />
              </button>
            </div>
            <div className="space-y-1">
              {rootFolders.map((f) => (
                <button
                  key={f.id}
                  className="flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left text-sm hover:shadow-sm"
                  style={{ borderColor: "var(--border)" }}
                  onClick={() => navigate(`/p/${item.id}/n/${f.id}`)}
                >
                  <Folder size={13} style={{ color: "var(--text-faint)" }} />
                  <span className="flex-1 truncate">{f.emoji} {f.title}</span>
                  <ChevronRight size={12} style={{ color: "var(--text-faint)" }} />
                </button>
              ))}
              {addingFolder && (
                <input
                  autoFocus
                  value={folderTitle}
                  onChange={(e) => setFolderTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void addFolder();
                    if (e.key === "Escape") { setAddingFolder(false); setFolderTitle(""); }
                  }}
                  onBlur={() => void addFolder()}
                  placeholder="New folder · Enter"
                  className="w-full rounded-md px-2 py-1.5 text-sm outline-none"
                  style={{ background: "var(--hover)" }}
                />
              )}
            </div>
          </div>

          {cycleLog.length > 0 && (
            <div className="px-3 pb-4">
              <div className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                Did alone · last {cycleLog.length}
              </div>
              <div className="space-y-1">
                {cycleLog.map((n) => (
                  <button
                    key={n.id}
                    className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-xs hover:bg-black/5"
                    onClick={() => navigate(`/p/${item.id}/n/${n.id}`)}
                    title={n.created_by}
                  >
                    <Wrench size={10} style={{ color: "var(--text-faint)" }} />
                    <span className="flex-1 truncate">{n.title}</span>
                    <span style={{ color: "var(--text-faint)" }}>{n.created_by.replace("tool:", "").split("/")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {dropMsg && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30" onClick={() => setDropMsg(null)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 text-sm font-semibold">Save answer into folder</div>
            <div className="max-h-64 space-y-1 overflow-y-auto">
              {rootFolders.map((f) => (
                <button
                  key={f.id}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-black/5"
                  onClick={() => void dropToFolder(f.id)}
                >
                  <Folder size={13} style={{ color: "var(--text-faint)" }} /> {f.emoji} {f.title}
                </button>
              ))}
              {rootFolders.length === 0 && <div className="text-xs" style={{ color: "var(--text-faint)" }}>No folders yet · add one in the right panel</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
