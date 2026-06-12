// Home · widget canvas · Atlas-OS v3
// Widgets = live windows into pages · click-through opens page · drag/resize persists
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveGridLayout, useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { GripVertical } from "lucide-react";
import { recentNodes, getLayout, saveLayout, type NavItem, type Node } from "../lib/db";

type Layout = LayoutItem[];
const KEY = "home-v3";

const DEFAULT_LAYOUT: Layout = [
  { i: "arms", x: 0, y: 0, w: 7, h: 5 },
  { i: "recent", x: 7, y: 0, w: 5, h: 5 },
  { i: "pages", x: 0, y: 5, w: 12, h: 2 },
];

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

function Widget({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="widget">
      <div className="widget-head">
        <GripVertical size={12} style={{ color: "var(--text-faint)" }} />
        <span>{emoji}</span>
        <span>{title}</span>
      </div>
      <div className="widget-body">{children}</div>
    </div>
  );
}

export default function Canvas({ nav }: { nav: NavItem[]; home: NavItem }) {
  const navigate = useNavigate();
  const [recent, setRecent] = useState<Node[]>([]);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [ready, setReady] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();

  const arms = nav.filter((n) => n.section === "arms");
  const mains = nav.filter((n) => n.section === "main" && n.template !== "canvas");
  const navById = useMemo(() => new Map(nav.map((n) => [n.id, n])), [nav]);

  useEffect(() => {
    recentNodes(12).then(setRecent).catch(() => setRecent([]));
    getLayout(KEY)
      .then((saved) => {
        if (saved && Array.isArray(saved) && saved.length > 0) setLayout(saved as Layout);
      })
      .catch(() => undefined)
      .finally(() => setReady(true));
  }, []);

  const persist = useCallback((next: Layout) => {
    setLayout(next);
    void saveLayout(KEY, next as unknown as unknown[]).catch(() => undefined);
  }, []);

  const layouts = useMemo(
    () => ({ lg: layout, sm: layout.map((l) => ({ ...l, x: 0, w: 1 })) }),
    [layout],
  );

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-10 px-6 py-3 backdrop-blur"
        style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-sm font-semibold">🏠 Home</h1>
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
            onLayoutChange={(l) => persist([...l])}
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
            <div key="pages">
              <Widget title="Pages" emoji="🧭">
                <div className="flex flex-wrap gap-1.5">
                  {mains.map((m) => (
                    <button
                      key={m.id}
                      className="rounded-lg border px-3 py-1.5 text-sm hover:shadow-sm"
                      style={{ borderColor: "var(--border)" }}
                      onClick={() => navigate(`/p/${m.id}`)}
                    >
                      {m.emoji} {m.title}
                    </button>
                  ))}
                </div>
              </Widget>
            </div>
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  );
}
