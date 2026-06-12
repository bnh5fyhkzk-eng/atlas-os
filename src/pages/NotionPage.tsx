// NOTION-PAGE · miller-columns drill · GOAL-V3-DRILL
// Per brother design 2026-06-11 22:09: category column LEFT (selection visible) →
// click → sub-categories column to its RIGHT → click → notes+links column RIGHT.
// Path always on screen · add/rename/archive in every column · notes = slide-over.
// Mobile: columns swipe horizontally.
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, ChevronRight, Copy, Plus, X, Paperclip, FileText, Folder, StickyNote } from "lucide-react";
import { BlockEditor } from "../components/BlockEditor";
import {
  listNodes,
  createNode,
  updateNode,
  archiveNode,
  subscribeNodes,
  fiveFieldScaffold,
  logOverride,
  type NavItem,
  type Node,
} from "../lib/db";

const LEVEL_LABEL = ["Categories", "Sub-categories", "Notes"];

export default function NotionPage({ item }: { item: NavItem }) {
  const { nodeId } = useParams<{ nodeId?: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const kidsOf = useMemo(() => {
    const m = new Map<string | null, Node[]>();
    for (const n of nodes) {
      const k = n.parent_id && byId.has(n.parent_id) ? n.parent_id : null;
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(n);
    }
    for (const arr of m.values())
      arr.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1; // folders first
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.order_idx - b.order_idx;
      });
    return m;
  }, [nodes, byId]);

  const countIn = useCallback(
    (id: string): number => {
      const kids = kidsOf.get(id) ?? [];
      return kids.length + kids.reduce((acc, k) => acc + countIn(k.id), 0);
    },
    [kidsOf],
  );

  // selected path · root → ... → selected node
  const path = useMemo(() => {
    const p: Node[] = [];
    let cur = nodeId ? byId.get(nodeId) : undefined;
    while (cur) {
      p.unshift(cur);
      cur = cur.parent_id ? byId.get(cur.parent_id) : undefined;
    }
    return p;
  }, [nodeId, byId]);

  const selectedNote = path.length > 0 && path[path.length - 1].kind === "note" ? path[path.length - 1] : null;
  // folder path drives the columns (note selection doesn't open a new column)
  const folderPath = selectedNote ? path.slice(0, -1) : path;

  // columns: col 0 = roots · col k = children of folderPath[k-1]
  const columns: Array<{ parent: Node | null; items: Node[] }> = useMemo(() => {
    const cols: Array<{ parent: Node | null; items: Node[] }> = [
      { parent: null, items: (kidsOf.get(null) ?? []).filter((n) => !n.hidden) },
    ];
    for (const f of folderPath) {
      cols.push({ parent: f, items: (kidsOf.get(f.id) ?? []).filter((n) => !n.hidden) });
    }
    return cols;
  }, [kidsOf, folderPath]);

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

  // keep newest column in view
  useEffect(() => {
    scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
  }, [folderPath.length]);

  // GOAL-FOLDER-COPY · brother direct 2026-06-12 03:49 · "give them the folder"
  // copies folder + subfolders + notes as markdown → paste into any AI as context
  const blockText = (content: unknown): string => {
    if (!Array.isArray(content)) return "";
    return content.map((b) => {
      const c = (b as { content?: unknown }).content;
      return Array.isArray(c) ? c.map((s) => (s as { text?: string }).text ?? "").join("") : "";
    }).filter(Boolean).join("\n");
  };
  const buildCopy = useCallback((n: Node, depth = 0): string => {
    const h = "#".repeat(Math.min(depth + 1, 6));
    if (n.kind === "note") return `${h} ${n.title}\n${blockText(n.content)}\n`;
    const kids = nodes.filter((k) => k.parent_id === n.id && !k.archived);
    return `${h} ${n.emoji} ${n.title}\n\n` + kids.map((k) => buildCopy(k, depth + 1)).join("\n");
  }, [nodes]);
  const copyNode = useCallback(async (n: Node) => {
    await navigator.clipboard.writeText(buildCopy(n));
  }, [buildCopy]);

  const select = (n: Node) => navigate(`/p/${item.id}/n/${n.id}`);
  const closeNote = () => {
    const parent = selectedNote?.parent_id;
    navigate(parent ? `/p/${item.id}/n/${parent}` : `/p/${item.id}`);
  };

  return (
    <div className="flex h-screen flex-col">
      <header
        className="flex items-center gap-2 px-6 py-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="truncate text-lg font-semibold">{item.emoji} {item.title}</h1>
        <span className="truncate text-xs" style={{ color: "var(--text-faint)" }}>
          {folderPath.map((p) => `${p.emoji} ${p.title}`).join("  ›  ")}
        </span>
      </header>

      {error && <div className="mx-6 mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2 text-sm">{error}</div>}
      {loading && <div className="px-6 py-4 text-sm" style={{ color: "var(--text-faint)" }}>Loading…</div>}

      {!loading && (
        <div ref={scrollRef} className="flex min-h-0 flex-1 overflow-x-auto">
          {columns.map((col, k) => (
            <DrillColumn
              key={col.parent?.id ?? "root"}
              navId={item.id}
              parent={col.parent}
              items={col.items}
              depth={k}
              label={col.parent ? (LEVEL_LABEL[k] ?? "Inside") : LEVEL_LABEL[0]}
              selectedId={k < folderPath.length ? folderPath[k].id : selectedNote && k === folderPath.length ? selectedNote.id : undefined}
              countIn={countIn}
              onSelect={select}
              onChanged={reload}
              onCopy={copyNode}
            />
          ))}
        </div>
      )}

      {selectedNote && (
        <NoteOver node={selectedNote} navTitle={`${item.emoji} ${item.title}`} onClose={closeNote} onChanged={reload} />
      )}
    </div>
  );
}

