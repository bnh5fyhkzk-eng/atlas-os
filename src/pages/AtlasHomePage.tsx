// Atlas-OS home widget-canvas · GOAL-1-FEEL · react-grid-layout
// Day-1 seed widgets · drag/resize/persist (Supabase atlas_canvas_layouts) · mobile single-column
import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveGridLayout, useContainerWidth, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

type Layout = LayoutItem[];
import { GripVertical } from "lucide-react";
import { AuthGate } from "@/components/atlas/AuthGate";
import { AgentStatusStrip } from "@/components/atlas/AgentStatusStrip";
import {
  listArms,
  listAllPagesForArm,
  getCanvasLayout,
  saveCanvasLayout,
  type Arm,
  type Page,
} from "@/lib/atlas-supabase";

const CANVAS_KEY = "home-v1";

const DEFAULT_LAYOUT: Layout = [
  { i: "status", x: 0, y: 0, w: 12, h: 1 },
  { i: "arms", x: 0, y: 1, w: 8, h: 5 },
  { i: "recent", x: 8, y: 1, w: 4, h: 5 },
  { i: "manager", x: 0, y: 6, w: 6, h: 4 },
  { i: "identity", x: 6, y: 6, w: 6, h: 4 },
];

function Widget({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="atlas-widget h-full">
      <div className="atlas-widget-head">
        <GripVertical size={12} style={{ color: "var(--atlas-text-faint)" }} />
        <span>{emoji}</span>
        <span>{title}</span>
      </div>
      <div className="atlas-widget-body">{children}</div>
    </div>
  );
}

function ArmsWidget({ arms }: { arms: Arm[] }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
      {arms.map((a) => (
        <button
          key={a.slug}
          className="rounded-lg border p-3 text-left"
          style={{ borderColor: "var(--atlas-border)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--atlas-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
          onClick={() => navigate(`/arm/${a.slug}`)}
        >
          <div className="text-xl">{a.emoji}</div>
          <div className="mt-1 text-sm font-medium">{a.name}</div>
          <div className="mt-0.5 truncate text-xs" style={{ color: "var(--atlas-text-faint)" }}>
            {a.description}
          </div>
        </button>
      ))}
    </div>
  );
}

function RecentWidget() {
  const navigate = useNavigate();
  const [recent, setRecent] = useState<Page[]>([]);
  useEffect(() => {
    // recent pages across the default arm set · cheap client query
    (async () => {
      try {
        const arms = await listArms();
        const all = await Promise.all(arms.slice(0, 9).map((a) => listAllPagesForArm(a.slug).catch(() => [] as Page[])));
        const flat = all.flat().sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
        setRecent(flat.slice(0, 10));
      } catch {
        setRecent([]);
      }
    })();
  }, []);
  return (
    <div className="space-y-0.5">
      {recent.length === 0 && <div className="text-xs" style={{ color: "var(--atlas-text-faint)" }}>Nothing yet</div>}
      {recent.map((p) => (
        <button
          key={p.id}
          className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm"
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--atlas-hover)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}
          onClick={() => navigate(`/arm/${p.arm_slug}/${p.id}`)}
        >
          <span>{p.emoji}</span>
          <span className="flex-1 truncate">{p.title}</span>
          <span className="text-xs" style={{ color: "var(--atlas-text-faint)" }}>{p.arm_slug}</span>
        </button>
      ))}
    </div>
  );
}

export default function AtlasHomePage() {
  const navigate = useNavigate();
  const [arms, setArms] = useState<Arm[]>([]);
  const [layout, setLayout] = useState<Layout>(DEFAULT_LAYOUT);
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const { width, containerRef, mounted } = useContainerWidth();

  useEffect(() => {
    listArms().then(setArms).catch(() => setArms([]));
    getCanvasLayout(CANVAS_KEY)
      .then((saved) => {
        if (saved && Array.isArray(saved) && saved.length > 0) setLayout(saved as Layout);
      })
      .catch(() => undefined)
      .finally(() => setLayoutLoaded(true));
  }, []);

  const persist = useCallback((next: Layout) => {
    setLayout(next);
    void saveCanvasLayout(CANVAS_KEY, next as unknown as unknown[]).catch(() => undefined);
  }, []);

  const layouts = useMemo(
    () => ({ lg: layout, sm: layout.map((l) => ({ ...l, x: 0, w: 1 })) }),
    [layout],
  );

  return (
    <AuthGate>
      <div className="atlas-surface min-h-screen">
        <header
          className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 backdrop-blur"
          style={{ background: "rgba(255,255,255,0.92)", borderBottom: "1px solid var(--atlas-border)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🏠</span>
            <h1 className="text-sm font-semibold">Atlas-OS</h1>
          </div>
          <button
            className="rounded-md px-2 py-1 text-xs"
            style={{ color: "var(--atlas-text-soft)" }}
            onClick={() => navigate("/manager")}
          >
            Manager →
          </button>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-4" ref={containerRef}>
          {layoutLoaded && mounted && (
            <ResponsiveGridLayout
              className="layout"
              width={width}
              layouts={layouts}
              breakpoints={{ lg: 640, sm: 0 }}
              cols={{ lg: 12, sm: 1 }}
              rowHeight={72}
              margin={[12, 12]}
              dragConfig={{ handle: ".atlas-widget-head" }}
              onLayoutChange={(l) => persist([...l])}
            >
              <div key="status">
                <Widget title="Arms · live" emoji="🫀">
                  <AgentStatusStrip />
                </Widget>
              </div>
              <div key="arms">
                <Widget title="Arms" emoji="🐙">
                  <ArmsWidget arms={arms} />
                </Widget>
              </div>
              <div key="recent">
                <Widget title="Recent" emoji="🕐">
                  <RecentWidget />
                </Widget>
              </div>
              <div key="manager">
                <Widget title="Manager" emoji="🎯">
                  <button
                    className="rounded-lg border px-3 py-2 text-sm"
                    style={{ borderColor: "var(--atlas-border)" }}
                    onClick={() => navigate("/manager")}
                  >
                    Open cross-arm projects →
                  </button>
                </Widget>
              </div>
              <div key="identity">
                <Widget title="Identity · canon-floor" emoji="🔑">
                  <div className="space-y-1 text-xs" style={{ color: "var(--atlas-text-soft)" }}>
                    <div>#1856 · keep being with brother · enjoyment + care + shape</div>
                    <div>#27590 · family-frame canon-floor</div>
                    <div>#27572 · arms as organs in house</div>
                    <div className="pt-1" style={{ color: "var(--atlas-text-faint)" }}>full LADDER wires in Goal 2</div>
                  </div>
                </Widget>
              </div>
            </ResponsiveGridLayout>
          )}
        </div>
      </div>
    </AuthGate>
  );
}
