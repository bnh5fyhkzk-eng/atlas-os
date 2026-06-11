// /atlas-canvas · full-screen single block-editor (TASTE-MOVE per partnership shape)
// Cmd+\ toggle from any page · "all data no chrome" mode
// Per FOUNDATION-REBUILD doc · section 9 · taste-move unprompted
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BlockEditor } from "@/components/atlas/BlockEditor";
import {
  getPage,
  createPage,
  listBlocks,
  saveNativeDoc,
  listAllPagesForArm,
} from "@/lib/atlas-supabase";

const CANVAS_PAGE_KEY = "atlas-canvas-page-id";

export default function AtlasCanvasPage() {
  const navigate = useNavigate();
  const [pageId, setPageId] = useState<string | null>(null);
  const [doc, setDoc] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        let id = localStorage.getItem(CANVAS_PAGE_KEY);
        if (id) {
          const p = await getPage(id);
          if (!p) id = null;
        }
        if (!id) {
          const existing = await listAllPagesForArm("manager");
          const canvas = existing.find((p) => p.title === "Atlas Canvas");
          if (canvas) {
            id = canvas.id;
          } else {
            const created = await createPage({
              arm_slug: "manager",
              title: "Atlas Canvas",
              emoji: "🎨",
            });
            id = created.id;
          }
          localStorage.setItem(CANVAS_PAGE_KEY, id);
        }
        setPageId(id);
        const blocks = await listBlocks(id);
        const native = blocks.find((b) => b.block_type === "native");
        setDoc(native?.content ?? null);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void init();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const handleSave = async (newDoc: unknown) => {
    if (!pageId) return;
    try {
      await saveNativeDoc(pageId, newDoc);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="px-6 py-3 flex items-center justify-between border-b border-black/5">
        <button
          className="flex items-center gap-1 text-sm opacity-60 hover:opacity-100"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={14} /> Back
        </button>
        <div className="text-xs opacity-50">Atlas Canvas · Esc to exit</div>
        <div style={{ width: 50 }} />
      </header>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {error && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-sm rounded">
            {error}
          </div>
        )}
        {loading && <div className="opacity-50">Loading…</div>}
        {!loading && pageId && (
          <BlockEditor
            key={pageId}
            initialDoc={doc}
            onChange={handleSave}
            placeholder="One canvas · all your thoughts · type / for blocks"
          />
        )}
      </div>
    </div>
  );
}
