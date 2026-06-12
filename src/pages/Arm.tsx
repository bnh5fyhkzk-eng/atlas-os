// Arm page · Notion drill · foundation-v2
// Main pane IS the drill: categories → sub-categories → notes → editor.
// Left rail: arms list + tree of current arm. No dead controls.
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, Plus, Menu, X, ExternalLink, Archive } from "lucide-react";
import { BlockEditor } from "../components/BlockEditor";
import {
  listArms,
  listPages,
  createPage,
  updatePage,
  archivePage,
  listBlocks,
  saveDoc,
  subscribeArm,
  fiveFieldScaffold,
  type Arm as ArmT,
  type Page,
} from "../lib/supabase";

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export default function Arm() {
  const params = useParams<{ slug: string; pageId?: string }>();
  const slug = params.slug ?? "curiosity";
  const pageId = params.pageId ?? null;
  const navigate = useNavigate();

  const [arms, setArms] = useState<ArmT[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  // ── tree facts ─────────────────────────────────────────────
  const byId = useMemo(() => new Map(pages.map((p) => [p.id, p])), [pages]);
  const kidsOf = useMemo(() => {
    const m = new Map<string | null, Page[]>();
    for (const p of pages) {
      const k = p.parent_id && byId.has(p.parent_id) ? p.parent_id : null;
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(p);
    }
    for (const arr of m.values())
      arr.sort((a, b) => (a.pinned === b.pinned ? a.order_idx - b.order_idx : a.pinned ? -1 : 1));
    return m;
  }, [pages, byId]);

  const countIn = useCallback(
    (id: string): number => {
      const kids = kidsOf.get(id) ?? [];
      return kids.length + kids.reduce((n, k) => n + countIn(k.id), 0);
    },
    [kidsOf],
  );

  const crumb = useMemo(() => {
    const path: Page[] = [];
    let cur = pageId ? byId.get(pageId) : undefined;
    while (cur) {
      path.unshift(cur);
      cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
    }
    return path;
  }, [pageId, byId]);

  const current = pageId ? byId.get(pageId) ?? null : null;
  const depth = crumb.length - 1; // -1 root · 0 category · 1 subcat · 2+ note
  const children = kidsOf.get(pageId) ?? [];
  const arm = arms.find((a) => a.slug === slug);

  // ── load ───────────────────────────────────────────────────
  const reload = useCallback(async () => {
    try {
      const [a, p] = await Promise.all([listArms(), listPages(slug)]);
      setArms(a);
      setPages(p);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }, [slug]);

  useEffect(() => {
    setLoading(true);
    void reload().finally(() => setLoading(false));
    const unsub = subscribeArm(slug, () => void reload());
    return () => unsub();
  }, [slug, reload]);

  const handleAdd = async () => {
    const title = addTitle.trim();
    setAdding(false);
    setAddTitle("");
    if (!title) return;
    try {
      const p = await createPage({ arm_slug: slug, parent_id: pageId ?? undefined, title });
      await reload();
      navigate(`/arm/${slug}/${p.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  };

  const levelName = depth < 0 ? "category" : depth === 0 ? "sub-category" : "note";

  return (
    <div className="flex min-h-screen">
      {/* mobile nav toggle */}
      <button
        className="fixed left-3 top-3 z-[55] rounded-md border bg-white p-1.5 md:hidden"
        style={{ borderColor: "var(--border)" }}
        onClick={() => setMobileNav((v) => !v)}
      >
        {mobileNav ? <X size={16} /> : <Menu size={16} />}
      </button>
      {mobileNav && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setMobileNav(false)} />}

      {/* left rail · arms only · tree lives in the drill itself */}
      <nav
        className={"sidebar h-screen w-56 shrink-0 overflow-y-auto border-r" + (mobileNav ? " open" : "")}
        style={{ background: "var(--bg-side)", borderColor: "var(--border)" }}
      >
        <Link to="/home" className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
          🏠 Atlas-OS
        </Link>
        <div className="px-2 pb-4">
          {arms.map((a) => (
            <button
              key={a.slug}
              className={"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm " + (a.slug === slug ? "font-medium" : "")}
              style={{ background: a.slug === slug ? "var(--active)" : undefined }}
              onClick={() => { navigate(`/arm/${a.slug}`); setMobileNav(false); }}
            >
              <span>{a.emoji}</span>
              <span className="flex-1 truncate">{a.name}</span>
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                {kidsOf.size > 0 && a.slug === slug ? (kidsOf.get(null)?.length ?? 0) : ""}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* main · the drill */}
      <main className="min-w-0 flex-1 overflow-y-auto">
        <header
          className="sticky top-0 z-10 px-6 py-4 backdrop-blur md:px-10"
          style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "var(--text-faint)" }}>
            <button onClick={() => navigate(`/arm/${slug}`)} className="hover:underline">
              {arm ? `${arm.emoji} ${arm.name}` : slug}
            </button>
            {crumb.map((b, i) => (
              <span key={b.id} className="flex items-center gap-1">
                <ChevronRight size={11} />
                {i < crumb.length - 1 ? (
                  <button onClick={() => navigate(`/arm/${slug}/${b.id}`)} className="hover:underline">
                    {b.emoji} {b.title}
                  </button>
                ) : (
                  <span style={{ color: "var(--text-soft)" }}>{b.emoji} {b.title}</span>
                )}
              </span>
            ))}
          </div>
          <h1 className="mt-1 truncate text-2xl font-semibold">
            {current ? `${current.emoji} ${current.title}` : arm ? `${arm.emoji} ${arm.name}` : slug}
          </h1>
        </header>

        <div className="mx-auto max-w-4xl space-y-8 px-6 py-6 md:px-10">
          {error && <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">{error}</div>}
          {loading && <div className="text-sm" style={{ color: "var(--text-faint)" }}>Loading…</div>}

          {/* drill cards · note-level renders editor instead */}
          {!loading && depth < 2 && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((c) => {
                const n = countIn(c.id);
                return (
                  <div key={c.id} className="group relative">
                    <button
                      className="w-full rounded-lg border p-3 text-left transition-shadow hover:shadow-sm"
                      style={{ borderColor: "var(--border)", opacity: c.hidden ? 0.5 : 1 }}
                      onClick={() => navigate(`/arm/${slug}/${c.id}`)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.emoji}</span>
                        <span className="flex-1 truncate text-sm font-medium">{c.title}</span>
                        <ChevronRight size={14} style={{ color: "var(--text-faint)" }} />
                      </div>
                      <div className="mt-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
                        {n > 0 ? `${n} inside` : "empty"} · {timeAgo(c.updated_at)}
                      </div>
                    </button>
                    <button
                      className="absolute right-2 top-2 hidden rounded p-1 text-xs group-hover:block hover:bg-black/5"
                      title="Archive (restorable)"
                      onClick={(e) => {
                        e.stopPropagation();
                        void archivePage(c.id).then(reload);
                      }}
                    >
                      <Archive size={12} style={{ color: "var(--text-faint)" }} />
                    </button>
                  </div>
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
                  placeholder={`New ${levelName} · Enter`}
                  className="rounded-lg border border-dashed p-3 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--hover)" }}
                />
              ) : (
                <button
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-sm"
                  style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                  onClick={() => setAdding(true)}
                >
                  <Plus size={14} /> Add {levelName}
                </button>
              )}
            </div>
          )}

          {/* page content · category/subcategory own blocks (Notion: page = content + sub-pages) */}
          {!loading && current && depth >= 0 && depth < 2 && (
            <PageDoc key={current.id} page={current} />
          )}
        </div>

        {/* note level · slide-over editor over the parent */}
        {!loading && current && depth >= 2 && (
          <NotePanel
            page={current}
            onClose={() => navigate(current.parent_id ? `/arm/${slug}/${current.parent_id}` : `/arm/${slug}`)}
          />
        )}
      </main>
    </div>
  );
}

// page's own BlockNote doc · lazy load + debounced save
function PageDoc({ page }: { page: Page }) {
  const [doc, setDoc] = useState<unknown | null | undefined>(undefined);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    let cancel = false;
    listBlocks(page.id)
      .then((blocks) => {
        if (cancel) return;
        const native = blocks.find((b) => b.block_type === "native");
        setDoc(native?.content ?? null);
      })
      .catch(() => setDoc(null));
    return () => { cancel = true; };
  }, [page.id]);

  if (doc === undefined) return null;

  return (
    <div>
      <div className="mb-1 flex justify-end text-xs" style={{ color: "var(--text-faint)" }}>
        {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved ✓" : ""}
      </div>
      <BlockEditor
        initialDoc={doc ?? (page.parent_id ? fiveFieldScaffold() : null)}
        onChange={(d) => {
          setSaving("saving");
          saveDoc(page.id, d)
            .then(() => {
              setSaving("saved");
              setTimeout(() => setSaving("idle"), 1200);
            })
            .catch(() => setSaving("idle"));
        }}
        placeholder="Type / for commands"
      />
    </div>
  );
}

function NotePanel({ page, onClose }: { page: Page; onClose: () => void }) {
  const [title, setTitle] = useState(page.title);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <>
      <div className="slideover-backdrop" onClick={onClose} />
      <div className="slideover">
        <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <span>{page.emoji}</span>
          <input
            className="flex-1 bg-transparent text-lg font-semibold outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => { if (title !== page.title) void updatePage(page.id, { title }); }}
          />
          <a href={window.location.pathname} title="Permalink" style={{ color: "var(--text-soft)" }}>
            <ExternalLink size={15} />
          </a>
          <button onClick={onClose} style={{ color: "var(--text-soft)" }}>
            <X size={17} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-4">
          <PageDoc page={page} />
        </div>
      </div>
    </>
  );
}
