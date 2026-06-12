// Note slide-over panel · GOAL-1-FEEL taste-move (brother greenlit)
// Leaf note opens as panel instead of page-jump · deep-link still works via /arm/:name/:pageId
import { useEffect, useState, useCallback } from "react";
import { X, ExternalLink } from "lucide-react";
import { BlockEditor } from "./BlockEditor";
import {
  getPage,
  listBlocks,
  saveNativeDoc,
  updatePage,
  type Page,
} from "@/lib/atlas-supabase";

export function NoteSlideOver({
  pageId,
  onClose,
  onOpenFull,
}: {
  pageId: string;
  onClose: () => void;
  onOpenFull: (id: string) => void;
}) {
  const [page, setPage] = useState<Page | null>(null);
  const [doc, setDoc] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    (async () => {
      const p = await getPage(pageId);
      if (cancel) return;
      setPage(p);
      if (p) {
        const blocks = await listBlocks(p.id);
        const native = blocks.find((b) => b.block_type === "native");
        if (!cancel) setDoc(native?.content ?? null);
      }
      setLoading(false);
    })().catch(() => setLoading(false));
    return () => { cancel = true; };
  }, [pageId]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  const handleSave = useCallback(async (newDoc: unknown) => {
    if (!page) return;
    setSaving("saving");
    try {
      await saveNativeDoc(page.id, newDoc);
      setSaving("saved");
      setTimeout(() => setSaving("idle"), 1200);
    } catch {
      setSaving("idle");
    }
  }, [page]);

  return (
    <>
      <div className="atlas-slideover-backdrop" onClick={onClose} />
      <div className="atlas-slideover">
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid var(--atlas-border)" }}
        >
          {page && (
            <input
              className="flex-1 bg-transparent text-lg font-semibold outline-none"
              defaultValue={page.title}
              onBlur={(e) => { if (e.target.value !== page.title) void updatePage(page.id, { title: e.target.value }); }}
            />
          )}
          <span className="text-xs" style={{ color: "var(--atlas-text-faint)" }}>
            {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved ✓" : ""}
          </span>
          <button onClick={() => onOpenFull(pageId)} title="Open full page" style={{ color: "var(--atlas-text-soft)" }}>
            <ExternalLink size={15} />
          </button>
          <button onClick={onClose} title="Close" style={{ color: "var(--atlas-text-soft)" }}>
            <X size={17} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-4">
          {loading ? (
            <div className="px-4 text-sm" style={{ color: "var(--atlas-text-faint)" }}>Loading…</div>
          ) : page ? (
            <BlockEditor key={page.id} initialDoc={doc} onChange={handleSave} placeholder="Type / for commands" />
          ) : (
            <div className="px-4 text-sm" style={{ color: "var(--atlas-text-faint)" }}>Note not found</div>
          )}
        </div>
      </div>
    </>
  );
}
