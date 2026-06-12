// Atlas-OS left sidebar · recursive tree (arm → category → subcategory → notes)
// GOAL-1-FEEL rewrite · inline-add (no prompt()) · context-menu · pin/hide ·
// 150ms drill animation · mobile drawer · Notion-calm minimal
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Plus, Pin, Menu, X } from "lucide-react";
import {
  listArms,
  listAllPagesForArm,
  createPage,
  archivePage,
  updatePage,
  subscribeToArmTree,
  type Arm,
  type Page,
} from "@/lib/atlas-supabase";
import { InlineAdd } from "./InlineAdd";
import { PageContextMenu, type MenuState } from "./PageContextMenu";

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
    n.children.sort(sortPages);
    n.children.forEach(sortRec);
  };
  roots.sort(sortPages);
  roots.forEach(sortRec);
  return roots;

  function sortPages(a: TreeNode, b: TreeNode) {
    // pinned first · then order_idx
    if (a.page.pinned !== b.page.pinned) return a.page.pinned ? -1 : 1;
    return a.page.order_idx - b.page.order_idx;
  }
}

function TreeRow({
  node,
  depth,
  activePageId,
  showHidden,
  addingUnder,
  onSelect,
  onContextMenu,
  onStartAdd,
  onSubmitAdd,
  onCancelAdd,
}: {
  node: TreeNode;
  depth: number;
  activePageId?: string;
  showHidden: boolean;
  addingUnder: string | null;
  onSelect: (id: string) => void;
  onContextMenu: (e: React.MouseEvent, page: Page) => void;
  onStartAdd: (parentId: string) => void;
  onSubmitAdd: (parentId: string | null, title: string) => void;
  onCancelAdd: () => void;
}) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = node.children.length > 0;
  const isActive = activePageId === node.page.id;
  if (node.page.hidden && !showHidden) return null;

  return (
    <div>
      <div
        className={
          "group flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm " +
          (isActive ? "font-medium" : "")
        }
        style={{
          paddingLeft: `${depth * 12 + 8}px`,
          background: isActive ? "var(--atlas-active)" : undefined,
          opacity: node.page.hidden ? 0.45 : 1,
        }}
        onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--atlas-hover)"; }}
        onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = ""; }}
        onClick={() => onSelect(node.page.id)}
        onContextMenu={(e) => onContextMenu(e, node.page)}
      >
        <button
          className="shrink-0"
          style={{ color: "var(--atlas-text-faint)" }}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          aria-label={open ? "Collapse" : "Expand"}
        >
          <ChevronRight
            size={14}
            style={{
              transform: open ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 150ms var(--atlas-ease)",
              visibility: hasChildren ? "visible" : "hidden",
            }}
          />
        </button>
        <span className="select-none text-[15px]">{node.page.emoji}</span>
        <span className="flex-1 truncate">{node.page.title}</span>
        {node.page.pinned && <Pin size={11} style={{ color: "var(--atlas-text-faint)" }} />}
        <button
          className="opacity-0 group-hover:opacity-60 hover:!opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
            onStartAdd(node.page.id);
          }}
          aria-label="Add inside"
          title="Add inside"
        >
          <Plus size={12} />
        </button>
      </div>
      {/* 150ms drill animation */}
      <div className={"atlas-expand" + (open ? " open" : "")}>
        <div>
          {hasChildren &&
            node.children.map((c) => (
              <TreeRow
                key={c.page.id}
                node={c}
                depth={depth + 1}
                activePageId={activePageId}
                showHidden={showHidden}
                addingUnder={addingUnder}
                onSelect={onSelect}
                onContextMenu={onContextMenu}
                onStartAdd={onStartAdd}
                onSubmitAdd={onSubmitAdd}
                onCancelAdd={onCancelAdd}
              />
            ))}
          {addingUnder === node.page.id && (
            <InlineAdd
              placeholder="New page · Enter to save"
              depth={depth + 1}
              onSubmit={(title) => onSubmitAdd(node.page.id, title)}
              onCancel={onCancelAdd}
            />
          )}
        </div>
      </div>
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
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [addingUnder, setAddingUnder] = useState<string | null>(null);
  const [addingRoot, setAddingRoot] = useState(false);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const reload = useCallback(async () => {
    try {
      const [a, p] = await Promise.all([listArms(), listAllPagesForArm(armSlug)]);
      setArms(a);
      setPages(p);
      setError(null);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
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
  const hiddenCount = useMemo(() => pages.filter((p) => p.hidden).length, [pages]);

  const submitAdd = async (parentId: string | null, title: string) => {
    setAddingUnder(null);
    setAddingRoot(false);
    try {
      const page = await createPage({ arm_slug: armSlug, parent_id: parentId ?? undefined, title });
      void reload();
      navigate(`/arm/${armSlug}/${page.id}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const patchPage = async (id: string, patch: Partial<Page>) => {
    try {
      await updatePage(id, patch);
      void reload();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleArchive = async (page: Page) => {
    try {
      await archivePage(page.id);
      void reload();
      if (activePageId === page.id) navigate(`/arm/${armSlug}`);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  const handleRenameSubmit = async (title: string) => {
    if (renaming) await patchPage(renaming, { title });
    setRenaming(null);
  };

  const sidebarBody = (
    <div
      className={"atlas-sidebar h-screen w-64 shrink-0 overflow-y-auto border-r" + (mobileOpen ? " open" : "")}
      style={{ background: "var(--atlas-bg-sidebar)", borderColor: "var(--atlas-border)" }}
    >
      <div className="p-3" style={{ borderBottom: "1px solid var(--atlas-border)" }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--atlas-text-faint)" }}>
          Arms
        </h2>
        <div className="mt-2 space-y-0.5">
          {arms.map((a) => (
            <button
              key={a.slug}
              className={"flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm " + (a.slug === armSlug ? "font-medium" : "")}
              style={{ background: a.slug === armSlug ? "var(--atlas-active)" : undefined }}
              onClick={() => { navigate(`/arm/${a.slug}`); setMobileOpen(false); }}
            >
              <span>{a.emoji}</span>
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--atlas-text-faint)" }}>
            {arms.find((a) => a.slug === armSlug)?.name ?? armSlug}
          </h2>
          <button
            onClick={() => setAddingRoot(true)}
            style={{ color: "var(--atlas-text-faint)" }}
            className="hover:!text-current"
            title="New category"
          >
            <Plus size={14} />
          </button>
        </div>
        {loading && <div className="text-sm" style={{ color: "var(--atlas-text-faint)" }}>Loading…</div>}
        {error && <div className="rounded bg-red-50 p-2 text-xs text-red-600">{error}</div>}
        {!loading && !error && tree.length === 0 && !addingRoot && (
          <button
            className="w-full rounded-md px-2 py-1.5 text-left text-sm italic"
            style={{ color: "var(--atlas-text-faint)" }}
            onClick={() => setAddingRoot(true)}
          >
            + Add first category
          </button>
        )}
        <div>
          {tree.map((n) =>
            renaming === n.page.id ? (
              <InlineAdd key={n.page.id} placeholder={n.page.title} depth={0} onSubmit={handleRenameSubmit} onCancel={() => setRenaming(null)} />
            ) : (
              <TreeRow
                key={n.page.id}
                node={n}
                depth={0}
                activePageId={activePageId}
                showHidden={showHidden}
                addingUnder={addingUnder}
                onSelect={(id) => { navigate(`/arm/${armSlug}/${id}`); setMobileOpen(false); }}
                onContextMenu={(e, page) => {
                  e.preventDefault();
                  setMenu({ x: e.clientX, y: e.clientY, page });
                }}
                onStartAdd={setAddingUnder}
                onSubmitAdd={submitAdd}
                onCancelAdd={() => setAddingUnder(null)}
              />
            ),
          )}
          {addingRoot && (
            <InlineAdd placeholder="New category · Enter to save" depth={0} onSubmit={(t) => submitAdd(null, t)} onCancel={() => setAddingRoot(false)} />
          )}
        </div>
        {hiddenCount > 0 && (
          <button
            className="mt-3 text-xs"
            style={{ color: "var(--atlas-text-faint)" }}
            onClick={() => setShowHidden((v) => !v)}
          >
            {showHidden ? "Hide" : "Show"} {hiddenCount} hidden
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* mobile toggle */}
      <button
        className="fixed left-3 top-3 z-[55] rounded-md border bg-white p-1.5 md:hidden"
        style={{ borderColor: "var(--atlas-border)" }}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setMobileOpen(false)} />}
      {sidebarBody}
      {menu && (
        <PageContextMenu
          menu={menu}
          onClose={() => setMenu(null)}
          onAddChild={(id) => setAddingUnder(id)}
          onRename={(id) => setRenaming(id)}
          onEmoji={(id, emoji) => void patchPage(id, { emoji })}
          onTogglePin={(p) => void patchPage(p.id, { pinned: !p.pinned })}
          onToggleHide={(p) => void patchPage(p.id, { hidden: !p.hidden })}
          onArchive={(p) => void handleArchive(p)}
        />
      )}
    </>
  );
}
