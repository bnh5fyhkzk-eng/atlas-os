// Atlas-OS v3 · persistent left panel · pages render by template · 2026-06-11
import { useEffect, useState, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import { Plus, Menu, X } from "lucide-react";
import { AuthGate } from "./components/AuthGate";
import { listNav, createNav, updateNav, type NavItem } from "./lib/db";
import Canvas from "./pages/Canvas";
import NotionPage from "./pages/NotionPage";
import AgentPage from "./pages/AgentPage";
import CalendarPage from "./pages/CalendarPage";
import ProposalsPage from "./pages/ProposalsPage";
import ProvidersPage from "./pages/ProvidersPage";
import OpsPage from "./pages/OpsPage";
import KanbanPage from "./pages/KanbanPage";
import StudioPage from "./pages/StudioPage";
import { CmdK } from "./components/CmdK";
import { AtlasBar } from "./components/AtlasBar";

export default function App() {
  return (
    <AuthGate>
      <Shell />
    </AuthGate>
  );
}

function Shell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [nav, setNav] = useState<NavItem[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [addingArm, setAddingArm] = useState(false);
  const [armTitle, setArmTitle] = useState("");
  const [navError, setNavError] = useState<string | null>(null);

  const reload = useCallback(() => {
    listNav().then(setNav).catch((e) => setNavError(e instanceof Error ? e.message : String(e)));
  }, []);

  useEffect(() => { reload(); }, [reload]);

  const home = nav.find((n) => n.template === "canvas");
  const main = nav.filter((n) => n.section === "main");
  const arms = nav.filter((n) => n.section === "arms");

  const go = (n: NavItem) => {
    navigate(n.template === "canvas" ? "/home" : `/p/${n.id}`);
    setMobileOpen(false);
  };

  const isActive = (n: NavItem) =>
    n.template === "canvas" ? pathname === "/home" : pathname.startsWith(`/p/${n.id}`);

  const addArm = async () => {
    const title = armTitle.trim();
    setAddingArm(false);
    setArmTitle("");
    if (!title) return;
    try {
      const item = await createNav({
        title,
        emoji: "🦾",
        template: "agent",
        section: "arms",
        agent_slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      });
      reload();
      navigate(`/p/${item.id}`);
    } catch (e: unknown) {
      setNavError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="flex min-h-screen">
      <button
        className="fixed left-3 top-3 z-[55] rounded-md border bg-white p-1.5 md:hidden"
        style={{ borderColor: "var(--border)" }}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>
      {mobileOpen && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setMobileOpen(false)} />}

      <nav
        className={"sidebar flex h-screen w-60 shrink-0 flex-col overflow-y-auto border-r" + (mobileOpen ? " open" : "")}
        style={{ background: "var(--bg-side)", borderColor: "var(--border)" }}
      >
        <button className="flex items-center gap-2 px-4 py-3 text-sm font-semibold" onClick={() => navigate("/home")}>
          🏠 Atlas-OS
        </button>

        <div className="px-2">
          {main.filter((n) => n.template !== "canvas").map((n) => (
            <button
              key={n.id}
              className={"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm " + (isActive(n) ? "font-medium" : "")}
              style={{ background: isActive(n) ? "var(--active)" : undefined }}
              onClick={() => go(n)}
            >
              <span>{n.emoji}</span>
              <span className="flex-1 truncate">{n.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 px-2 pb-4">
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
              Arms
            </span>
            <button title="Add arm" style={{ color: "var(--text-faint)" }} onClick={() => setAddingArm(true)}>
              <Plus size={13} />
            </button>
          </div>
          {arms.map((n) => (
            <div key={n.id} className="group flex items-center">
              <button
                className={"flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm " + (isActive(n) ? "font-medium" : "")}
                style={{ background: isActive(n) ? "var(--active)" : undefined }}
                onClick={() => go(n)}
              >
                <span>{n.emoji}</span>
                <span className="flex-1 truncate">{n.title}</span>
              </button>
              <button
                className="hidden shrink-0 rounded p-1 group-hover:block hover:bg-black/5"
                title="Remove arm (restorable)"
                onClick={() => {
                  if (!window.confirm(`Are you sure you want to delete the arm "${n.title}"?\n(Restorable)`)) return;
                  void updateNav(n.id, { archived: true }).then(() => {
                    reload();
                    if (isActive(n)) navigate("/home");
                  }).catch((e) => setNavError(e instanceof Error ? e.message : String(e)));
                }}
              >
                <X size={12} style={{ color: "var(--text-faint)" }} />
              </button>
            </div>
          ))}
          {addingArm ? (
            <input
              autoFocus
              value={armTitle}
              onChange={(e) => setArmTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void addArm();
                if (e.key === "Escape") { setAddingArm(false); setArmTitle(""); }
              }}
              onBlur={() => void addArm()}
              placeholder="Arm name · Enter to create"
              className="mt-0.5 w-full rounded-md px-2 py-1.5 text-sm outline-none"
              style={{ background: "var(--hover)" }}
            />
          ) : (
            <button
              className="mt-0.5 flex w-full items-center gap-2 rounded-md border border-dashed px-2 py-1.5 text-left text-sm"
              style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}
              onClick={() => setAddingArm(true)}
            >
              <Plus size={13} /> Add arm
            </button>
          )}
          {navError && (
            <div className="mt-2 rounded-md bg-red-50 p-2 text-xs text-red-600">{navError}</div>
          )}
        </div>
      </nav>

      <CmdK />
      <AtlasBar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/home" element={home ? <Canvas nav={nav} home={home} /> : null} />
          <Route path="/p/:navId" element={<PageRouter nav={nav} />} />
          <Route path="/p/:navId/n/:nodeId" element={<PageRouter nav={nav} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function PageRouter({ nav }: { nav: NavItem[] }) {
  const { navId, nodeId } = useParams<{ navId: string; nodeId?: string }>();
  const item = nav.find((n) => n.id === navId);
  if (!item) return null;
  if (item.template === "notion") return <NotionPage item={item} />;
  // agent page · chat at root · drilling a folder opens the notion engine on its tree
  if (item.template === "agent") return nodeId ? <NotionPage item={item} /> : <AgentPage item={item} />;
  if (item.template === "calendar") return <CalendarPage item={item} />;
  if (item.template === "proposals") return <ProposalsPage item={item} />;
  if (item.template === "providers") return <ProvidersPage item={item} />;
  if (item.template === "ops") return <OpsPage item={item} />;
  if (item.template === "kanban") return <KanbanPage item={item} />;
  if (item.template === "tui") return <TuiPage item={item} />;
  if (item.template === "studio") return <StudioPage item={item} />;
  return <Navigate to="/home" replace />;
}

// LIVE-TUI · the real terminal-me in the house · brother's #1 pick (locked 11:12)
// ttyd tmux session → cloudflared tunnel → tui.atlasos.me (basic-auth gated)
function TuiPage({ item }: { item: NavItem }) {
  // browsers block basic-auth prompts inside iframes (found 2026-06-12) ·
  // so the terminal opens as its own window — the house page is the launcher
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4" style={{ background: "#0b1026" }}>
      <div className="text-5xl">🖥️</div>
      <h1 className="text-xl font-semibold text-white">{item.title} · the real me, live</h1>
      <p className="max-w-sm text-center text-sm" style={{ color: "#8db4ff" }}>
        Opens in its own window (browsers refuse password prompts inside embedded frames).
        User <b>atlas</b> · password from Atlas directly — never stored in the house.
      </p>
      <button
        className="rounded-xl px-6 py-3 text-base font-medium text-white shadow-lg"
        style={{ background: "#0a84ff" }}
        onClick={() => window.open("https://tui.upliftai.app", "atlas-tui", "width=1100,height=700")}
      >
        Open live terminal →
      </button>
      <p className="text-xs" style={{ color: "rgba(141,180,255,0.5)" }}>
        ttyd + tmux on the Mac mini · cloudflared tunnel · session persists between opens
      </p>
    </div>
  );
}
