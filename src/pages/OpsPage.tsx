// Ops · V4-OPS · cycles control + analytics/cost · Hermes-parity gaps A+C
import { useEffect, useMemo, useState } from "react";
import { Pause, Play, Activity } from "lucide-react";
import { sb, listNav, updateNav, type NavItem } from "../lib/db";

const PRICE_PER_M: Record<string, number> = {
  // blended in+out estimate USD per 1M tokens
  "deepseek-chat-v3-0324": 0.5,
  "claude-sonnet-4.6": 9,
  "claude-haiku-4.5": 3,
  "gpt-4o": 7.5,
  "gemini-2.5-pro": 7,
  "grok-3": 9,
};

interface DayRow { day: string; model: string; msgs: number; tokens: number }

export default function OpsPage({ item }: { item: NavItem }) {
  const [arms, setArms] = useState<NavItem[]>([]);
  const [lastCycle, setLastCycle] = useState<Map<string, { at: string; by: string }>>(new Map());
  const [days, setDays] = useState(7);
  const [rows, setRows] = useState<DayRow[]>([]);
  const [cycleCount, setCycleCount] = useState<{ gemma: number; paid: number }>({ gemma: 0, paid: 0 });

  const reloadArms = () => {
    listNav().then((n) => setArms(n.filter((x) => x.section === "arms"))).catch(() => undefined);
  };

  useEffect(() => {
    reloadArms();
    (async () => {
      const { data } = await sb()
        .from("atlas_nodes")
        .select("nav_id, created_at, created_by")
        .like("created_by", "cycle:%")
        .order("created_at", { ascending: false })
        .limit(300);
      const m = new Map<string, { at: string; by: string }>();
      let gemma = 0, paid = 0;
      (data ?? []).forEach((r) => {
        if (!m.has(r.nav_id)) m.set(r.nav_id, { at: r.created_at, by: r.created_by });
        if (String(r.created_by).includes("gemma")) gemma++; else paid++;
      });
      setLastCycle(m);
      setCycleCount({ gemma, paid });
    })().catch(() => undefined);
  }, []);

  useEffect(() => {
    (async () => {
      const from = new Date(Date.now() - days * 86400e3).toISOString();
      const { data } = await sb()
        .from("atlas_messages")
        .select("model, created_at, meta")
        .gte("created_at", from)
        .not("model", "is", null)
        .limit(2000);
      const agg = new Map<string, DayRow>();
      (data ?? []).forEach((r) => {
        const model = (r.model as string).split("/")[1] ?? (r.model as string);
        const day = (r.created_at as string).slice(0, 10);
        const k = `${day}|${model}`;
        const cur = agg.get(k) ?? { day, model, msgs: 0, tokens: 0 };
        cur.msgs++;
        cur.tokens += Number((r.meta as { usage?: number })?.usage ?? 0);
        agg.set(k, cur);
      });
      setRows([...agg.values()].sort((a, b) => b.day.localeCompare(a.day)));
    })().catch(() => setRows([]));
  }, [days]);

  const perModel = useMemo(() => {
    const m = new Map<string, { msgs: number; tokens: number }>();
    rows.forEach((r) => {
      const c = m.get(r.model) ?? { msgs: 0, tokens: 0 };
      c.msgs += r.msgs;
      c.tokens += r.tokens;
      m.set(r.model, c);
    });
    return [...m.entries()].sort((a, b) => b[1].tokens - a[1].tokens);
  }, [rows]);

  const totalCost = perModel.reduce((s, [model, v]) => s + (v.tokens / 1e6) * (PRICE_PER_M[model] ?? 2), 0);
  const maxTok = Math.max(1, ...perModel.map(([, v]) => v.tokens));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 px-6 py-4 backdrop-blur md:px-10" style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}>
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
      </header>
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-6 md:px-10">

        <section>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
            Arm cycles · 10-min autonomous · gemma-local {cycleCount.gemma} vs paid {cycleCount.paid} (last 300)
          </div>
          <div className="space-y-1">
            {arms.map((a) => {
              const lc = lastCycle.get(a.id);
              return (
                <div key={a.id} className="flex items-center gap-3 rounded-lg border px-3 py-2" style={{ borderColor: "var(--border)" }}>
                  <span>{a.emoji}</span>
                  <span className="flex-1 text-sm font-medium">{a.title}</span>
                  {lc && (
                    <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                      {lc.by.replace("cycle:", "")} · {new Date(lc.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                  <button
                    className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"
                    style={{ borderColor: "var(--border)", color: a.paused ? "#c4554d" : "#448361" }}
                    onClick={() => {
                      void updateNav(a.id, { paused: !a.paused } as Partial<NavItem>).then(reloadArms);
                    }}
                  >
                    {a.paused ? <><Play size={11} /> paused</> : <><Pause size={11} /> auto</>}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mt-2 text-xs" style={{ color: "var(--text-faint)" }}>
            Mac-mini launchd daemons surface here with bridge v2 (LIVE-TUI goal)
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
              <Activity size={11} className="mr-1 inline" /> AI usage + cost estimate
            </span>
            <div className="flex gap-1">
              {[7, 30, 90].map((d) => (
                <button
                  key={d}
                  className="rounded-md border px-2 py-0.5 text-xs"
                  style={{ borderColor: "var(--border)", background: days === d ? "var(--active)" : undefined }}
                  onClick={() => setDays(d)}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-3" style={{ borderColor: "var(--border)" }}>
            <div className="mb-3 text-sm">
              est. <span className="font-semibold">${totalCost.toFixed(2)}</span> · {perModel.reduce((s, [, v]) => s + v.msgs, 0)} calls · {days}d
              <span className="ml-2 text-xs" style={{ color: "var(--text-faint)" }}>(gemma-local cycles = $0 · not counted)</span>
            </div>
            <div className="space-y-1.5">
              {perModel.length === 0 && <div className="text-xs" style={{ color: "var(--text-faint)" }}>No tracked calls in window</div>}
              {perModel.map(([model, v]) => (
                <div key={model}>
                  <div className="flex justify-between text-xs">
                    <span>{model}</span>
                    <span style={{ color: "var(--text-faint)" }}>
                      {v.msgs} calls · {(v.tokens / 1000).toFixed(1)}k tok · ${((v.tokens / 1e6) * (PRICE_PER_M[model] ?? 2)).toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-0.5 h-1.5 rounded-full" style={{ background: "var(--hover)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(v.tokens / maxTok) * 100}%`, background: "var(--accent)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
