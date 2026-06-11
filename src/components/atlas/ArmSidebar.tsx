// Atlas-OS left sidebar · recursive tree (arm → page → sub-page)
// Per FOUNDATION-REBUILD Phase 3
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronDown, Plus, Trash2 } from "lucide-react";
import {
  listArms,
  listAllPagesForArm,
  createPage,
  archivePage,
  subscribeToArmTree,
  type Arm,
  type Page,
} from "@/lib/atlas-supabase";

interface TreeNode {
  page: Page;
  children: TreeNode[];
}

function buildTree(pages: Page[]): TreeNode[] {
  const byId = new Map<string, TreeNode>();
  pages.forEach((p) => byId.set(p.id, { page: p, children: [] }));
  const roots: TreeNode[] = [];
  for (const node of byId.values()) {
    if (node.page.parent_id && byId.has(node.page.parent_id)) {
      byId.get(node.page.parent_id)!.children.push(node);
    } else {
      roots.push(node);
    }
  }
  const sortRec = (n: TreeNode) => {
    n.children.sort((a, b) => a.page.order_idx - b.page.order_idx);
    n.children.forEach(sortRec);
  };
  roots.sort((a, b) => a.page.order_idx - b.page.order_idx);
  roots.forEach(sortRec);
  return roots;
}

function TreeRow({
  node,
  depth,
  activePageId,
  onSelect,
  onAddChild,
  onDelete,
}: {
  node: TreeNode;
  depth: number;
  activePageId?: string;
  onSelect: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onDelete: (id: string) => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children.length > 0;
  const isActive = activePageId === node.page.id;

  return (
    <div>
      <div
        className={
          "group flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer text-sm hover:bg-black/5 " +
          (isActive ? "bg-black/10 font-medium" : "")
        }
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={() => onSelect(node.page.id)}
      >
        <button
          className="opacity-50 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          aria-label={open ? "Collapse" : "Expand"}
        >
          {hasChildren ? (
            open ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span style={{ width: 14, display: "inline-block" }} />
          )}
        </button>
        <span className="select-none">{node.page.emoji}</span>
        <span className="flex-1 truncate">{node.page.title}</span>
        <button
          className="opacity-0 group-hover:opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(node.page.id);
          }}
          aria-label="Add child page"
          title="Add sub-page"
        >
          <Plus size={12} />
        </button>
        <button
          className="opacity-0 group-hover:opacity-60 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Archive "${node.page.title}"?`)) onDelete(node.page.id);
          }}
          aria-label="Archive"
          title="Archive"
        >
          <Trash2 size={12} />
        </button>
      </div>
      {open && hasChildren && (
        <div>
          {node.children.map((c) => (
            <TreeRow
              key={c.page.id}
              node={c}
              depth={depth + 1}
              activePageId={activePageId}
              onSelect={onSelect}
              onAddChild={onAddChild}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ArmSidebar() {
  const navigate = useNavigate();
  const params = useParams<{ name?: string; pageId?: string }>();
  const armSlug = params.name ?? "curiosity";
  const activePageId = params.pageId;

  const [arms, setArms] = useState<Arm[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const [a, p] = await Promise.all([listArms(), listAllPagesForArm(armSlug)]);
      setArms(a);
      setPages(p);
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [armSlug]);

  useEffect(() => {
    setLoading(true);
    void reload();
    const unsub = subscribeToArmTree(armSlug, () => void reload());
    return () => unsub();
  }, [armSlug, reload]);

  const tree = useMemo(() => buildTree(pages), [pages]);

  const handleAddRootPage = async () => {
    const title = prompt("New page title:");
    if (!title) return;
    try {
      const page = await createPage({ arm_slug: armSlug, title });
      void reload();
      navigate(`/arm/${armSlug}/${page.id}`);
    } catch (e: unknown) {
      alert((e instanceof Error ? e.message : String(e)));
    }
  };

  const handleAddChild = async (parentId: string) => {
    const title = prompt("Sub-page title:");
    if (!title) return;
    try {
      const page = await createPage({ arm_slug: armSlug, parent_id: parentId, title });
      void reload();
      navigate(`/arm/${armSlug}/${page.id}`);
    } catch (e: unknown) {
      alert((e instanceof Error ? e.message : String(e)));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await archivePage(id);
      void reload();
      if (activePageId === id) navigate(`/arm/${armSlug}`);
    } catch (e: unknown) {
      alert((e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="w-64 shrink-0 border-r border-black/10 h-screen overflow-y-auto bg-stone-50">
      <div className="p-3 border-b border-black/10">
        <h2 className="text-xs font-semibold tracking-wider opacity-60 uppercase">Arms</h2>
        <div className="mt-2 space-y-0.5">
          {arms.map((a) => (
            <button
              key={a.slug}
              className={
                "w-full text-left px-2 py-1 rounded-md text-sm hover:bg-black/5 flex items-center gap-2 " +
                (a.slug === armSlug ? "bg-black/10 font-medium" : "")
              }
              onClick={() => navigate(`/arm/${a.slug}`)}
            >
              <span>{a.emoji}</span>
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold tracking-wider opacity-60 uppercase">
            {arms.find((a) => a.slug === armSlug)?.name ?? armSlug} pages
          </h2>
          <button
            onClick={handleAddRootPage}
            className="opacity-60 hover:opacity-100"
            title="New top-level page"
          >
            <Plus size={14} />
          </button>
        </div>
        {loading && <div className="text-sm opacity-50">Loading…</div>}
        {error && (
          <div className="text-xs text-red-600 p-2 bg-red-50 rounded">
            {error.includes("VITE_SUPABASE")
              ? "Supabase not configured yet · drop env keys to go live"
              : error}
          </div>
        )}
        {!loading && !error && tree.length === 0 && (
          <div className="text-sm opacity-50 italic">
            Empty · click + above to start
          </div>
        )}
        <div>
          {tree.map((n) => (
            <TreeRow
              key={n.page.id}
              node={n}
              depth={0}
              activePageId={activePageId}
              onSelect={(id) => navigate(`/arm/${armSlug}/${id}`)}
              onAddChild={handleAddChild}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
