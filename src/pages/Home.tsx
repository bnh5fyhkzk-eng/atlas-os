// Home · widget canvas · foundation-v2
// Spartan day-1 per brother direct: Arms (with live pulse merged in) + Recent.
// More widgets arrive when they DO something (Goal 2+) · no dead chrome.
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveGridLayout, useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { GripVertical } from "lucide-react";
import {
  listArms,
  listPages,
  recentBlocks,
  getLayout,
  saveLayout,
  type Arm,
  type Page,
} from "../lib/supabase";

type Layout = LayoutItem[];
const CANVAS_KEY = "home-v2";
const LIVE_MS = 30 * 60 * 1000;

const DEFAULT_LAYOUT: Layout = [
  { i: "arms", x: 0, y: 0, w: 8, h: 6 },
  { i: "recent", x: 8, y: 0, w: 4, h: 6 },
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

export default function Home() {
  const navigate = useNavigate();
  const [arms, setArms] = useState<Arm[]>([]);
  const [pulse, setPulse] = useState<Map<string, { at: string; by: string }>>(new Map());
  const [recent, setRecent] = useState<Page[]>([]);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [ready, setReady] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();

  useEffect(() => {
    (async () => {
      try {
        const a = await listArms();
        setArms(a);
        const blocks = await recentBlocks(200);
        const m = new Map<string, { at: string; by: string }>();
        for (const b of blocks) if (b.arm_slug && !m.has(b.arm_slug)) m.set(b.arm_slug, { at: b.created_at, by: b.created_by });
        setPulse(m);
        const pages = await Promise.all(a.slice(0, 9).map((x) => listPages(x.slug).catch(() => [] as Page[])));
        setRecent(pages.flat().sort((x, y) => +new Date(y.updated_at) - +new Date(x.updated_at)).slice(0, 12));
      } catch (e) {
        console.error("[home] load", e);
      }
      try {
        const saved = await getLayout(CANVAS_KEY);
        if (saved && Array.isArray(saved) && saved.length > 0) setLayout(saved as Layout);
      } catch { /* default layout */ }
      setReady(true);
    })();
  }, []);

  const persist = useCallback((next: Layout) => {
    setLayout(next);
    void saveLayout(CANVAS_KEY, next as unknown as unknown[]).catch(() => undefined);
  }, []);

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
        <div className="flex items-center gap-2">
          <span className="text-lg">🏠</span>
          <h1 className="text-sm font-semibold">Atlas-OS</h1>
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
            onLayoutChange={(l) => persist([...l])}
          >
            <div key="arms">
              <Widget title="Arms" emoji="🐙">
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {arms.map((a) => {
                    const p = pulse.get(a.slug);
                    const live = p ? Date.now() - new Date(p.at).getTime() < LIVE_MS : false;
                    return (
                      <button
                        key={a.slug}
                        className="rounded-lg border p-3 text-left transition-shadow hover:shadow-sm"
                        style={{ borderColor: "var(--border)" }}
                        onClick={() => navigate(`/arm/${a.slug}`)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{a.emoji}</span>
                          <span className={"dot " + (live ? "live" : "idle")} />
                        </div>
                        <div className="mt-1 text-sm font-medium">{a.name}</div>
                        <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
                          {p ? `wrote ${timeAgo(p.at)} ago` : "quiet"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Widget>
            </div>
            <div key="recent">
              <Widget title="Recent" emoji="🕐">
                <div className="space-y-0.5">
                  {recent.length === 0 && (
                    <div className="text-xs" style={{ color: "var(--text-faint)" }}>Nothing yet</div>
                  )}
                  {recent.map((p) => (
                    <button
                      key={p.id}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm hover:bg-black/5"
                      onClick={() => navigate(`/arm/${p.arm_slug}/${p.id}`)}
                    >
                      <span>{p.emoji}</span>
                      <span className="flex-1 truncate">{p.title}</span>
                      <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                        {p.arm_slug} · {timeAgo(p.updated_at)}
                      </span>
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
