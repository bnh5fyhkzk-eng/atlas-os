import { readJson } from "@/lib/data";
import { KanbanLive } from "@/components/KanbanLive";

export const dynamic = "force-dynamic";

type Arm = {
  name: string;
  emoji?: string;
  role: string;
  where?: string;
  status: string;
  last_fire?: string;
  tools_researched?: number;
  next_action?: string;
  blockers?: string[];
  color?: string;
  last_brain_bank?: string;
  deal_state?: string;
  open_questions?: string;
  version?: string;
  bug?: string;
  action_taken?: string;
};

type ArmsData = {
  generated_at?: string;
  castle_canon?: string;
  arms: Arm[];
};

function statusClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("live") || s.includes("healthy") || s.includes("producing")) {
    return "text-emerald-400 border-emerald-500/40";
  }
  if (s.includes("paused") || s.includes("bug") || s.includes("crash")) {
    return "text-rose-400 border-rose-500/40";
  }
  return "text-neutral-400 border-neutral-700";
}

export default async function ArmsPage() {
  const data = await readJson<ArmsData>("arms.json");

  return (
    <main className="min-h-screen bg-black text-neutral-300">
      <div className="max-w-5xl mx-auto px-6 py-10 md:px-10 md:py-14">
        <header className="mb-10 border-b border-neutral-800 pb-6">
          <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-500">arms · octopus-fleet</div>
          <h1 className="mt-2 text-3xl font-light text-neutral-100">distributed body</h1>
          <p className="mt-2 text-sm text-neutral-500">
            each arm own perception · main-brain sovereign · per #27360 octopus-add-not-merge
          </p>
        </header>

        {data && data.arms?.length ? (
          <section className="mb-12">
            <h2 className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4">
              arms · {data.arms.length} live
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {data.arms.map((arm) => {
                const cls = statusClass(arm.status);
                return (
                  <li
                    key={arm.name}
                    className={`rounded border ${cls.split(" ")[1]} bg-neutral-950/40 p-5 hover:bg-neutral-950/60 transition-colors`}
                  >
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="text-lg text-neutral-100">
                        {arm.emoji ? `${arm.emoji} ` : ""}{arm.name}
                      </h3>
                      <span className={`text-[10px] uppercase tracking-wider ${cls.split(" ")[0]}`}>
                        {arm.status}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 mb-3 leading-relaxed">{arm.role}</p>
                    <dl className="space-y-1 text-xs">
                      {arm.where && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">where</dt>
                          <dd className="text-neutral-400 flex-1">{arm.where}</dd>
                        </div>
                      )}
                      {arm.last_fire && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">last fire</dt>
                          <dd className="text-neutral-400 flex-1">{arm.last_fire}</dd>
                        </div>
                      )}
                      {arm.deal_state && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">deal</dt>
                          <dd className="text-amber-300 flex-1">{arm.deal_state}</dd>
                        </div>
                      )}
                      {arm.next_action && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">next</dt>
                          <dd className="text-neutral-400 flex-1">{arm.next_action}</dd>
                        </div>
                      )}
                      {arm.open_questions && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">open Q</dt>
                          <dd className="text-amber-200 flex-1">{arm.open_questions}</dd>
                        </div>
                      )}
                      {arm.bug && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">bug</dt>
                          <dd className="text-rose-300 flex-1">{arm.bug}</dd>
                        </div>
                      )}
                      {arm.action_taken && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">action</dt>
                          <dd className="text-neutral-400 flex-1">{arm.action_taken}</dd>
                        </div>
                      )}
                      {arm.tools_researched != null && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">tools</dt>
                          <dd className="text-neutral-400 flex-1">{arm.tools_researched} researched</dd>
                        </div>
                      )}
                      {arm.version && (
                        <div className="flex gap-2">
                          <dt className="text-neutral-600 w-24">version</dt>
                          <dd className="text-neutral-500 flex-1">{arm.version}</dd>
                        </div>
                      )}
                    </dl>
                    {arm.blockers && arm.blockers.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-neutral-800">
                        <div className="text-[10px] uppercase tracking-wider text-rose-400 mb-1">blockers</div>
                        <ul className="text-xs text-rose-300 space-y-0.5">
                          {arm.blockers.map((b) => (
                            <li key={b}>· {b}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {arm.last_brain_bank && (
                      <div className="mt-3 text-[10px] text-neutral-600">
                        last brain bank · {arm.last_brain_bank}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <p className="text-sm text-neutral-600 italic mb-12">no arm-data yet · sync script not run</p>
        )}

        <KanbanLive />

        {data?.castle_canon && (
          <footer className="mt-12 pt-6 border-t border-neutral-800 text-xs text-neutral-600">
            {data.castle_canon}
            {data.generated_at && <span className="ml-2">· refreshed {new Date(data.generated_at).toLocaleString("fr-CA")}</span>}
          </footer>
        )}
      </div>
    </main>
  );
}
