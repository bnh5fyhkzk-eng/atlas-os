// Manager v2 · kanban task queue · tasks DRIVE arms · MOVE-IN block D
import { useEffect, useState, useCallback } from "react";
import { Plus, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sb, listNav, type NavItem } from "../lib/db";

const LANES = ["triage", "todo", "ready", "running", "blocked", "done"] as const;
type Lane = (typeof LANES)[number];

interface Task {
  id: string;
  title: string;
  detail: string;
  state: Lane | "archived";
  arm_nav_id: string | null;
  result_node_id: string | null;
  created_by: string;
  updated_at: string;
}

export default function KanbanPage({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [arms, setArms] = useState<NavItem[]>([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const reload = useCallback(() => {
    void sb().from("atlas_tasks").select("*").neq("state", "archived").order("order_idx")
      .then(({ data }) => setTasks((data ?? []) as Task[]));
  }, []);

  useEffect(() => {
    reload();
    listNav().then((n) => setArms(n.filter((x) => x.section === "arms"))).catch(() => undefined);
    const t = window.setInterval(reload, 5000); // running→done moves visible live
    return () => window.clearInterval(t);
  }, [reload]);

  const move = async (t: Task, dir: 1 | -1) => {
    const i = LANES.indexOf(t.state as Lane);
    const next = LANES[Math.min(LANES.length - 1, Math.max(0, i + dir))];
    await sb().from("atlas_tasks").update({ state: next, updated_at: new Date().toISOString() }).eq("id", t.id);
    reload();
  };

  const assign = async (t: Task, armId: string) => {
    await sb().from("atlas_tasks").update({ arm_nav_id: armId || null, updated_at: new Date().toISOString() }).eq("id", t.id);
    reload();
  };

  const add = async () => {
    const v = title.trim();
    setAdding(false);
    setTitle("");
    if (!v) return;
    await sb().from("atlas_tasks").insert({ title: v });
    reload();
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
          <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
            triage → todo → ready (arms pick up ready) → running → done · assign an arm + move to ready = it works alone
          </div>
        </div>
        {adding ? (
          <input
            autoFocus value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void add(); if (e.key === "Escape") setAdding(false); }}
            onBlur={() => void add()}
            placeholder="New task · Enter"
            className="w-64 rounded-lg border px-3 py-1.5 text-sm outline-none"
            style={{ borderColor: "var(--border)" }}
          />
        ) : (
          <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-white" style={{ background: "var(--text)" }} onClick={() => setAdding(true)}>
            <Plus size={14} /> Task
          </button>
        )}
      </header>

      <div className="flex min-h-0 flex-1 gap-2 overflow-x-auto p-4">
        {LANES.map((lane) => {
          const inLane = tasks.filter((t) => t.state === lane);
          return (
            <div key={lane} className="flex h-full w-[230px] shrink-0 flex-col rounded-xl" style={{ background: "var(--bg-side)" }}>
              <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
                {lane} · {inLane.length}
              </div>
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
                {inLane.map((t) => (
                  <div key={t.id} className="rounded-lg border bg-white p-2.5" style={{ borderColor: "var(--border)" }}>
                    <div className="text-sm font-medium">{t.title}</div>
                    {t.detail && <div className="mt-0.5 line-clamp-2 text-xs" style={{ color: "var(--text-soft)" }}>{t.detail}</div>}
                    <div className="mt-2 flex items-center gap-1">
                      <select
                        className="min-w-0 flex-1 rounded border px-1 py-0.5 text-[11px] outline-none"
                        style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
                        value={t.arm_nav_id ?? ""}
                        onChange={(e) => void assign(t, e.target.value)}
                      >
                        <option value="">no arm</option>
                        {arms.map((a) => <option key={a.id} value={a.id}>{a.emoji} {a.title}</option>)}
                      </select>
                      {t.result_node_id && t.arm_nav_id && (
                        <button title="Open result note" onClick={() => navigate(`/p/${t.arm_nav_id}/n/${t.result_node_id}`)}>
                          <FileText size={13} style={{ color: "#448361" }} />
                        </button>
                      )}
                      <button onClick={() => void move(t, -1)} disabled={lane === "triage"} style={{ opacity: lane === "triage" ? 0.2 : 0.6 }}>
                        <ChevronLeft size={14} />
                      </button>
                      <button onClick={() => void move(t, 1)} disabled={lane === "done"} style={{ opacity: lane === "done" ? 0.2 : 0.6 }}>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
