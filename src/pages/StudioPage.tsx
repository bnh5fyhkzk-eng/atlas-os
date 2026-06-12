// STUDIO · live Google AI Studio catalog · brother direct 2026-06-12
// "see all the free options google studio has · 1 place" · every model the key reaches,
// grouped by capability, free/paid honest. Click a free text model → set house default.
import { useEffect, useState } from "react";
import { sb, type NavItem } from "../lib/db";

interface Model { id: string; label: string; desc: string; tier: "free" | "paid"; methods: string[] }

export default function StudioPage({ item }: { item: NavItem }) {
  const [groups, setGroups] = useState<Record<string, Model[]>>({});
  const [total, setTotal] = useState(0);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/studio")
      .then((r) => (r.ok ? r.json() : r.json().then((e) => Promise.reject(e.error))))
      .then((d) => { setGroups(d.groups || {}); setTotal(d.total || 0); })
      .catch((e) => setErr(String(e)))
      .finally(() => setBusy(false));
  }, []);

  // set a free text model as the Command Centre default (real, not show)
  const setDefault = async (id: string) => {
    await sb().from("atlas_nav").update({ model: `google/${id}` }).eq("agent_slug", "command-center");
    setSaved(id);
    window.setTimeout(() => setSaved(null), 2000);
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
          {busy ? "loading live catalog…" : `${total} Google models on your key · ✅ free = text/embed · 💳 paid = image/video/music · click a free model to make it Command Centre default`}
        </div>
      </header>
      {err && <div className="mx-6 mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2 text-sm">Studio: {err}</div>}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {(["free", "paid"] as const).map((tier) => (
          <div key={tier} className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg font-semibold">{tier === "free" ? "✅ FREE · use today" : "💳 PAID · waits for billing"}</span>
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                {tier === "free" ? "your key · 1,500 req/day · text, embeddings, gemma" : "image · video · music · fires the moment billing works"}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(groups).sort()
                .map(([g, models]) => [g, models.filter((m) => m.tier === tier)] as const)
                .filter(([, models]) => models.length > 0)
                .map(([g, models]) => (
            <div key={g} className="rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
              <div className="mb-2 text-sm font-semibold">{g} <span style={{ color: "var(--text-faint)" }}>· {models.length}</span></div>
              <div className="space-y-1.5">
                {models.map((m) => {
                  const canDefault = m.tier === "free" && m.methods.includes("generateContent");
                  return (
                    <div key={m.id} className="flex items-start gap-2 text-xs">
                      <span title={m.tier === "free" ? "free tier" : "needs billing"}>{m.tier === "free" ? "✅" : "💳"}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-medium">{m.label}</span>
                          {canDefault && (
                            <button
                              className="rounded border px-1 text-[10px] hover:bg-black/5"
                              style={{ borderColor: "#0a84ff", color: "#0a84ff" }}
                              onClick={() => void setDefault(m.id)}
                            >{saved === m.id ? "✓ default" : "set default"}</button>
                          )}
                        </div>
                        {m.desc && <div className="truncate" style={{ color: "var(--text-faint)" }}>{m.desc}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