function DrillColumn({
  navId,
  parent,
  items,
  label,
  selectedId,
  depth = 0,
  countIn,
  onSelect,
  onChanged,
  onCopy,
}: {
  navId: string;
  parent: Node | null;
  items: Node[];
  label: string;
  selectedId?: string;
  depth?: number;
  countIn: (id: string) => number;
  onSelect: (n: Node) => void;
  onChanged: () => void;
  onCopy: (n: Node) => Promise<void>;
}) {
  const [adding, setAdding] = useState<"folder" | "note" | null>(null);
  const defaultKind: "folder" | "note" = depth >= 2 ? "note" : "folder";
  const [title, setTitle] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const add = async () => {
    const t = title.trim();
    const kind = adding ?? "folder";
    setAdding(null);
    setTitle("");
    if (!t) return;
    const n = await createNode({ nav_id: navId, parent_id: parent?.id ?? null, kind, title: t });
    onChanged();
    navigate(`/p/${navId}/n/${n.id}`);
  };

  return (
    <div
      className="flex h-full w-[270px] shrink-0 flex-col border-r"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
        {parent ? `${parent.emoji} ${parent.title}` : label}
      </div>
      <div
        className="min-h-0 flex-1 space-y-0.5 overflow-y-auto px-2 pb-2"
        onClick={(e) => {
          // brother UX: click empty spot → inline add opens directly
          if (e.target === e.currentTarget && !adding) setAdding(defaultKind);
        }}
      >
        {items.map((n) => {
          const isSel = n.id === selectedId;
          const cnt = n.kind === "folder" ? countIn(n.id) : 0;
          return (
            <div key={n.id} className="group relative">
              <button
                className={"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm " + (isSel ? "font-medium" : "")}
                style={{ background: isSel ? "var(--active)" : undefined }}
                onMouseEnter={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = "var(--hover)"; }}
                onMouseLeave={(e) => { if (!isSel) (e.currentTarget as HTMLElement).style.background = ""; }}
                onClick={() => onSelect(n)}
              >
                {n.kind === "folder"
                  ? <Folder size={13} style={{ color: "var(--text-faint)" }} />
                  : <StickyNote size={13} style={{ color: "var(--text-faint)" }} />}
                <span>{n.emoji}</span>
                {renaming === n.id ? (
                  <input
                    autoFocus
                    defaultValue={n.title}
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                      if (e.key === "Escape") setRenaming(null);
                    }}
                    onBlur={(e) => {
                      setRenaming(null);
                      const v = e.target.value.trim();
                      if (v && v !== n.title) void updateNode(n.id, { title: v }).then(onChanged);
                    }}
                  />
                ) : (
                  <span
                    className="min-w-0 flex-1 truncate"
                    onDoubleClick={(e) => { e.stopPropagation(); setRenaming(n.id); }}
                  >
                    {n.title}
                  </span>
                )}
                {n.proofs.length > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px]" style={{ color: "var(--text-faint)" }}>
                    <Paperclip size={9} />{n.proofs.length}
                  </span>
                )}
                {n.kind === "folder" && (
                  <>
                    {cnt > 0 && <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{cnt}</span>}
                    <ChevronRight size={13} style={{ color: "var(--text-faint)" }} />
                  </>
                )}
              </button>
              <div className="absolute right-1 top-1/2 hidden -translate-y-1/2 items-center gap-0.5 group-hover:flex">
                <button
                  className="rounded p-0.5 hover:bg-black/10"
                  style={{ background: "var(--bg)" }}
                  title={n.kind === "folder" ? "Copy folder + notes as markdown · paste into any AI" : "Copy note text"}
                  onClick={(e) => {
                    e.stopPropagation();
                    void onCopy(n).then(() => {
                      setCopiedId(n.id);
                      window.setTimeout(() => setCopiedId((c) => (c === n.id ? null : c)), 1500);
                    });
                  }}
                >
                  {copiedId === n.id
                    ? <Check size={11} style={{ color: "#448361" }} />
                    : <Copy size={11} style={{ color: "var(--text-faint)" }} />}
                </button>
                <button
                  className="rounded p-0.5 hover:bg-black/10"
                  style={{ background: "var(--bg)" }}
                  title="Archive (restorable)"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!window.confirm(`Are you sure you want to delete "${n.title}"?\n(Restorable from archive)`)) return;
                    // self-improve signal: brother archiving an AI-filed item = correction
                    if (n.created_by !== "brother") logOverride(n.id, "archived-ai-item", { created_by: n.created_by, title: n.title });
                    void archiveNode(n.id).then(onChanged);
                  }}
                >
                  <X size={11} style={{ color: "var(--text-faint)" }} />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && !adding && (
          <div className="px-2 py-1 text-xs italic" style={{ color: "var(--text-faint)" }}>empty</div>
        )}
      </div>
      <div className="space-y-1 border-t p-2" style={{ borderColor: "var(--border)" }}>
        {adding ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void add();
              if (e.key === "Escape") { setAdding(null); setTitle(""); }
            }}
            onBlur={() => void add()}
            placeholder={`New ${adding} · Enter`}
            className="w-full rounded-md px-2 py-1.5 text-sm outline-none"
            style={{ background: "var(--hover)" }}
          />
        ) : (
          <div className="flex gap-1">
            <button
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs"
              style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
              onClick={() => setAdding("folder")}
            >
              <Plus size={11} /> folder
            </button>
            <button
              className="flex flex-1 items-center justify-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs"
              style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
              onClick={() => setAdding("note")}
            >
              <Plus size={11} /> note
            </button>
          </div>
        )}
      </div>
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
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {node.proofs.map((p, i) => (
              <button
                key={i}
                className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs hover:shadow-sm"
                style={{ borderColor: "var(--border)", color: p.url ? "#0a84ff" : "var(--text-soft)" }}
                title={p.url ? "open" : p.path ? "click to copy path" : ""}
                onClick={() => {
                  if (p.url) window.open(p.url, "_blank");
                  else if (p.path) void navigator.clipboard.writeText(p.path);
                }}
              >
                <FileText size={10} /> {p.label}
              </button>
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
