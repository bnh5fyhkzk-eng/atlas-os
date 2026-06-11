// CalendarBlock · embed Google Calendar events into a page
// Per FOUNDATION-REBUILD Phase 5
import { useEffect, useState } from "react";
import { Calendar as CalIcon } from "lucide-react";

interface CalEvent {
  id?: string;
  summary?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  location?: string;
}

export function CalendarBlock({ calendarId = "primary", windowHours = 48 }: { calendarId?: string; windowHours?: number }) {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const tMin = new Date().toISOString();
        const tMax = new Date(Date.now() + windowHours * 3600 * 1000).toISOString();
        const r = await fetch(`/api/calendar/events?calendarId=${encodeURIComponent(calendarId)}&timeMin=${encodeURIComponent(tMin)}&timeMax=${encodeURIComponent(tMax)}`, { credentials: "include" });
        if (!r.ok) throw new Error(`Calendar API ${r.status}`);
        const data = await r.json();
        setEvents(data.events ?? data.items ?? []);
        setError(null);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [calendarId, windowHours]);

  return (
    <div className="my-2 p-3 border border-black/10 rounded-lg bg-white">
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <CalIcon size={14} /> Calendar · next {windowHours}h
      </div>
      {loading && <div className="text-xs opacity-50">Loading events…</div>}
      {error && <div className="text-xs text-amber-600">{error}</div>}
      {!loading && !error && events.length === 0 && (
        <div className="text-xs opacity-50 italic">No events</div>
      )}
      <ul className="space-y-1.5 text-sm">
        {events.slice(0, 12).map((ev, i) => {
          const start = ev.start?.dateTime ?? ev.start?.date ?? "";
          const when = start ? new Date(start).toLocaleString("en-CA", { weekday: "short", hour: "2-digit", minute: "2-digit" }) : "";
          return (
            <li key={ev.id ?? i} className="flex items-start gap-2">
              <span className="text-xs opacity-60 min-w-[80px]">{when}</span>
              <span className="flex-1">{ev.summary ?? "(no title)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
