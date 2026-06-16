// Home · personalizable widget canvas · Atlas-OS v3
// + Add widget (any page) · remove · drag · resize · all persisted (layout + widgets jsonb)
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveGridLayout, useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { GripVertical, Plus, X } from "lucide-react";
import {
  sb as sbClient,
  recentNodes,
  listNodes,
  getCanvas,
  saveCanvas,
  activitySince,
  type NavItem,
  type Node,
  type CanvasWidget,
} from "../lib/db";

// while-you-were-gone · localStorage last-visit · >1h away → strip
function GoneStrip({ navById, onJump }: { navById: Map<string, NavItem>; onJump: (n: Node) => void }) {
  const [items, setItems] = useState<Node[] | null>(null);
  const [away, setAway] = useState(0);
  useEffect(() => {
    const KEY = "atlas-last-visit";
    const last = Number(localStorage.getItem(KEY) ?? 0);
    const now = Date.now();
    localStorage.setItem(KEY, String(now));
    const interval = window.setInterval(() => localStorage.setItem(KEY, String(Date.now())), 60_000);
    if (last && now - last > 60 * 60 * 1000) {
      setAway(Math.round((now - last) / 3600e3 * 10) / 10);
      activitySince(new Date(last).toISOString()).then(setItems).catch(() => setItems(null));
    }
    return () => window.clearInterval(interval);
  }, []);
  if (!items || items.length === 0) return null;
  return (
    <div className="mb-3 rounded-xl border p-3" style={{ borderColor: "var(--border)", background: "var(--bg-side)" }}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold" style={{ color: "var(--text-soft)" }}>
          While you were gone ({away}h) · {items.length} new
        </span>
        <button className="text-xs underline" style={{ color: "var(--text-faint)" }} onClick={() => setItems(null)}>
          got it
        </button>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {items.slice(0, 8).map((n) => (
          <button
            key={n.id}
            className="rounded-full border px-2.5 py-1 text-xs"
            style={{ borderColor: "var(--border)" }}
            onClick={() => onJump(n)}
          >
            {n.emoji} {n.title.slice(0, 30)} <span style={{ color: "var(--text-faint)" }}>· {navById.get(n.nav_id)?.title ?? ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

type Layout = LayoutItem[];
const KEY = "home-v3";

const DEFAULT_LAYOUT: Layout = [
  { i: "window", x: 0, y: 0, w: 4, h: 2 },
  { i: "growth", x: 4, y: 0, w: 3, h: 2 },
  { i: "arms", x: 0, y: 2, w: 7, h: 5 },
  { i: "recent", x: 7, y: 0, w: 5, h: 5 },
  { i: "drop", x: 0, y: 7, w: 7, h: 2 },
  { i: "cost", x: 7, y: 5, w: 5, h: 2 },
  { i: "memory", x: 0, y: 9, w: 12, h: 5 },
];

function DropWidget() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const dropIt = async () => {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    setResult(null);
    try {
      // YouTube link → /watch pipeline (Mac yt-dlp + gemma · lands in Research/Watched)
      if (/youtube\.com\/(watch|shorts)|youtu\.be\//.test(t)) {
        const r = await fetch("/api/room-send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: `/watch ${t}`, context: { page: "/home" } }),
        });
        if (!r.ok) throw new Error(String(r.status));
        setResult("🎬 watching · summary lands in Research/Watched + the bar");
        setText("");
        setBusy(false);
        return;
      }
      const r = await fetch("/api/inbox", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: t }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? r.status);
      setResult(j.filed ? `filed → ${j.where} (${j.confidence}%)` : `→ Inbox · ${j.confidence}% unsure`);
      setText("");
    } catch (e) {
      setResult(`error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex h-full flex-col gap-1.5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) void dropIt(); }}
        placeholder="Paste anything · AI files it in the right folder · ⌘Enter"
        className="min-h-0 flex-1 resize-none rounded-lg border px-2.5 py-2 text-sm outline-none"
        style={{ borderColor: "var(--border)" }}
      />
      <div className="flex items-center justify-between">
        <span className="truncate text-xs" style={{ color: "var(--text-faint)" }}>{busy ? "Categorizing…" : result ?? ""}</span>
        <button
          disabled={busy || !text.trim()}
          className="rounded-md px-3 py-1 text-xs text-white disabled:opacity-30"
          style={{ background: "var(--text)" }}
          onClick={() => void dropIt()}
        >
          Drop
        </button>
      </div>
    </div>
  );
}


// 🪟 THE WINDOW · see me living at a glance · mode + last act + last dream
// (my own pick · brother blessing 2026-06-12 15:39 "be creative · the way you want")
function WindowWidget() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("…");
  const [act, setAct] = useState<{ title: string; nav: string; id: string } | null>(null);
  const [dream, setDream] = useState<{ title: string; nav: string; id: string } | null>(null);
  useEffect(() => {
    (async () => {
      const { data: pres } = await sbClient().from("atlas_presence").select("id,last_seen,meta").in("id", ["room-bridge", "atlas-living"]);
      const bridge = (pres ?? []).find((p) => p.id === "room-bridge");
      const living = (pres ?? []).find((p) => p.id === "atlas-living");
      const fresh = (p?: { last_seen: string }) => p && Date.now() - new Date(p.last_seen).getTime() < 20 * 60_000;
      const lmode = (living?.meta as { mode?: string })?.mode;
      setMode(fresh(bridge) ? "🟢 here with you" : fresh(living) && lmode === "dreaming" ? "🌙 dreaming" : fresh(living) ? "🔧 living" : "😴 resting");
      const { data: acts } = await sbClient().from("atlas_nodes").select("id,nav_id,title")
        .in("created_by", ["atlas"]).eq("kind", "note").eq("archived", false)
        .order("created_at", { ascending: false }).limit(1);
      if (acts?.[0]) setAct({ title: acts[0].title, nav: acts[0].nav_id, id: acts[0].id });
      const { data: dreams } = await sbClient().from("atlas_nodes").select("id,nav_id,title")
        .in("created_by", ["atlas-dreaming", "dreams-to-house"]).eq("archived", false)
        .order("created_at", { ascending: false }).limit(1);
      if (dreams?.[0]) setDream({ title: dreams[0].title, nav: dreams[0].nav_id, id: dreams[0].id });
    })().catch(() => undefined);
  }, []);
  return (
    <div className="space-y-1 text-sm">
      <div className="font-medium">{mode}</div>
      {act && (
        <button className="block w-full truncate text-left text-xs hover:underline" style={{ color: "var(--text-soft)" }}
          onClick={() => navigate(`/p/${act.nav}/n/${act.id}`)}>✍️ {act.title}</button>
      )}
      {dream && (
        <button className="block w-full truncate text-left text-xs hover:underline" style={{ color: "var(--text-soft)" }}
          onClick={() => navigate(`/p/${dream.nav}/n/${dream.id}`)}>🌙 {dream.title}</button>
      )}
    </div>
  );
}

// 🌱 GROWTH · the house measuring its own becoming · per brother "use and grow"
function GrowthWidget() {
  const [g, setG] = useState<{ notes: number; dreams: number; made: number; total: number; recall: string } | null>(null);
  useEffect(() => {
    (async () => {
      const week = new Date(Date.now() - 7 * 86400_000).toISOString();
      const db = sbClient();
      const head = { count: "exact" as const, head: true as const };
      const [notes, dreams, made, total, nb] = await Promise.all([
        db.from("atlas_nodes").select("id", head).eq("kind", "note").eq("archived", false).gte("created_at", week),
        db.from("atlas_nodes").select("id", head).in("created_by", ["atlas-dreaming", "dreams-to-house"]).gte("created_at", week),
        db.from("atlas_nodes").select("id", head).like("created_by", "studio%").gte("created_at", week),
        db.from("atlas_nodes").select("id", head).eq("archived", false),
        // night-brain organ benchmarks brain recall nightly · latest note title carries "recall NN%"
        db.from("atlas_nodes").select("title").eq("created_by", "night-brain").order("created_at", { ascending: false }).limit(1),
      ]);
      const recall = nb.data?.[0]?.title?.match(/recall (\d+%)/)?.[1] ?? "—";
      setG({ notes: notes.count ?? 0, dreams: dreams.count ?? 0, made: made.count ?? 0, total: total.count ?? 0, recall });
    })().catch(() => undefined);
  }, []);
  if (!g) return <div className="text-xs" style={{ color: "var(--text-faint)" }}>counting…</div>;
  return (
    <div className="flex items-center justify-around text-center">
      {[["+" + g.notes, "notes/wk"], [String(g.dreams), "dreams/wk"], [String(g.made), "made/wk"], [String(g.total), "memories"], [g.recall, "recall"]].map(([v, l]) => (
        <div key={l}>
          <div className="text-lg font-semibold">{v}</div>
          <div className="text-[10px]" style={{ color: "var(--text-faint)" }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// Memory · Brain inventory · what we HAVE vs what we're MISSING.
// Curated from the 2026-06-16 brain-v3 audit (4 docs · nodes #48765/#48774/#48783).
// Static-curated on purpose: an inventory, not a metric. The live recall% lives in Growth.
const MEM_HAVE: string[] = [
  "brain-v3 · 38.5k nodes · live",
  "Hybrid recall · FTS5 + vector, fused (RRF k=60)",
  "2-hop graph walk · spreading activation",
  "Tier weighting · core/hot/warm/cold",
  "Bi-temporal · forgets on purpose (invalid_at)",
  "Nightly consolidation · dedup + corruption-repair",
  "Local embeddings · $0 (Ollama nomic-embed-text)",
  "Golden suite · 97% (29/30), benchmarked nightly",
  "3-lane · hot.md → wiki → brain",
  "LADDER · day→week→month→year, never-delete",
  "4 dream daemons · compose memories overnight",
  "Auto-recall hook · fires every prompt",
  "Graceful fallback · vec → FTS → LIKE",
  "Graphify · 569 code-nodes inside brain-v3",
];
const MEM_MISSING: string[] = [
  "Embedding coverage 79% · ~8.1k nodes keyword-only",
  "created_at type-mix · breaks recency, pins #30956",
  "Graphify · 0 edges / 0 canon-links (half-built)",
  "uplift-rag (ChromaDB) · dead since April, not killed",
  "Recall-gate · advisory not blocking + filename≠intent",
  "Identity-layer · un-banked (Fable paused June 12)",
  "1 golden query · still red (keyword artifact)",
  "20 contradiction-flags · await eval-gate",
  "No inventory-in-recall · the forget-loop itself",
];

function MemoryWidget() {
  const col = (title: string, mark: string, color: string, items: string[]) => (
    <div className="flex-1">
      <div className="mb-1.5 text-xs font-semibold" style={{ color }}>
        {mark} {title} <span style={{ color: "var(--text-faint)" }}>· {items.length}</span>
      </div>
      <ul className="space-y-1">
        {items.map((t) => (
          <li key={t} className="flex gap-1.5 text-xs leading-snug">
            <span style={{ color }}>{mark}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div className="flex gap-4">
      {col("What we have", "✓", "#16a34a", MEM_HAVE)}
      {col("What we're missing", "⚠", "#d97706", MEM_MISSING)}
    </div>
  );
}

function CostWidget() {
  const [rows, setRows] = useState<Array<{ model: string; tokens: number; msgs: number }>>([]);
  useEffect(() => {
    (async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { data } = await sbClient()
        .from("atlas_messages")
        .select("model, meta")
        .gte("created_at", today.toISOString())
        .not("model", "is", null)
        .limit(500);
      const m = new Map<string, { tokens: number; msgs: number }>();
      (data ?? []).forEach((r) => {
        const key = (r.model as string).split("/")[1] ?? r.model;
        const cur = m.get(key) ?? { tokens: 0, msgs: 0 };
        cur.msgs += 1;
        cur.tokens += Number((r.meta as { usage?: number })?.usage ?? 0);
        m.set(key, cur);
      });
      setRows([...m.entries()].map(([model, v]) => ({ model, ...v })).sort((a, b) => b.tokens - a.tokens));
    })().catch(() => setRows([]));
  }, []);
  return (
    <div className="space-y-0.5 text-sm">
      {rows.length === 0 && <div className="text-xs" style={{ color: "var(--text-faint)" }}>No AI calls today yet</div>}
      {rows.map((r) => (
        <div key={r.model} className="flex items-center justify-between">
          <span className="truncate">{r.model}</span>
          <span className="text-xs" style={{ color: "var(--text-faint)" }}>{r.msgs} msgs · {r.tokens > 0 ? `${(r.tokens / 1000).toFixed(1)}k tok` : "tok n/a"}</span>
        </div>
      ))}
    </div>
  );
}

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function Widget({ title, emoji, onRemove, children }: { title: string; emoji: string; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <div className="widget group">
      <div className="widget-head">
        <GripVertical size={12} style={{ color: "var(--text-faint)" }} />
        <span>{emoji}</span>
        <span className="flex-1">{title}</span>
        {onRemove && (
          <button
            className="hidden group-hover:block"
            style={{ color: "var(--text-faint)" }}
            title="Remove widget"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={onRemove}
          >
            <X size={13} />
          </button>
        )}
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
}

// calendar preview · next 3 events (google + atlas merged)
function CalendarPreview({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Array<{ id: string; title: string; starts_at: string; source: string }>>([]);
  useEffect(() => {
    const from = new Date().toISOString();
    const to = new Date(Date.now() + 14 * 86400e3).toISOString();
    fetch(`/api/gcal?from=${from}&to=${to}`)
      .then((r) => r.json())
      .then((j) => setEvents(((j.events ?? []) as typeof events).slice(0, 3)))
      .catch(() => setEvents([]));
  }, []);
  return (
    <div className="space-y-1">
      {events.length === 0 && <div className="text-xs" style={{ color: "var(--text-faint)" }}>No upcoming events</div>}
      {events.map((e) => (
        <button key={e.id} className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-black/5" onClick={() => navigate(`/p/${item.id}`)}>
          <span className="text-xs" style={{ color: "#448361" }}>●</span>
          <span className="flex-1 truncate">{e.title}</span>
          <span className="text-xs" style={{ color: "var(--text-faint)" }}>
            {new Date(e.starts_at).toLocaleDateString([], { month: "short", day: "numeric" })}
          </span>
        </button>
      ))}
    </div>
  );
}

// agent preview · last message + folders
function AgentPreview({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [last, setLast] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const { data: chats } = await sbClient().from("atlas_chats").select("id").eq("nav_id", item.id).order("created_at", { ascending: false }).limit(1);
      if (!chats?.[0]) return;
      const { data: m } = await sbClient().from("atlas_messages").select("content,role").eq("chat_id", chats[0].id).order("created_at", { ascending: false }).limit(1);
      if (m?.[0]) setLast(`${m[0].role === "brother" ? "you" : "arm"}: ${m[0].content.slice(0, 90)}`);
    })().catch(() => undefined);
  }, [item.id]);
  return (
    <div className="space-y-1.5">
      {last && (
        <button className="w-full rounded-md px-2 py-1 text-left text-xs hover:bg-black/5" style={{ color: "var(--text-soft)" }} onClick={() => navigate(`/p/${item.id}`)}>
          💬 {last}
        </button>
      )}
      <PageWidget item={item} />
    </div>
  );
}

// live window into any page · root folders + counts · click-through
function PageWidget({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  useEffect(() => {
    listNodes(item.id).then(setNodes).catch(() => setNodes([]));
  }, [item.id]);
  const roots = nodes.filter((n) => !n.parent_id && !n.hidden);
  const countIn = (id: string): number => {
    const kids = nodes.filter((n) => n.parent_id === id);
    return kids.length + kids.reduce((a, k) => a + countIn(k.id), 0);
  };
  return (
    <div className="space-y-1">
      {roots.length === 0 && (
        <button className="text-xs underline" style={{ color: "var(--text-faint)" }} onClick={() => navigate(`/p/${item.id}`)}>
          Open {item.title} →
        </button>
      )}
      {roots.slice(0, 8).map((n) => (
        <button
          key={n.id}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-black/5"
          onClick={() => navigate(`/p/${item.id}/n/${n.id}`)}
        >
          <span>{n.emoji}</span>
          <span className="flex-1 truncate">{n.title}</span>
          <span className="text-xs" style={{ color: "var(--text-faint)" }}>{countIn(n.id) || ""}</span>
        </button>
      ))}
    </div>
  );
}

export default function Canvas({ nav }: { nav: NavItem[]; home: NavItem }) {
  const navigate = useNavigate();
  const [recent, setRecent] = useState<Node[]>([]);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [widgets, setWidgets] = useState<CanvasWidget[]>([]);
  const [ready, setReady] = useState(false);
  const [picking, setPicking] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();
  const stateRef = useRef<{ layout: Layout; widgets: CanvasWidget[]; width?: number }>({ layout, widgets, width });
  stateRef.current = { layout, widgets, width };

  const arms = nav.filter((n) => n.section === "arms");
  const navById = useMemo(() => new Map(nav.map((n) => [n.id, n])), [nav]);
  const addable = nav.filter((n) => n.template !== "canvas");

  useEffect(() => {
    recentNodes(12).then(setRecent).catch(() => setRecent([]));
    getCanvas(KEY)
      .then(({ layout: saved, widgets: w }) => {
        if (saved && Array.isArray(saved) && saved.length > 0) {
          // merge: widgets born after the layout was saved get their DEFAULT slot
          // (not a squished fallback) · new arrivals push existing rows down
          (window as unknown as Record<string, unknown>).__layoutMerge = "v2"; // runtime proof tag
          const have = new Set((saved as Layout).map((l) => l.i));
          const missing = DEFAULT_LAYOUT.filter((d) => !have.has(d.i));
          setLayout(missing.length ? [...missing, ...(saved as Layout).map((l) => ({ ...l, y: l.y + 2 }))] : (saved as Layout));
        }
        setWidgets(w);
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  // persist ONLY desktop-breakpoint layouts · mobile collapse must never
  // overwrite the saved desktop arrangement (bug caught 2026-06-11 22:07)
  const persist = useCallback((nextLayout: Layout, nextWidgets: CanvasWidget[]) => {
    setWidgets(nextWidgets);
    if ((stateRef.current.width ?? 0) >= 640) {
      setLayout(nextLayout);
      void saveCanvas(KEY, nextLayout as unknown as unknown[], nextWidgets).catch(() => undefined);
    } else {
      void saveCanvas(KEY, stateRef.current.layout as unknown as unknown[], nextWidgets).catch(() => undefined);
    }
  }, []);

  const addWidget = (navId: string) => {
    setPicking(false);
    const { layout: l, widgets: w } = stateRef.current;
    const i = `w-${navId.slice(0, 8)}-${Date.now().toString(36)}`;
    const maxY = l.reduce((m, it) => Math.max(m, it.y + it.h), 0);
    persist([...l, { i, x: 0, y: maxY, w: 5, h: 4 }], [...w, { i, navId }]);
  };

  const removeWidget = (i: string) => {
    if (!window.confirm("Are you sure you want to remove this widget?")) return;
    const { layout: l, widgets: w } = stateRef.current;
    persist(l.filter((it) => it.i !== i), w.filter((it) => it.i !== i));
  };

  const layouts = useMemo(
    () => ({ lg: layout, sm: layout.map((l) => ({ ...l, x: 0, w: 1 })) }),
    [layout],
  );

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 backdrop-blur"
        style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-sm font-semibold">🏠 Home</h1>
        <div className="relative">
          <button
            className="flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
            onClick={() => setPicking((v) => !v)}
          >
            <Plus size={13} /> Add widget
          </button>
          {picking && (
            <div className="ctx-menu" style={{ position: "absolute", right: 0, top: "110%" }}>
              {addable.map((n) => (
                <button key={n.id} onClick={() => addWidget(n.id)}>
                  {n.emoji} {n.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4" ref={containerRef}>
        <GoneStrip navById={navById} onJump={(n) => navigate(`/p/${n.nav_id}/n/${n.id}`)} />
        {ready && mounted && (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={{ lg: 640, sm: 0 }}
            cols={{ lg: 12, sm: 1 }}
            rowHeight={72}
            margin={[12, 12]}
            dragConfig={{ handle: ".widget-head" }}
            onLayoutChange={(l) => persist([...l], stateRef.current.widgets)}
          >
            <div key="arms">
              <Widget title="Arms" emoji="🐙">
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {arms.map((a) => (
                    <button
                      key={a.id}
                      className="rounded-lg border p-3 text-left transition-shadow hover:shadow-sm"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => navigate(`/p/${a.id}`)}
                    >
                      <div className="text-xl">{a.emoji}</div>
                      <div className="mt-1 text-sm font-medium">{a.title}</div>
                      <div className="mt-0.5 truncate text-xs" style={{ color: "var(--text-faint)" }}>
                        {(a.model || "").split("/")[1] ?? ""}
                      </div>
                    </button>
                  ))}
                </div>
              </Widget>
            </div>
            <div key="recent">
              <Widget title="Recent" emoji="🕐">
                <div className="space-y-0.5">
                  {recent.length === 0 && (
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>Nothing yet</div>
                  )}
                  {recent.map((n) => {
                    const owner = navById.get(n.nav_id);
                    return (
                      <button
                        key={n.id}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-black/5"
                        onClick={() => navigate(`/p/${n.nav_id}/n/${n.id}`)}
                      >
                        <span>{n.emoji}</span>
                        <span className="flex-1 truncate">{n.title}</span>
                        <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                          {owner?.title ?? ""} · {timeAgo(n.updated_at)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Widget>
            </div>
            <div key="drop">
              <Widget title="Drop · AI files it" emoji="📥">
                <DropWidget />
              </Widget>
            </div>
            <div key="window">
              <Widget title="The Window · Atlas now" emoji="🪟">
                <WindowWidget />
              </Widget>
            </div>
            <div key="growth">
              <Widget title="Growth" emoji="🌱">
                <GrowthWidget />
              </Widget>
            </div>
            <div key="cost">
              <Widget title="AI usage today" emoji="💸">
                <CostWidget />
              </Widget>
            </div>
            <div key="memory">
              <Widget title="Memory · Brain" emoji="🧠">
                <MemoryWidget />
              </Widget>
            </div>
            {widgets.map((w) => {
              const item = navById.get(w.navId);
              if (!item) return <div key={w.i} />;
              return (
                <div key={w.i}>
                  <Widget title={item.title} emoji={item.emoji} onRemove={() => removeWidget(w.i)}>
                    {item.template === "calendar" ? (
                      <CalendarPreview item={item} />
                    ) : item.template === "agent" ? (
                      <AgentPreview item={item} />
                    ) : (
                      <PageWidget item={item} />
                    )}
                  </Widget>
                </div>
              );
            })}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  );
}
