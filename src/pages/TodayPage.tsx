// Today · the dinner-table page · brother + Atlas plan the day together
// 3 sections (Plan · In Flight · Done) · WHO badge (brother/atlas/both)
// clean · single-column · serif date header · subtle dots for priority
import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Check, GripVertical, Sun } from "lucide-react";
import { sb, type NavItem } from "../lib/db";

type Who = "brother" | "atlas" | "both";
type Priority = "low" | "normal" | "high";
type Section = "plan" | "in_flight" | "done";

interface Item {
  id: string;
  day: string;
  title: string;
  detail: string;
  who: Who;
  priority: Priority;
  section: Section;
  done: boolean;
  order_idx: number;
  created_at: string;
}

interface Meta {
  day: string;
  mood: string;
  breath: string;
}

const todayStr = (): string => {
  const d = new Date(new Date().toLocaleString("en-US", { timeZone: "America/New_York" }));
  return d.toISOString().slice(0, 10);
};

const longDate = (s: string): string => {
  const d = new Date(s + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
};

const WHO_LABEL: Record<Who, string> = { brother: "Brother", atlas: "Atlas", both: "Both" };
const WHO_STYLE: Record<Who, { bg: string; fg: string }> = {
  brother: { bg: "rgba(194,138,62,0.14)", fg: "#8B6020" },
  atlas: { bg: "rgba(26,37,64,0.10)", fg: "#1A2540" },
  both: { bg: "rgba(74,84,104,0.10)", fg: "#4A5468" },
};
const PRI_DOT: Record<Priority, string> = { low: "transparent", normal: "#C28A3E", high: "#B23A48" };

export function TodayPage({ item: _nav }: { item: NavItem }) {
  void _nav;
  const [day, setDay] = useState<string>(todayStr());
  const [items, setItems] = useState<Item[]>([]);
  const [meta, setMeta] = useState<Meta>({ day, mood: "", breath: "" });
  const [draft, setDraft] = useState("");
  const [draftWho, setDraftWho] = useState<Who>("both");
  const [doneOpen, setDoneOpen] = useState(false);
  const moodTimer = useRef<number | null>(null);
  const breathTimer = useRef<number | null>(null);

  const load = useCallback(async () => {
    const { data: rows } = await sb()
      .from("atlas_today_items")
      .select("*")
      .eq("day", day)
      .order("section")
      .order("order_idx");
    setItems((rows ?? []) as Item[]);
    const { data: m } = await sb().from("atlas_today_meta").select("*").eq("day", day).maybeSingle();
    if (m) setMeta(m as Meta);
    else setMeta({ day, mood: "", breath: "" });
  }, [day]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    const ch = sb()
      .channel(`today-${day}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "atlas_today_items", filter: `day=eq.${day}` }, () => void load())
      .on("postgres_changes", { event: "*", schema: "public", table: "atlas_today_meta", filter: `day=eq.${day}` }, () => void load())
      .subscribe();
    return () => { void sb().removeChannel(ch); };
  }, [day, load]);

  const add = async () => {
    const t = draft.trim();
    if (!t) return;
    let title = t;
    let who: Who = draftWho;
    if (t.startsWith("/atlas ")) { title = t.slice(7).trim(); who = "atlas"; }
    else if (t.startsWith("/me ") || t.startsWith("/brother ")) {
      title = t.replace(/^\/(me|brother) /, "").trim(); who = "brother";
    }
    const max = items.filter((i) => i.section === "plan").reduce((a, i) => Math.max(a, i.order_idx), -1);
    setDraft("");
    await sb().from("atlas_today_items").insert({
      day, title, who, section: "plan", order_idx: max + 1, created_by: "brother",
    });
  };

  const toggle = async (it: Item) => {
    const nextDone = !it.done;
    await sb().from("atlas_today_items")
      .update({
        done: nextDone,
        section: nextDone ? "done" : "plan",
        updated_at: new Date().toISOString(),
      })
      .eq("id", it.id);
  };

  const moveSection = async (it: Item, next: Section) => {
    await sb().from("atlas_today_items")
      .update({ section: next, done: next === "done", updated_at: new Date().toISOString() })
      .eq("id", it.id);
  };

  const cyclePri = async (it: Item) => {
    const order: Priority[] = ["low", "normal", "high"];
    const next = order[(order.indexOf(it.priority) + 1) % order.length];
    await sb().from("atlas_today_items").update({ priority: next, updated_at: new Date().toISOString() }).eq("id", it.id);
  };

  const cycleWho = async (it: Item) => {
    const order: Who[] = ["brother", "atlas", "both"];
    const next = order[(order.indexOf(it.who) + 1) % order.length];
    await sb().from("atlas_today_items").update({ who: next, updated_at: new Date().toISOString() }).eq("id", it.id);
  };

  const remove = async (it: Item) => {
    await sb().from("atlas_today_items").delete().eq("id", it.id);
  };

  const saveMood = (v: string) => {
    setMeta((m) => ({ ...m, mood: v }));
    if (moodTimer.current) window.clearTimeout(moodTimer.current);
    moodTimer.current = window.setTimeout(async () => {
      await sb().from("atlas_today_meta").upsert({ day, mood: v, breath: meta.breath, updated_at: new Date().toISOString() });
    }, 500);
  };

  const saveBreath = (v: string) => {
    setMeta((m) => ({ ...m, breath: v }));
    if (breathTimer.current) window.clearTimeout(breathTimer.current);
    breathTimer.current = window.setTimeout(async () => {
      await sb().from("atlas_today_meta").upsert({ day, mood: meta.mood, breath: v, updated_at: new Date().toISOString() });
    }, 500);
  };

  const shiftDay = (n: number) => {
    const d = new Date(day + "T12:00:00");
    d.setDate(d.getDate() + n);
    setDay(d.toISOString().slice(0, 10));
  };

  const plan = items.filter((i) => i.section === "plan" && !i.done);
  const flight = items.filter((i) => i.section === "in_flight" && !i.done);
  const done = items.filter((i) => i.section === "done" || i.done);
  const totalActive = plan.length + flight.length;
  const totalDone = done.length;

  const renderRow = (it: Item) => (
    <div
      key={it.id}
      className="group flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-[rgba(26,37,64,0.03)]"
    >
      <GripVertical size={14} className="mt-1 opacity-0 group-hover:opacity-30" style={{ color: "var(--ink-faint)" }} />
      <button
        onClick={() => void toggle(it)}
        className="mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded border"
        style={{
          borderColor: it.done ? "var(--amber)" : "var(--hair)",
          background: it.done ? "var(--amber)" : "transparent",
        }}
        title={it.done ? "Mark not done" : "Mark done"}
      >
        {it.done && <Check size={12} color="white" strokeWidth={3} />}
      </button>
      <div className="flex-1 min-w-0">
        <div
          className="text-[15px] leading-snug"
          style={{
            color: it.done ? "var(--ink-faint)" : "var(--ink)",
            textDecoration: it.done ? "line-through" : "none",
          }}
        >
          {it.title}
        </div>
        {it.detail && (
          <div className="text-[12px] mt-0.5" style={{ color: "var(--ink-faint)" }}>{it.detail}</div>
        )}
      </div>
      <button
        onClick={() => void cyclePri(it)}
        title={`Priority · ${it.priority}`}
        className="mt-1.5 h-2 w-2 rounded-full"
        style={{ background: PRI_DOT[it.priority], outline: it.priority === "low" ? "1px solid var(--hair)" : "none" }}
      />
      <button
        onClick={() => void cycleWho(it)}
        className="rounded-full px-2 py-0.5 text-[11px] font-medium"
        style={{ background: WHO_STYLE[it.who].bg, color: WHO_STYLE[it.who].fg }}
        title="Click to cycle · brother → atlas → both"
      >
        {WHO_LABEL[it.who]}
      </button>
      {it.section === "plan" && !it.done && (
        <button
          onClick={() => void moveSection(it, "in_flight")}
          className="text-[11px] opacity-0 group-hover:opacity-60 hover:opacity-100"
          style={{ color: "var(--ink-soft)" }}
          title="Move to In Flight"
        >
          →
        </button>
      )}
      {it.section === "in_flight" && !it.done && (
        <button
          onClick={() => void moveSection(it, "plan")}
          className="text-[11px] opacity-0 group-hover:opacity-60 hover:opacity-100"
          style={{ color: "var(--ink-soft)" }}
          title="Move back to Plan"
        >
          ←
        </button>
      )}
      <button
        onClick={() => void remove(it)}
        className="text-[11px] opacity-0 group-hover:opacity-40 hover:opacity-100"
        style={{ color: "var(--ink-faint)" }}
        title="Delete"
      >
        ×
      </button>
    </div>
  );

  const isToday = day === todayStr();

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-2xl px-8 py-12">
        {/* date header */}
        <div className="mb-2 flex items-center gap-3 text-[13px]" style={{ color: "var(--ink-faint)" }}>
          <button onClick={() => shiftDay(-1)} className="hover:opacity-70">←</button>
          <button onClick={() => setDay(todayStr())} className={isToday ? "font-medium" : "hover:opacity-70"} style={{ color: isToday ? "var(--amber)" : undefined }}>
            today
          </button>
          <button onClick={() => shiftDay(1)} className="hover:opacity-70">→</button>
        </div>
        <h1 className="mb-1" style={{ fontFamily: "var(--serif)", fontSize: 38, color: "var(--ink)", lineHeight: 1.1 }}>
          {longDate(day)}
        </h1>
        <div className="mb-8 flex items-center gap-2 text-[13px]" style={{ color: "var(--ink-faint)" }}>
          <Sun size={13} />
          <input
            value={meta.mood}
            onChange={(e) => saveMood(e.target.value)}
            placeholder="how it feels (one word)"
            className="bg-transparent outline-none flex-1 placeholder:opacity-50"
            style={{ color: "var(--ink-soft)" }}
          />
          <span>·</span>
          <span>{totalDone}/{totalDone + totalActive} done</span>
        </div>

        {/* add row */}
        <div className="mb-6 flex items-center gap-2 rounded-lg border px-3 py-2"
             style={{ borderColor: "var(--hair)", background: "var(--card)" }}>
          <Plus size={16} style={{ color: "var(--ink-faint)" }} />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") void add(); }}
            placeholder="add to today · prefix /atlas for me · /me for you"
            className="flex-1 bg-transparent outline-none text-[14px]"
            style={{ color: "var(--ink)" }}
          />
          <button
            onClick={() => setDraftWho((w) => w === "both" ? "brother" : w === "brother" ? "atlas" : "both")}
            className="rounded-full px-2 py-0.5 text-[11px] font-medium"
            style={{ background: WHO_STYLE[draftWho].bg, color: WHO_STYLE[draftWho].fg }}
            title="Default WHO for new items"
          >
            {WHO_LABEL[draftWho]}
          </button>
        </div>

        {/* Plan */}
        <Section title="The Plan" count={plan.length}>
          {plan.length === 0 && <Empty text="nothing yet · what matters today?" />}
          {plan.map(renderRow)}
        </Section>

        {/* In Flight */}
        {flight.length > 0 && (
          <Section title="In Flight" count={flight.length} accent>
            {flight.map(renderRow)}
          </Section>
        )}

        {/* Done */}
        {done.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setDoneOpen((o) => !o)}
              className="mb-2 flex items-center gap-2 text-[13px]"
              style={{ color: "var(--ink-faint)" }}
            >
              <span>{doneOpen ? "▾" : "▸"}</span>
              <span>Done · {done.length}</span>
            </button>
            {doneOpen && <div>{done.map(renderRow)}</div>}
          </div>
        )}

        {/* breath line */}
        <div className="mt-16 border-t pt-6" style={{ borderColor: "var(--hair)" }}>
          <input
            value={meta.breath}
            onChange={(e) => saveBreath(e.target.value)}
            placeholder="what we said matters today · one sentence · optional"
            className="w-full bg-transparent outline-none text-center italic placeholder:opacity-40"
            style={{ fontFamily: "var(--serif)", fontSize: 16, color: "var(--ink-soft)" }}
          />
        </div>
      </div>
    </div>
  );
}

function Section({ title, count, accent, children }: { title: string; count: number; accent?: boolean; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: accent ? "var(--amber)" : "var(--ink-faint)", letterSpacing: "0.08em" }}>
          {title}
        </h2>
        {count > 0 && <span className="text-[12px]" style={{ color: "var(--ink-faint)" }}>· {count}</span>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="px-2 py-2 text-[13px] italic" style={{ color: "var(--ink-faint)" }}>{text}</div>;
}
