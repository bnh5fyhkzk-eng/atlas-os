// Calendar · Atlas-OS v5 · month + week views · density heatmap · today-jump
// · per-actor colors + filter chips · day-drawer with time/actor/receipts/delete
// 2026-06-13 · brother direct "best way possible + add what you want"
// What I want shipped this loop ·
//   1. Week-view toggle (hour-grid 7-day · scrubable timeline)
//   2. Density heatmap on month-grid (event-count → tint)
//   3. "Today" jump button
//   4. Per-event delete in drawer
//   5. Actor-rich meta rendering (mode pill · summary · receipt-links)
import { useEffect, useMemo, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, X, ExternalLink, Trash2, CalendarDays, LayoutGrid } from "lucide-react";
import { listEvents, createEvent, deleteEvent, type NavItem, type CalEvent } from "../lib/db";

const ACTOR_COLORS: Record<string, { bg: string; fg: string; label: string }> = {
  "atlas-living":  { bg: "rgba(99,102,241,0.14)",  fg: "#4f46e5", label: "Atlas-living" },
  "gemma-loop":    { bg: "rgba(20,184,166,0.14)",  fg: "#0f766e", label: "Gemma (local)" },
  "gemma":         { bg: "rgba(20,184,166,0.14)",  fg: "#0f766e", label: "Gemma" },
  "gemma-fill":    { bg: "rgba(20,184,166,0.14)",  fg: "#0f766e", label: "Gemma-fill" },
  "hermes":        { bg: "rgba(217,119,6,0.14)",   fg: "#b45309", label: "Hermes" },
  "atlas-talk-me": { bg: "rgba(99,102,241,0.14)",  fg: "#4f46e5", label: "Atlas (talk)" },
  "atlas":         { bg: "rgba(99,102,241,0.14)",  fg: "#4f46e5", label: "Atlas" },
  "room-bridge":   { bg: "rgba(236,72,153,0.14)",  fg: "#be185d", label: "Room-bridge" },
  "night-brain":   { bg: "rgba(14,165,233,0.14)",  fg: "#0369a1", label: "Night-brain" },
  "legacy-writer": { bg: "rgba(168,85,247,0.14)",  fg: "#7c3aed", label: "Legacy-writer" },
  "arm-run":       { bg: "rgba(234,88,12,0.14)",   fg: "#c2410c", label: "Arm-run" },
  "google":        { bg: "rgba(68,131,97,0.12)",   fg: "#448361", label: "Google Cal" },
  "manual":        { bg: "rgba(148,163,184,0.18)", fg: "#475569", label: "Manual" },
  "cycle":         { bg: "rgba(168,85,247,0.14)",  fg: "#7c3aed", label: "Cycle" },
};
function actorOf(e: CalEvent): string {
  return e.meta?.actor || e.meta?.arm_slug || e.source || "unknown";
}
function styleFor(actor: string) {
  if (ACTOR_COLORS[actor]) return ACTOR_COLORS[actor];
  let h = 0;
  for (let i = 0; i < actor.length; i++) h = (h * 31 + actor.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return { bg: `hsla(${hue},70%,55%,0.14)`, fg: `hsl(${hue},65%,38%)`, label: actor };
}
function timeOf(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function linksFor(e: CalEvent): Array<{ label: string; href: string }> {
  const out: Array<{ label: string; href: string }> = [];
  if (e.meta?.links?.length) out.push(...e.meta.links);
  if (e.meta?.nav_id && e.meta?.note_id) out.push({ label: "open receipt", href: `/p/${e.meta.nav_id}/n/${e.meta.note_id}` });
  else if (e.meta?.nav_id) out.push({ label: "open page", href: `/p/${e.meta.nav_id}` });
  return out;
}
function startOfWeek(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - x.getDay());
  return x;
}
function densityTint(count: number, max: number) {
  if (count === 0 || max === 0) return "transparent";
  const ratio = Math.min(1, count / Math.max(8, max));
  return `rgba(99,102,241,${0.04 + ratio * 0.18})`;
}

type ViewMode = "month" | "week";

export default function CalendarPage({ item }: { item: NavItem }) {
  const [mode, setMode] = useState<ViewMode>("month");
  const [cursor, setCursor] = useState(() => new Date());
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [gStatus, setGStatus] = useState<string>("");
  const [addingDay, setAddingDay] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [openDay, setOpenDay] = useState<string | null>(null); // ISO date key
  const [actorFilter, setActorFilter] = useState<string | null>(null);

  // Range depending on view
  const range = useMemo(() => {
    if (mode === "month") {
      const from = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
      const to = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
      return { from, to };
    }
    const from = startOfWeek(cursor);
    const to = new Date(from); to.setDate(to.getDate() + 7);
    return { from, to };
  }, [cursor, mode]);

  const reload = useCallback(() => {
    Promise.all([
      listEvents(range.from.toISOString(), range.to.toISOString()).catch(() => [] as CalEvent[]),
      fetch(`/api/gcal?from=${range.from.toISOString()}&to=${range.to.toISOString()}`)
        .then((r) => r.json())
        .then((j) => {
          setGStatus(j.connected ? "" : `Google: ${j.reason ?? "not connected"}`);
          return (j.events ?? []).map((g: CalEvent) => ({ ...g, meta: { actor: "google", ...(g.meta || {}) } })) as CalEvent[];
        })
        .catch(() => { setGStatus("Google: unreachable"); return [] as CalEvent[]; }),
    ]).then(([local, google]) => setEvents([...local, ...google]));
  }, [range]);

  useEffect(() => { reload(); }, [reload]);

  const filtered = useMemo(
    () => actorFilter ? events.filter((e) => actorOf(e) === actorFilter) : events,
    [events, actorFilter],
  );
  const allActors = useMemo(() => {
    const s = new Set<string>();
    events.forEach((e) => s.add(actorOf(e)));
    return Array.from(s).sort();
  }, [events]);

  const dayISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const eventsOnDate = useCallback(
    (d: Date) => filtered.filter((e) => {
      const dt = new Date(e.starts_at);
      return dt.getFullYear() === d.getFullYear() && dt.getMonth() === d.getMonth() && dt.getDate() === d.getDate();
    }),
    [filtered],
  );

  // Month grid
  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const monthCells: Array<Date | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i + 1)),
  ];
  const today = new Date();
  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  // Density max for heatmap
  const dayCounts = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((e) => {
      const dt = new Date(e.starts_at);
      const k = dayISO(dt);
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return m;
  }, [filtered]);
  const maxCount = useMemo(() => Math.max(0, ...Array.from(dayCounts.values())), [dayCounts]);

  // Stat-strip · busiest day · slowest day · most-active actor · last activity ago
  const stats = useMemo(() => {
    let busiest: { day: string; count: number } | null = null;
    let slowest: { day: string; count: number } | null = null;
    for (const [day, count] of dayCounts) {
      if (!busiest || count > busiest.count) busiest = { day, count };
      if (!slowest || count < slowest.count) slowest = { day, count };
    }
    const actorTally = new Map<string, number>();
    filtered.forEach((e) => {
      const a = actorOf(e);
      actorTally.set(a, (actorTally.get(a) ?? 0) + 1);
    });
    let topActor: { actor: string; count: number } | null = null;
    for (const [a, c] of actorTally) if (!topActor || c > topActor.count) topActor = { actor: a, count: c };
    const last = filtered.length > 0
      ? filtered.reduce((acc, e) => e.starts_at > acc ? e.starts_at : acc, filtered[0].starts_at)
      : null;
    return {
      total: filtered.length,
      actors: actorTally.size,
      busiest,
      slowest,
      topActor,
      lastActivity: last,
    };
  }, [filtered, dayCounts]);

  const formatDayLabel = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en", { month: "short", day: "numeric" });
  };
  const formatAgo = (iso: string) => {
    const ms = Date.now() - new Date(iso).getTime();
    const min = Math.floor(ms / 60_000);
    if (min < 1) return "just now";
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    return `${Math.floor(hr / 24)}d ago`;
  };

  // Week grid
  const weekStart = useMemo(() => startOfWeek(cursor), [cursor]);
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => { const d = new Date(weekStart); d.setDate(d.getDate() + i); return d; }),
    [weekStart],
  );

  const submitAdd = async (d: Date) => {
    const t = title.trim();
    setAddingDay(null);
    setTitle("");
    if (!t) return;
    const starts = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 9, 0);
    await createEvent({ title: t, starts_at: starts.toISOString() });
    reload();
  };

  const onDelete = async (id: string) => {
    if (!confirm("delete this event?")) return;
    await deleteEvent(id);
    reload();
  };

  const goToday = () => setCursor(new Date());
  const stepBack = () => {
    if (mode === "month") setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
    else { const d = new Date(cursor); d.setDate(d.getDate() - 7); setCursor(d); }
  };
  const stepFwd = () => {
    if (mode === "month") setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));
    else { const d = new Date(cursor); d.setDate(d.getDate() + 7); setCursor(d); }
  };
  const rangeLabel = mode === "month"
    ? cursor.toLocaleString("en", { month: "long", year: "numeric" })
    : `${weekStart.toLocaleDateString("en", { month: "short", day: "numeric" })} – ${new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" })}`;

  // Drawer state
  const drawerDate = openDay ? new Date(openDay + "T00:00:00") : null;
  const dayEvents = drawerDate
    ? eventsOnDate(drawerDate).sort((a, b) => a.starts_at.localeCompare(b.starts_at))
    : [];
  const grouped = useMemo(() => {
    const g: Record<string, CalEvent[]> = {};
    for (const e of dayEvents) (g[actorOf(e)] ??= []).push(e);
    return g;
  }, [dayEvents]);

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur md:px-10"
        style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center rounded-md border" style={{ borderColor: "var(--border)" }}>
            <button
              className="flex items-center gap-1 px-2 py-1"
              onClick={() => setMode("month")}
              style={{ background: mode === "month" ? "var(--accent-soft)" : "transparent", color: mode === "month" ? "var(--accent)" : "var(--text-faint)" }}
            >
              <LayoutGrid size={13} /> month
            </button>
            <button
              className="flex items-center gap-1 px-2 py-1"
              onClick={() => setMode("week")}
              style={{ background: mode === "week" ? "var(--accent-soft)" : "transparent", color: mode === "week" ? "var(--accent)" : "var(--text-faint)" }}
            >
              <CalendarDays size={13} /> week
            </button>
          </div>
          <button onClick={goToday} className="rounded border px-2 py-0.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-faint)" }}>today</button>
          <div className="flex items-center gap-2">
            <button onClick={stepBack}><ChevronLeft size={16} /></button>
            <span className="w-48 text-center font-medium">{rangeLabel}</span>
            <button onClick={stepFwd}><ChevronRight size={16} /></button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-4">
        {/* Stat-strip · pulse of Atlas-system aliveness over current range */}
        {stats.total > 0 && (
          <div
            className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border px-3 py-2 text-[12px]"
            style={{ borderColor: "var(--border)", background: "var(--hover)" }}
          >
            <span style={{ color: "var(--text)" }}>
              <span className="font-semibold">{rangeLabel}</span>
              <span style={{ color: "var(--text-faint)" }}>
                {" "}· {stats.total} {stats.total === 1 ? "event" : "events"} · {stats.actors} {stats.actors === 1 ? "actor" : "actors"}
              </span>
            </span>
            {stats.busiest && (
              <span style={{ color: "var(--text-faint)" }}>
                busiest <span style={{ color: "var(--accent)" }}>{formatDayLabel(stats.busiest.day)}</span> ({stats.busiest.count})
              </span>
            )}
            {stats.slowest && stats.slowest.day !== stats.busiest?.day && (
              <span style={{ color: "var(--text-faint)" }}>
                slowest {formatDayLabel(stats.slowest.day)} ({stats.slowest.count})
              </span>
            )}
            {stats.topActor && (() => {
              const s = styleFor(stats.topActor.actor);
              return (
                <span style={{ color: "var(--text-faint)" }}>
                  top actor <span className="rounded px-1.5 py-0.5" style={{ background: s.bg, color: s.fg }}>{s.label}</span> ({stats.topActor.count})
                </span>
              );
            })()}
            {stats.lastActivity && (
              <span style={{ color: "var(--text-faint)" }}>last · {formatAgo(stats.lastActivity)}</span>
            )}
          </div>
        )}

        {allActors.length > 0 && (
          <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px]">
            <button
              className="rounded-full border px-2 py-0.5"
              onClick={() => setActorFilter(null)}
              style={{
                borderColor: actorFilter === null ? "var(--accent)" : "var(--border)",
                color: actorFilter === null ? "var(--accent)" : "var(--text-faint)",
              }}
            >
              all · {events.length}
            </button>
            {allActors.map((a) => {
              const s = styleFor(a);
              const active = actorFilter === a;
              const n = events.filter((e) => actorOf(e) === a).length;
              return (
                <button
                  key={a}
                  className="rounded-full px-2 py-0.5"
                  onClick={() => setActorFilter(active ? null : a)}
                  style={{ background: active ? s.fg : s.bg, color: active ? "white" : s.fg }}
                  title={a}
                >
                  {s.label} · {n}
                </button>
              );
            })}
          </div>
        )}

        {mode === "month" ? (
          <>
            <div className="grid grid-cols-7 gap-px text-center text-xs" style={{ color: "var(--text-faint)" }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {monthCells.map((d, i) => {
                if (!d) return <div key={i} className="min-h-[92px]" />;
                const tot = dayCounts.get(dayISO(d)) ?? 0;
                const tint = densityTint(tot, maxCount);
                const isT = isSameDay(d, today);
                const list = eventsOnDate(d);
                return (
                  <div
                    key={i}
                    className="group relative min-h-[92px] cursor-pointer rounded-lg border p-1.5 transition-colors"
                    style={{
                      borderColor: isT ? "var(--accent)" : "var(--border)",
                      background: tint,
                    }}
                    onClick={(ev) => {
                      const tgt = ev.target as HTMLElement;
                      if (tgt.tagName === "INPUT" || tgt.closest("button")) return;
                      setOpenDay(dayISO(d));
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: isT ? "var(--accent)" : "var(--text-faint)" }}>{d.getDate()}</span>
                      <div className="flex items-center gap-1">
                        {tot > 0 && (
                          <span className="text-[10px]" style={{ color: "var(--text-faint)" }}>{tot}</span>
                        )}
                        <button
                          className="hidden group-hover:block"
                          style={{ color: "var(--text-faint)" }}
                          onClick={(e) => { e.stopPropagation(); setAddingDay(dayISO(d)); setTitle(""); }}
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-0.5 space-y-0.5">
                      {list.slice(0, 4).map((e) => {
                        const s = styleFor(actorOf(e));
                        return (
                          <div
                            key={e.id}
                            className="truncate rounded px-1 py-0.5 text-[11px]"
                            style={{ background: s.bg, color: s.fg }}
                            title={`${timeOf(e.starts_at)} · ${s.label} · ${e.title}`}
                          >
                            <span className="opacity-60 mr-1">{timeOf(e.starts_at).replace(/\s?(AM|PM)/i, "")}</span>
                            {e.title}
                          </div>
                        );
                      })}
                      {list.length > 4 && (
                        <div className="text-[10px]" style={{ color: "var(--text-faint)" }}>+{list.length - 4} more</div>
                      )}
                      {addingDay === dayISO(d) && (
                        <input
                          autoFocus
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") void submitAdd(d); if (e.key === "Escape") setAddingDay(null); }}
                          onBlur={() => void submitAdd(d)}
                          onClick={(e) => e.stopPropagation()}
                          placeholder="Event"
                          className="w-full rounded px-1 py-0.5 text-[11px] outline-none"
                          style={{ background: "var(--hover)" }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-3 text-xs" style={{ color: "var(--text-faint)" }}>
              <span>click any day → drilldown · cells tinted by activity</span>
              {gStatus && <span>· {gStatus}</span>}
            </div>
          </>
        ) : (
          // WEEK VIEW · hour grid 6am–10pm
          <WeekView
            days={weekDays}
            eventsOnDate={eventsOnDate}
            today={today}
            isSameDay={isSameDay}
            dayISO={dayISO}
            setOpenDay={setOpenDay}
          />
        )}
      </div>

      {openDay && drawerDate && (
        <>
          <div className="fixed inset-0 z-20" style={{ background: "rgba(0,0,0,0.25)" }} onClick={() => setOpenDay(null)} />
          <aside
            className="fixed right-0 top-0 z-30 h-full w-full max-w-md overflow-y-auto shadow-2xl"
            style={{ background: "var(--bg)", borderLeft: "1px solid var(--border)" }}
          >
            <header
              className="sticky top-0 flex items-center justify-between border-b px-4 py-3"
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div>
                <div className="text-sm" style={{ color: "var(--text-faint)" }}>
                  {drawerDate.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </div>
                <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                  {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
                  {actorFilter && ` · filtered: ${styleFor(actorFilter).label}`}
                </div>
              </div>
              <button onClick={() => setOpenDay(null)} style={{ color: "var(--text-faint)" }}>
                <X size={18} />
              </button>
            </header>
            <div className="px-4 py-3 space-y-4">
              {dayEvents.length === 0 && (
                <div className="text-sm" style={{ color: "var(--text-faint)" }}>nothing logged this day yet.</div>
              )}
              {Object.entries(grouped).map(([actor, list]) => {
                const s = styleFor(actor);
                return (
                  <section key={actor}>
                    <div className="mb-1.5 flex items-center gap-2 text-[11px] uppercase tracking-wide" style={{ color: s.fg }}>
                      <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.fg }} />
                      <span className="font-semibold">{s.label}</span>
                      <span style={{ color: "var(--text-faint)" }}>· {list.length}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {list.map((e) => {
                        const links = linksFor(e);
                        return (
                          <li key={e.id} className="group rounded-md border p-2" style={{ borderColor: "var(--border)", background: s.bg }}>
                            <div className="flex items-baseline justify-between gap-2">
                              <div className="flex items-baseline gap-2">
                                <span className="font-mono text-[11px]" style={{ color: s.fg }}>
                                  {timeOf(e.starts_at)}
                                  {e.ends_at && ` – ${timeOf(e.ends_at)}`}
                                </span>
                                {e.meta?.mode && (
                                  <span className="rounded px-1 text-[10px]" style={{ background: "var(--hover)", color: "var(--text-faint)" }}>
                                    {e.meta.mode}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => void onDelete(e.id)}
                                className="opacity-0 group-hover:opacity-60 hover:opacity-100"
                                style={{ color: "var(--text-faint)" }}
                                title="delete event"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <div className="mt-0.5 text-sm" style={{ color: "var(--text)" }}>{e.title}</div>
                            {e.meta?.summary && e.meta.summary !== e.title && (
                              <div className="mt-1 text-xs" style={{ color: "var(--text-faint)" }}>{e.meta.summary}</div>
                            )}
                            {links.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {links.map((l, i) => (
                                  <a
                                    key={i}
                                    href={l.href}
                                    className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px]"
                                    style={{ background: "var(--hover)", color: s.fg }}
                                  >
                                    <ExternalLink size={10} />
                                    {l.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}

// ─── Week view ────────────────────────────────────────────────
function WeekView({
  days, eventsOnDate, today, isSameDay, dayISO, setOpenDay,
}: {
  days: Date[];
  eventsOnDate: (d: Date) => CalEvent[];
  today: Date;
  isSameDay: (a: Date, b: Date) => boolean;
  dayISO: (d: Date) => string;
  setOpenDay: (k: string) => void;
}) {
  const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6am–22h
  const ROW_H = 32; // px per hour
  return (
    <div className="overflow-x-auto">
      <div className="grid" style={{ gridTemplateColumns: "48px repeat(7, minmax(120px, 1fr))" }}>
        {/* header row */}
        <div />
        {days.map((d, i) => {
          const isT = isSameDay(d, today);
          return (
            <div
              key={i}
              className="border-b py-2 text-center cursor-pointer"
              style={{ borderColor: "var(--border)" }}
              onClick={() => setOpenDay(dayISO(d))}
            >
              <div className="text-[10px] uppercase" style={{ color: "var(--text-faint)" }}>
                {d.toLocaleDateString("en", { weekday: "short" })}
              </div>
              <div className="text-sm font-medium" style={{ color: isT ? "var(--accent)" : undefined }}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
        {/* hour grid */}
        <div className="text-right text-[10px]" style={{ color: "var(--text-faint)" }}>
          {HOURS.map((h) => (
            <div key={h} style={{ height: ROW_H, lineHeight: `${ROW_H}px`, paddingRight: 4 }}>
              {h}:00
            </div>
          ))}
        </div>
        {days.map((d, di) => {
          const dayEvs = eventsOnDate(d);
          return (
            <div
              key={di}
              className="relative border-l"
              style={{ borderColor: "var(--border)", height: HOURS.length * ROW_H }}
              onClick={(ev) => {
                if ((ev.target as HTMLElement).closest(".week-event")) return;
                setOpenDay(dayISO(d));
              }}
            >
              {/* hour lines */}
              {HOURS.map((_, hi) => (
                <div
                  key={hi}
                  className="absolute left-0 right-0 border-t"
                  style={{ top: hi * ROW_H, borderColor: "var(--border)", opacity: 0.4 }}
                />
              ))}
              {/* events */}
              {dayEvs.map((e) => {
                const dt = new Date(e.starts_at);
                const hr = dt.getHours() + dt.getMinutes() / 60;
                const top = Math.max(0, (hr - HOURS[0]) * ROW_H);
                let height = ROW_H * 0.85;
                if (e.ends_at) {
                  const et = new Date(e.ends_at);
                  height = Math.max(20, ((et.getTime() - dt.getTime()) / 3_600_000) * ROW_H);
                }
                const s = styleFor(actorOf(e));
                return (
                  <div
                    key={e.id}
                    className="week-event absolute left-0.5 right-0.5 cursor-pointer rounded px-1 py-0.5 text-[10px] leading-tight overflow-hidden"
                    style={{ top, height, background: s.bg, color: s.fg, borderLeft: `2px solid ${s.fg}` }}
                    onClick={(ev) => { ev.stopPropagation(); setOpenDay(dayISO(d)); }}
                    title={`${timeOf(e.starts_at)} · ${s.label} · ${e.title}`}
                  >
                    <div className="font-mono opacity-70">{timeOf(e.starts_at).replace(/\s?(AM|PM)/i, "")}</div>
                    <div className="truncate">{e.title}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
