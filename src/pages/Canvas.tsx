// Home · personalizable widget canvas · Atlas-OS v3
// + Add widget (any page) · remove · drag · resize · all persisted (layout + widgets jsonb)
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveGridLayout, useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { GripVertical, Plus, X } from "lucide-react";
import {
  recentNodes,
  listNodes,
  getCanvas,
  saveCanvas,
  type NavItem,
  type Node,
  type CanvasWidget,
} from "../lib/db";

type Layout = LayoutItem[];
const KEY = "home-v3";

const DEFAULT_LAYOUT: Layout = [
  { i: "arms", x: 0, y: 0, w: 7, h: 5 },
  { i: "recent", x: 7, y: 0, w: 5, h: 5 },
];

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
        if (saved && Array.isArray(saved) && saved.length > 0) setLayout(saved as Layout);
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
            {widgets.map((w) => {
              const item = navById.get(w.navId);
              if (!item) return <div key={w.i} />;
              return (
                <div key={w.i}>
                  <Widget title={item.title} emoji={item.emoji} onRemove={() => removeWidget(w.i)}>
                    <PageWidget item={item} />
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
