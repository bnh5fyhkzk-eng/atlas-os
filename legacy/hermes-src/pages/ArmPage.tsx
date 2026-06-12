// /arm/:name and /arm/:name/:pageId · Notion-drill arm page
// GOAL-1.5 rebuild per brother direct 2026-06-11 20:40 ·
// "most of this is noise · kanban style · click category opens subcategories
//  and the list goes on (notion style) · build the foundation the right way"
// Main pane IS the drill · category cards → subcategory cards → notes → editor.
// Dead controls removed: view-switcher (views didn't exist) · embed-picker (APIs 502 until Goal 2).
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Plus, FileText } from "lucide-react";
import { ArmSidebar } from "@/components/atlas/ArmSidebar";
import { BlockEditor } from "@/components/atlas/BlockEditor";
import { AuthGate } from "@/components/atlas/AuthGate";
import { NoteSlideOver } from "@/components/atlas/NoteSlideOver";
import {
  getPage,
  listBlocks,
  saveNativeDoc,
  updatePage,
  listAllPagesForArm,
  createPage,
  subscribeToArmTree,
  fiveFieldScaffold,
  type Page,
} from "@/lib/atlas-supabase";
import "@/styles/atlas-theme.css";

const ARM_TITLES: Record<string, string> = {
  curiosity: "🌱 Curiosity",
  pascal: "🤝 Pascal",
  research: "👁 Research",
  code: "✋ Code",
  infra: "💗 Infra",
  dream: "🌙 Dream",
  hermes: "🧠 Hermes",
  charle: "💼 Charle",
  manager: "🎯 Manager",
};

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export default function ArmPage() {
  return (
    <AuthGate>
      <ArmPageInner />
    </AuthGate>
  );
}

