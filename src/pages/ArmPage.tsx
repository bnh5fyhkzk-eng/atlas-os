// /arm/:name and /arm/:name/:pageId · Notion-modular arm page
// Per FOUNDATION-REBUILD Phase 2 + 3
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArmSidebar } from "@/components/atlas/ArmSidebar";
import { BlockEditor } from "@/components/atlas/BlockEditor";
import {
  getPage,
  listBlocks,
  saveNativeDoc,
  updatePage,
  listAllPagesForArm,
  createPage,
  subscribeToPageBlocks,
  type Page,
} from "@/lib/atlas-supabase";
import { LayoutGrid, Rows, KanbanSquare, Calendar, Image as ImageIcon, FileText } from "lucide-react";

const VIEW_TYPES: Array<{ value: Page["view_type"]; label: string; icon: typeof FileText }> = [
  { value: "doc",      label: "Doc",      icon: FileText },
  { value: "table",    label: "Table",    icon: Rows },
  { value: "board",    label: "Board",    icon: LayoutGrid },
  { value: "kanban",   label: "Kanban",   icon: KanbanSquare },
  { value: "calendar", label: "Calendar", icon: Calendar },
  { value: "gallery",  label: "Gallery",  icon: ImageIcon },
];

export default function ArmPage() {
  const params = useParams<{ name: string; pageId?: string }>();
  const armSlug = params.name ?? "curiosity";
  const pageId = params.pageId;
  const navigate = useNavigate();

  const [page, setPage] = useState<Page | null>(null);
  const [doc, setDoc] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const [error, setError] = useState<string | null>(null);
  const [armPages, setArmPages] = useState<Page[]>([]);

  const loadPage = useCallback(async () => {
    if (!pageId) {
      setPage(null);
      setDoc(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const p = await getPage(pageId);
      setPage(p);
      if (p) {
        const blocks = await listBlocks(p.id);
        const native = blocks.find((b) => b.block_type === "native");
        setDoc(native?.content ?? null);
      }
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => { void loadPage(); }, [loadPage]);

  // Realtime · Hermes-DeepSeek writes appear live
  useEffect(() => {
    if (!page) return;
    const unsub = subscribeToPageBlocks(page.id, () => { void loadPage(); });
    return () => unsub();
  }, [page, loadPage]);

  // Load arm-level page list for empty-state shortcuts
  useEffect(() => {
    listAllPagesForArm(armSlug)
      .then(setArmPages)
      .catch(() => setArmPages([]));
  }, [armSlug, page]);

  const handleSave = useCallback(async (newDoc: unknown) => {
    if (!page) return;
    setSaving("saving");
    try {
      await saveNativeDoc(page.id, newDoc);
      setSaving("saved");
      setTimeout(() => setSaving("idle"), 1500);
    } catch (e: unknown) {
      console.error("[ArmPage] save failed", e);
      setSaving("idle");
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [page]);

  const handleTitleChange = async (title: string) => {
    if (!page) return;
    try {
      const next = await updatePage(page.id, { title });
      setPage(next);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleViewChange = async (view_type: Page["view_type"]) => {
    if (!page) return;
    try {
      const next = await updatePage(page.id, { view_type });
      setPage(next);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleCreateRootPage = async () => {
    const title = prompt("First page title (e.g. \"LLM Dreaming\"):");
    if (!title) return;
    const p = await createPage({ arm_slug: armSlug, title });
    navigate(`/arm/${armSlug}/${p.id}`);
  };

  const armTitle = useMemo(() => {
    const map: Record<string, string> = {
      curiosity: "🌱 Curiosity",
      pascal:    "🤝 Pascal",
      research:  "👁 Research",
      code:      "✋ Code",
      infra:     "💗 Infra",
      dream:     "🌙 Dream",
      hermes:    "🧠 Hermes",
      charle:    "💼 Charle",
      manager:   "🎯 Manager",
    };
    return map[armSlug] ?? armSlug;
  }, [armSlug]);

  return (
    <div className="flex min-h-screen bg-white text-stone-900">
      <ArmSidebar />
      <main className="flex-1 overflow-y-auto">
        <header className="border-b border-black/10 px-8 py-6 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex-1">
            {page ? (
              <input
                className="text-3xl font-semibold bg-transparent border-0 outline-none w-full focus:bg-black/[0.02] rounded px-1 -mx-1"
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                onBlur={(e) => handleTitleChange(e.target.value)}
              />
            ) : (
              <h1 className="text-3xl font-semibold">{armTitle}</h1>
            )}
            <div className="text-xs opacity-50 mt-1">
              {page ? `${armSlug} · ${page.view_type}` : `${armSlug} · pick a page or create one`}
            </div>
          </div>
          {page && (
            <div className="flex items-center gap-2">
              {VIEW_TYPES.map((v) => (
                <button
                  key={v.value}
                  className={
                    "px-2 py-1 rounded text-xs flex items-center gap-1 " +
                    (page.view_type === v.value
                      ? "bg-black text-white"
                      : "bg-black/5 hover:bg-black/10")
                  }
                  onClick={() => handleViewChange(v.value)}
                >
                  <v.icon size={12} />
                  {v.label}
                </button>
              ))}
              <span className="text-xs opacity-60 ml-2">
                {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved ✓" : ""}
              </span>
            </div>
          )}
        </header>

        <div className="px-8 py-8 max-w-4xl mx-auto">
          {error && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-sm rounded">
              <div className="font-medium">Heads up</div>
              <div className="opacity-70 mt-1">{error}</div>
              {error.includes("VITE_SUPABASE") && (
                <div className="mt-2 text-xs">
                  Phase 1 not live yet · drop Supabase env keys to wake it up.
                  See <code>~/.claude/state/atlasos-FOUNDATION-REBUILD-MASTER-2026-06-11.md</code>
                </div>
              )}
            </div>
          )}

          {loading && <div className="opacity-50">Loading…</div>}

          {!loading && !pageId && (
            <div className="space-y-6">
              <div className="border border-dashed border-black/20 rounded-lg p-8 text-center">
                <div className="text-lg font-medium">No page selected</div>
                <div className="text-sm opacity-60 mt-2">
                  Pick a page from the sidebar · or start one
                </div>
                <button
                  className="mt-4 px-4 py-2 rounded bg-black text-white text-sm"
                  onClick={handleCreateRootPage}
                >
                  + New page
                </button>
              </div>

              {armPages.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider opacity-60 mb-2">
                    Existing pages
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {armPages.slice(0, 12).map((p) => (
                      <button
                        key={p.id}
                        className="text-left p-3 rounded border border-black/10 hover:bg-black/5"
                        onClick={() => navigate(`/arm/${armSlug}/${p.id}`)}
                      >
                        <div className="text-sm font-medium">
                          {p.emoji} {p.title}
                        </div>
                        <div className="text-xs opacity-50 mt-1">
                          {p.view_type} · {new Date(p.updated_at).toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && page && (
            <BlockEditor
              key={page.id}
              initialDoc={doc}
              onChange={handleSave}
              placeholder={`Type / for slash commands · or write in ${page.title}`}
            />
          )}
        </div>
      </main>
    </div>
  );
}
