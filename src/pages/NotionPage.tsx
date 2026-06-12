// NOTION-PAGE primitive · the drill engine · Atlas-OS v3
// folders → folders → notes · click/add/rename/delete at EVERY level ·
// proof-chips first-class · notes open as slide-over · breadcrumb
import { useEffect, useMemo, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Plus, X, Archive, Paperclip, FileText, StickyNote } from "lucide-react";
import { BlockEditor } from "../components/BlockEditor";
import {
  listNodes,
  createNode,
  updateNode,
  archiveNode,
  subscribeNodes,
  fiveFieldScaffold,
  type NavItem,
  type Node,
} from "../lib/db";

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export default function NotionPage({ item }: { item: NavItem }) {
  const { nodeId } = useParams<{ nodeId?: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState<"folder" | "note" | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const kidsOf = useMemo(() => {
    const m = new Map<string | null, Node[]>();
    for (const n of nodes) {
      const k = n.parent_id && byId.has(n.parent_id) ? n.parent_id : null;
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(n);
    }
    for (const arr of m.values())
      arr.sort((a, b) => (a.pinned === b.pinned ? a.order_idx - b.order_idx : a.pinned ? -1 : 1));
    return m;
  }, [nodes, byId]);

  const countIn = useCallback(
    (id: string): number => {
      const kids = kidsOf.get(id) ?? [];
      return kids.length + kids.reduce((acc, k) => acc + countIn(k.id), 0);
    },
    [kidsOf],
  );

  const crumb = useMemo(() => {
    const path: Node[] = [];
    let cur = nodeId ? byId.get(nodeId) : undefined;
    while (cur) {
      path.unshift(cur);
      cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
    }
    return path;
  }, [nodeId, byId]);

  const current = nodeId ? byId.get(nodeId) ?? null : null;
  const isNote = current?.kind === "note";
  const children = (kidsOf.get(nodeId ?? null) ?? []).filter((n) => !n.hidden);
  const folders = children.filter((n) => n.kind === "folder");
  const notes = children.filter((n) => n.kind === "note");

  const reload = useCallback(async () => {
    try {
      setNodes(await listNodes(item.id));
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  }, [item.id]);

  useEffect(() => {
    setLoading(true);
    void reload().finally(() => setLoading(false));
    const unsub = subscribeNodes(item.id, () => void reload());
    return () => unsub();
  }, [item.id, reload]);

  const handleAdd = async () => {
    const title = addTitle.trim();
    const kind = adding ?? "folder";
    setAdding(null);
    setAddTitle("");
    if (!title) return;
    try {
      const n = await createNode({ nav_id: item.id, parent_id: nodeId ?? null, kind, title });
      await reload();
      navigate(`/p/${item.id}/n/${n.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : JSON.stringify(e));
    }
  };

  const card = (n: Node) => {
    const count = countIn(n.id);
    return (
      <div key={n.id} className="group relative">
        <button
          className="w-full rounded-lg border p-3 text-left transition-shadow hover:shadow-sm"
          style={{ borderColor: "var(--border)" }}
          onClick={() => navigate(`/p/${item.id}/n/${n.id}`)}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{n.emoji}</span>
            {renaming === n.id ? (
              <input
                autoFocus
                defaultValue={n.title}
                className="flex-1 bg-transparent text-sm font-medium outline-none"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                  if (e.key === "Escape") setRenaming(null);
                }}
                onBlur={(e) => {
                  setRenaming(null);
                  if (e.target.value.trim() && e.target.value !== n.title)
                    void updateNode(n.id, { title: e.target.value.trim() }).then(reload);
                }}
              />
            ) : (
              <span
                className="flex-1 truncate text-sm font-medium"
                onDoubleClick={(e) => { e.stopPropagation(); setRenaming(n.id); }}
              >
                {n.title}
              </span>
            )}
            {n.kind === "folder" && <ChevronRight size={14} style={{ color: "var(--text-faint)" }} />}
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: "var(--text-faint)" }}>
            {n.kind === "folder" ? <span>{count > 0 ? `${count} inside` : "empty"}</span> : <span>note</span>}
            <span>·</span>
            <span>{timeAgo(n.updated_at)}</span>
            {n.created_by !== "brother" && (<><span>·</span><span>{n.created_by}</span></>)}
            {n.proofs.length > 0 && (
              <span className="flex items-center gap-0.5"><Paperclip size={10} />{n.proofs.length}</span>
            )}
          </div>
        </button>
        <button
          className="absolute right-2 top-2 hidden rounded p-1 group-hover:block hover:bg-black/5"
          title="Archive (restorable)"
          onClick={() => void archiveNode(n.id).then(reload)}
        >
          <Archive size={12} style={{ color: "var(--text-faint)" }} />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-10 px-6 py-4 backdrop-blur md:px-10"
        style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex flex-wrap items-center gap-1 text-xs" style={{ color: "var(--text-faint)" }}>
          <button onClick={() => navigate(`/p/${item.id}`)} className="hover:underline">
            {item.emoji} {item.title}
          </button>
          {crumb.map((b, i) => (
            <span key={b.id} className="flex items-center gap-1">
              <ChevronRight size={11} />
              {i < crumb.length - 1 ? (
                <button onClick={() => navigate(`/p/${item.id}/n/${b.id}`)} className="hover:underline">
                  {b.emoji} {b.title}
                </button>
              ) : (
                <span style={{ color: "var(--text-soft)" }}>{b.emoji} {b.title}</span>
              )}
            </span>
          ))}
        </div>
        <h1 className="mt-1 truncate text-2xl font-semibold">
          {current && !isNote ? `${current.emoji} ${current.title}` : !current ? `${item.emoji} ${item.title}` : `${item.emoji} ${item.title}`}
        </h1>
      </header>

      <div className="mx-auto max-w-4xl space-y-8 px-6 py-6 md:px-10">
        {error && <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm">{error}</div>}
        {loading && <div className="text-sm" style={{ color: "var(--text-faint)" }}>Loading…</div>}

        {!loading && !isNote && (
          <>
            {/* folders */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {folders.map(card)}
              {adding === "folder" ? (
                <input
                  autoFocus
                  value={addTitle}
                  onChange={(e) => setAddTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void handleAdd();
                    if (e.key === "Escape") { setAdding(null); setAddTitle(""); }
                  }}
                  onBlur={() => void handleAdd()}
                  placeholder="New folder · Enter"
                  className="rounded-lg border border-dashed p-3 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--hover)" }}
                />
              ) : (
                <button
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-sm"
                  style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                  onClick={() => setAdding("folder")}
                >
                  <Plus size={14} /> Add folder
                </button>
              )}
            </div>

            {/* notes in this folder */}
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                <StickyNote size={11} /> Notes
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {notes.map(card)}
                {adding === "note" ? (
                  <input
                    autoFocus
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") void handleAdd();
                      if (e.key === "Escape") { setAdding(null); setAddTitle(""); }
                    }}
                    onBlur={() => void handleAdd()}
                    placeholder="New note · Enter"
                    className="rounded-lg border border-dashed p-3 text-sm outline-none"
                    style={{ borderColor: "var(--border)", background: "var(--hover)" }}
                  />
                ) : (
                  <button
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed p-3 text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                    onClick={() => setAdding("note")}
                  >
                    <Plus size={14} /> Add note
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* note slide-over */}
      {!loading && current && isNote && (
        <NoteOver
          node={current}
          navTitle={`${item.emoji} ${item.title}`}
          onClose={() => navigate(current.parent_id ? `/p/${item.id}/n/${current.parent_id}` : `/p/${item.id}`)}
          onChanged={reload}
        />
      )}
    </div>
  );
}

function NoteOver({ node, navTitle, onClose, onChanged }: { node: Node; navTitle: string; onClose: () => void; onChanged: () => void }) {
  const [title, setTitle] = useState(node.title);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved">("idle");
  const [addingProof, setAddingProof] = useState(false);
  const [proofLabel, setProofLabel] = useState("");

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  const addProof = async () => {
    const label = proofLabel.trim();
    setAddingProof(false);
    setProofLabel("");
    if (!label) return;
    await updateNode(node.id, { proofs: [...node.proofs, { label }] as Node["proofs"] });
    onChanged();
  };

  return (
    <>
      <div className="slideover-backdrop" onClick={onClose} />
      <div className="slideover">
        <div className="px-5 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="text-xs" style={{ color: "var(--text-faint)" }}>{navTitle}</div>
          <div className="mt-0.5 flex items-center gap-2">
            <span>{node.emoji}</span>
            <input
              className="flex-1 bg-transparent text-lg font-semibold outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => { if (title.trim() && title !== node.title) void updateNode(node.id, { title: title.trim() }).then(onChanged); }}
            />
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>
              {saving === "saving" ? "Saving…" : saving === "saved" ? "Saved ✓" : ""}
            </span>
            <button onClick={onClose} style={{ color: "var(--text-soft)" }}><X size={17} /></button>
          </div>
          {/* proof chips · first-class */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {node.proofs.map((p, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
                title={p.path ?? p.url ?? ""}
              >
                <FileText size={10} /> {p.label}
              </span>
            ))}
            {addingProof ? (
              <input
                autoFocus
                value={proofLabel}
                onChange={(e) => setProofLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void addProof();
                  if (e.key === "Escape") { setAddingProof(false); setProofLabel(""); }
                }}
                onBlur={() => void addProof()}
                placeholder="Proof label · Enter"
                className="rounded-full border border-dashed px-2 py-0.5 text-xs outline-none"
                style={{ borderColor: "var(--border)" }}
              />
            ) : (
              <button
                className="flex items-center gap-1 rounded-full border border-dashed px-2 py-0.5 text-xs"
                style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
                onClick={() => setAddingProof(true)}
              >
                <Paperclip size={10} /> proof
              </button>
            )}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-4">
          <BlockEditor
            key={node.id}
            initialDoc={node.content ?? fiveFieldScaffold()}
            onChange={(d) => {
              setSaving("saving");
              updateNode(node.id, { content: d })
                .then(() => {
                  setSaving("saved");
                  setTimeout(() => setSaving("idle"), 1200);
                })
                .catch(() => setSaving("idle"));
            }}
            placeholder="Type / for commands"
          />
        </div>
      </div>
    </>
  );
}