function ArmPageInner() {
  const params = useParams<{ name: string; pageId?: string }>();
  const armSlug = params.name ?? "curiosity";
  const pageId = params.pageId;
  const navigate = useNavigate();

  const [armPages, setArmPages] = useState<Page[]>([]);
  const [page, setPage] = useState<Page | null>(null);
  const [doc, setDoc] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [forceFull, setForceFull] = useState(false);

  // ── tree facts ──────────────────────────────────────────────
  const byId = useMemo(() => new Map(armPages.map((p) => [p.id, p])), [armPages]);
  const childrenOf = useMemo(() => {
    const m = new Map<string | null, Page[]>();
    for (const p of armPages) {
      const k = p.parent_id ?? null;
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(p);
    }
    for (const arr of m.values()) arr.sort((a, b) => a.order_idx - b.order_idx);
    return m;
  }, [armPages]);

  const descendantCount = useCallback(
    (id: string): number => {
      const kids = childrenOf.get(id) ?? [];
      return kids.length + kids.reduce((acc, k) => acc + descendantCount(k.id), 0);
    },
    [childrenOf],
  );

  const depthOf = useCallback(
    (id: string): number => {
      let d = 0;
      let cur = byId.get(id);
      while (cur?.parent_id && byId.has(cur.parent_id) && d < 10) {
        cur = byId.get(cur.parent_id);
        d++;
      }
      return d;
    },
    [byId],
  );

  const breadcrumb = useMemo(() => {
    if (!pageId) return [];
    const path: Page[] = [];
    let cur = byId.get(pageId);
    while (cur) {
      path.unshift(cur);
      cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
    }
    return path;
  }, [pageId, byId]);

  const pageDepth = pageId ? depthOf(pageId) : -1;
  const isNoteLevel = pageId != null && pageDepth >= 2 && !forceFull;

  // ── data loading ────────────────────────────────────────────
  const reloadTree = useCallback(async () => {
    try {
      const p = await listAllPagesForArm(armSlug);
      setArmPages(p);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }, [armSlug]);

  useEffect(() => {
    setLoading(true);
    void reloadTree().finally(() => setLoading(false));
    const unsub = subscribeToArmTree(armSlug, () => void reloadTree());
    return () => unsub();
  }, [armSlug, reloadTree]);

  useEffect(() => {
    setForceFull(false);
    if (!pageId) {
      setPage(null);
      setDoc(null);
      return;
    }
    let cancel = false;
    (async () => {
      const p = await getPage(pageId);
      if (cancel) return;
      setPage(p);
      if (p) {
        const blocks = await listBlocks(p.id);
        const native = blocks.find((b) => b.block_type === "native");
        if (!cancel) setDoc(native?.content ?? null);
      }
    })().catch((e: unknown) => setError(e instanceof Error ? e.message : JSON.stringify(e)));
    return () => { cancel = true; };
  }, [pageId]);

  const handleSave = useCallback(async (newDoc: unknown) => {
    if (!page) return;
    setSaving("saving");
    try {
      await saveNativeDoc(page.id, newDoc);
      setSaving("saved");
      setTimeout(() => setSaving("idle"), 1200);
    } catch (e: unknown) {
      setSaving("idle");
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }, [page]);

  const handleAdd = async () => {
    const title = addTitle.trim();
    if (!title) { setAdding(false); return; }
    setAddTitle("");
    setAdding(false);
    try {
      const p = await createPage({ arm_slug: armSlug, parent_id: pageId ?? undefined, title });
      void reloadTree();
      navigate(`/arm/${armSlug}/${p.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  };

  // ── render pieces ───────────────────────────────────────────
  const currentChildren = childrenOf.get(pageId ?? null) ?? [];
  const childLabel = pageDepth < 0 ? "Categories" : pageDepth === 0 ? "Sub-categories" : "Notes";
  const addLabel = pageDepth < 0 ? "category" : pageDepth === 0 ? "sub-category" : "note";

  const drillCards = (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--atlas-text-faint)" }}>
        {childLabel}
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {currentChildren.map((c) => {
          const n = descendantCount(c.id);
          return (
            <button
              key={c.id}
              className="rounded-lg border p-3 text-left transition-shadow hover:shadow-sm"
              style={{ borderColor: "var(--atlas-border)" }}
              onClick={() => navigate(`/arm/${armSlug}/${c.id}`)}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{c.emoji}</span>
                <span className="flex-1 truncate text-sm font-medium">{c.title}</span>
                <ChevronRight size={14} style={{ color: "var(--atlas-text-faint)" }} />
              </div>
              <div className="mt-1.5 flex items-center gap-2 text-xs" style={{ color: "var(--atlas-text-faint)" }}>
                {n > 0 ? <span>{n} inside</span> : <span>empty</span>}
                <span>·</span>
                <span>{timeAgo(c.updated_at)}</span>
              </div>
            </button>
          );
        })}
        {adding ? (
          <input
            autoFocus
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void handleAdd();
              if (e.key === "Escape") { setAdding(false); setAddTitle(""); }
            }}
            onBlur={() => void handleAdd()}
            placeholder={`New ${addLabel} · Enter`}
            className="rounded-lg border border-dashed p-3 text-sm outline-none"
            style={{ borderColor: "var(--atlas-border)", background: "var(--atlas-hover)" }}
          />
        ) : (
          <button
            className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-sm"
            style={{ borderColor: "var(--atlas-border)", color: "var(--atlas-text-faint)" }}
            onClick={() => setAdding(true)}
          >
            <Plus size={14} /> Add {addLabel}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="atlas-surface flex min-h-screen">
      <ArmSidebar />
      <main className="flex-1 overflow-y-auto">
        <header
          className="sticky top-0 z-10 px-8 py-4 backdrop-blur"
          style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--atlas-border)" }}
        >
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--atlas-text-faint)" }}>
            <button onClick={() => navigate(`/arm/${armSlug}`)} className="hover:underline">
              {ARM_TITLES[armSlug] ?? armSlug}
            </button>
            {breadcrumb.slice(0, -1).map((b) => (
              <span key={b.id} className="flex items-center gap-1">
                <ChevronRight size={11} />
                <button onClick={() => navigate(`/arm/${armSlug}/${b.id}`)} className="hover:underline">
                  {b.emoji} {b.title}
                </button>
              </span>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between">
            {page && !isNoteLevel ? (
              <input
                className="w-full bg-transparent text-2xl font-semibold outline-none"
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                onBlur={(e) => { void updatePage(page.id, { title: e.target.value }).then(() => reloadTree()); }}
              />
            ) : (
              <h1 className="text-2xl font-semibold">
                {!pageId ? (ARM_TITLES[armSlug] ?? armSlug) : `${page?.emoji ?? ""} ${page?.title ?? ""}`}
              </h1>
            )}
            <span className="shrink-0 text-xs" style={{ color: "var(--atlas-text-faint)" }}>
              {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved ✓" : ""}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-8 py-6 space-y-8">
          {error && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">{error}</div>
          )}

          {loading && <div className="text-sm" style={{ color: "var(--atlas-text-faint)" }}>Loading…</div>}

          {/* drill cards · the main content at every level */}
          {!loading && !isNoteLevel && drillCards}

          {/* page's own blocks · below the drill · Notion-shape (page = content + sub-pages) */}
          {!loading && page && !isNoteLevel && (
            <div>
              {currentChildren.length > 0 && (
                <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--atlas-text-faint)" }}>
                  <FileText size={11} /> Page content
                </div>
              )}
              <BlockEditor
                key={page.id}
                initialDoc={doc ?? (page.parent_id ? fiveFieldScaffold() : null)}
                onChange={handleSave}
                placeholder="Type / for commands · write anything"
              />
            </div>
          )}
        </div>

        {!loading && page && isNoteLevel && (
          <NoteSlideOver
            pageId={page.id}
            onClose={() => navigate(page.parent_id ? `/arm/${armSlug}/${page.parent_id}` : `/arm/${armSlug}`)}
            onOpenFull={() => setForceFull(true)}
          />
        )}
      </main>
    </div>
  );
}
