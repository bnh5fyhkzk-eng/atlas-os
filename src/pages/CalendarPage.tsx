// Calendar · Atlas-OS v3 · real month grid on atlas_events
// Manual add works NOW · Gemma auto-fill posts into the same table (Phase C pipe)
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { listEvents, createEvent, type NavItem, type CalEvent } from "../lib/db";

export default function CalendarPage({ item }: { item: NavItem }) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [addingDay, setAddingDay] = useState<string | null>(null);
  const [title, setTitle] = useState("");

  const reload = useCallback(() => {
    const from = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const to = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
    listEvents(from.toISOString(), to.toISOString()).then(setEvents).catch(() => setEvents([]));
  }, [cursor]);

  useEffect(() => { reload(); }, [reload]);

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const today = new Date();
  const isToday = (d: number) =>
    today.getFullYear() === cursor.getFullYear() && today.getMonth() === cursor.getMonth() && today.getDate() === d;

  const eventsOn = (d: number) =>
    events.filter((e) => new Date(e.starts_at).getDate() === d);

  const dayKey = (d: number) => `${cursor.getFullYear()}-${cursor.getMonth()}-${d}`;

  const submitAdd = async (d: number) => {
    const t = title.trim();
    setAddingDay(null);
    setTitle("");
    if (!t) return;
    const starts = new Date(cursor.getFullYear(), cursor.getMonth(), d, 9, 0);
    await createEvent({ title: t, starts_at: starts.toISOString() });
    reload();
  };

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur md:px-10"
        style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="flex items-center gap-2 text-sm">
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
            <ChevronLeft size={16} />
          </button>
          <span className="w-36 text-center font-medium">
            {cursor.toLocaleString("en", { month: "long", year: "numeric" })}
          </span>
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
            <ChevronRight size={16} />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-4">
        <div className="grid grid-cols-7 gap-px text-center text-xs" style={{ color: "var(--text-faint)" }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => <div key={d} className="py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((d, i) => (
            <div
              key={i}
              className="group min-h-[92px] rounded-lg border p-1.5"
              style={{
                borderColor: d && isToday(d) ? "var(--accent)" : "var(--border)",
                background: d ? undefined : "transparent",
                borderStyle: d ? "solid" : "none",
              }}
            >
              {d && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: isToday(d) ? "var(--accent)" : "var(--text-faint)" }}>{d}</span>
                    <button
                      className="hidden group-hover:block"
                      style={{ color: "var(--text-faint)" }}
                      onClick={() => { setAddingDay(dayKey(d)); setTitle(""); }}
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {eventsOn(d).map((e) => (
                      <div
                        key={e.id}
                        className="truncate rounded px-1 py-0.5 text-[11px]"
                        style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
                        title={`${e.title} · ${new Date(e.starts_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ${e.source}`}
                      >
                        {e.title}
                      </div>
                    ))}
                    {addingDay === dayKey(d) && (
                      <input
                        autoFocus
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") void submitAdd(d);
                          if (e.key === "Escape") setAddingDay(null);
                        }}
                        onBlur={() => void submitAdd(d)}
                        placeholder="Event"
                        className="w-full rounded px-1 py-0.5 text-[11px] outline-none"
                        style={{ background: "var(--hover)" }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs" style={{ color: "var(--text-faint)" }}>
          Manual add live · Gemma auto-fill posts into this table (Phase C pipe from Mac mini)
        </div>
      </div>
    </div>
  );
}
