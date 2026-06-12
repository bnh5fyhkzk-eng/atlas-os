// AGENT-PAGE primitive · Hermes-agent style · Atlas-OS v3
// REAL working chat (OpenRouter via /api/chat · streaming) + linked project folders.
// Per brother direct: "this is not a demo its a real project."
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, Send, Folder } from "lucide-react";
import {
  sb,
  listNodes,
  createNode,
  subscribeNodes,
  updateNav,
  type NavItem,
  type Node,
} from "../lib/db";

const MODELS = [
  { id: "deepseek/deepseek-chat-v3-0324", label: "DeepSeek v3" },
  { id: "anthropic/claude-sonnet-4.6", label: "Claude Sonnet 4.6" },
  { id: "anthropic/claude-haiku-4.5", label: "Claude Haiku 4.5" },
  { id: "openai/gpt-4o", label: "GPT-4o" },
  { id: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { id: "x-ai/grok-3", label: "Grok 3" },
];

interface Msg {
  id?: string;
  role: "brother" | "assistant";
  model?: string | null;
  content: string;
}

function systemPrompt(item: NavItem, folders: Node[]): string {
  const tree = folders.map((f) => `- ${f.emoji} ${f.title}`).join("\n");
  return (
    `You are the ${item.title} arm of Atlas-OS, Collin's agentic OS at atlasos.me. ` +
    `Be direct and concrete. No filler. ` +
    `This arm's linked project folders:\n${tree || "(none yet)"}\n` +
    `When you propose work, structure it as WHAT / WHY / HOW / WHEN / RECOMMENDATION.`
  );
}

export default function AgentPage({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<Node[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [model, setModel] = useState(item.model || MODELS[0].id);
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addingFolder, setAddingFolder] = useState(false);
  const [folderTitle, setFolderTitle] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const rootFolders = useMemo(() => folders.filter((f) => !f.parent_id && f.kind === "folder"), [folders]);

  const reloadFolders = useCallback(() => {
    listNodes(item.id).then(setFolders).catch(() => setFolders([]));
  }, [item.id]);

  // load folders + realtime
  useEffect(() => {
    reloadFolders();
    const unsub = subscribeNodes(item.id, reloadFolders);
    return () => unsub();
  }, [item.id, reloadFolders]);

  // load or create chat + history
  useEffect(() => {
    setMsgs([]);
    setChatId(null);
    (async () => {
      const { data: chats } = await sb().from("atlas_chats").select("id").eq("nav_id", item.id).order("created_at", { ascending: false }).limit(1);
      let cid = chats?.[0]?.id as string | undefined;
      if (!cid) {
        const { data: created } = await sb().from("atlas_chats").insert({ nav_id: item.id }).select("id").single();
        cid = created?.id as string | undefined;
      }
      if (!cid) return;
      setChatId(cid);
      const { data: history } = await sb()
        .from("atlas_messages").select("id, role, model, content")
        .eq("chat_id", cid).order("created_at").limit(200);
      setMsgs(((history ?? []) as Msg[]).map((m) => ({ ...m, role: m.role === "assistant" ? "assistant" : "brother" })));
    })().catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, [item.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy || !chatId) return;
    setInput("");
    setBusy(true);
    setError(null);
    const next: Msg[] = [...msgs, { role: "brother" as const, content: text }];
    setMsgs([...next, { role: "assistant", model, content: "" }]);

    void sb().from("atlas_messages").insert({ chat_id: chatId, role: "brother", content: text }).then(() => undefined);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          system: systemPrompt(item, rootFolders),
          messages: next.slice(-30).map((m) => ({ role: m.role === "brother" ? "user" : "assistant", content: m.content })),
        }),
      });
      if (!res.ok || !res.body) {
        const detail = await res.text();
        throw new Error(`API ${res.status} · ${detail.slice(0, 200)}`);
      }
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
          const payload = t.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMsgs((cur) => {
                const copy = [...cur];
                copy[copy.length - 1] = { role: "assistant", model, content: acc };
                return copy;
              });
            }
          } catch { /* keepalive lines */ }
        }
      }
      if (acc) {
        void sb().from("atlas_messages").insert({ chat_id: chatId, role: "assistant", model, content: acc }).then(() => undefined);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setMsgs((cur) => cur.slice(0, -1));
    } finally {
      setBusy(false);
    }
  };

  const addFolder = async () => {
    const title = folderTitle.trim();
    setAddingFolder(false);
    setFolderTitle("");
    if (!title) return;
    await createNode({ nav_id: item.id, title });
    reloadFolders();
  };

  return (
    <div className="flex h-screen flex-col">
      <header
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="truncate text-lg font-semibold">{item.emoji} {item.title}</h1>
        <select
          className="rounded-md border px-2 py-1 text-xs outline-none"
          style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            void updateNav(item.id, { model: e.target.value } as Partial<NavItem>);
          }}
        >
          {MODELS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* chat */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-6 py-4">
            {msgs.length === 0 && (
              <div className="pt-8 text-center text-sm" style={{ color: "var(--text-faint)" }}>
                Talk to {item.title} · plans land in the folders →
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={m.id ?? i} className={"flex " + (m.role === "brother" ? "justify-end" : "justify-start")}>
                <div
                  className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm"
                  style={
                    m.role === "brother"
                      ? { background: "var(--text)", color: "white" }
                      : { background: "var(--hover)" }
                  }
                >
                  {m.role === "assistant" && m.model && (
                    <div className="mb-0.5 text-[10px]" style={{ color: "var(--text-faint)" }}>{m.model.split("/")[1] ?? m.model}</div>
                  )}
                  {m.content || (busy && i === msgs.length - 1 ? "…" : "")}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          {error && <div className="mx-6 mb-2 rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs">{error}</div>}
          <div className="flex items-end gap-2 px-6 pb-5">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
              }}
              placeholder={`Message ${item.title}…`}
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

        {/* linked folders */}
        <aside
          className="hidden w-64 shrink-0 overflow-y-auto border-l px-3 py-4 lg:block"
          style={{ borderColor: "var(--border)" }}
        >
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
        </aside>
      </div>
    </div>
  );
}
