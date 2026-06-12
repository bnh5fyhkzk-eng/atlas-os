// Providers · V5-A · paste once · encrypted server-side · native-first routing
import { useEffect, useState } from "react";
import { Check, X, Loader2, Plug } from "lucide-react";
import type { NavItem } from "../lib/db";

const LABELS: Record<string, { name: string; hint: string }> = {
  openai: { name: "OpenAI (ChatGPT)", hint: "sk-…" },
  google: { name: "Google (Gemini)", hint: "AIza…" },
  xai: { name: "xAI (Grok)", hint: "xai-…" },
  openrouter: { name: "OpenRouter", hint: "sk-or-…" },
};

interface Row { provider: string; connected: boolean; hint: string }

export default function ProvidersPage({ item }: { item: NavItem }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [state, setState] = useState<Record<string, "idle" | "saving" | "testing" | "ok" | "fail">>({});

  const reload = () =>
    fetch("/api/providers").then((r) => r.json()).then((j) => setRows(j.providers ?? [])).catch(() => undefined);
  useEffect(() => { void reload(); }, []);

  const save = async (p: string) => {
    const key = (inputs[p] ?? "").trim();
    if (!key) return;
    setState((s) => ({ ...s, [p]: "saving" }));
    const r = await fetch("/api/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: p, key }),
    });
    if (!r.ok) { setState((s) => ({ ...s, [p]: "fail" })); return; }
    setInputs((i) => ({ ...i, [p]: "" }));
    await test(p);
    void reload();
  };

  const test = async (p: string) => {
    setState((s) => ({ ...s, [p]: "testing" }));
    const r = await fetch("/api/providers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: p, action: "test" }),
    });
    const j = await r.json().catch(() => ({ ok: false }));
    setState((s) => ({ ...s, [p]: j.ok ? "ok" : "fail" }));
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 px-6 py-4 backdrop-blur md:px-10" style={{ background: "rgba(255,255,255,0.94)", borderBottom: "1px solid var(--border)" }}>
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
          Paste once · encrypted server-side · chats use your key first (cheaper) · OpenRouter fallback
        </div>
      </header>
      <div className="mx-auto max-w-2xl space-y-3 px-6 py-6 md:px-10">
        {rows.map((r) => {
          const st = state[r.provider] ?? "idle";
          return (
            <div key={r.provider} className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2">
                <Plug size={15} style={{ color: r.connected ? "#448361" : "var(--text-faint)" }} />
                <span className="flex-1 text-sm font-medium">{LABELS[r.provider]?.name ?? r.provider}</span>
                {r.connected && (
                  <span className="rounded-full px-2 py-0.5 text-xs" style={{ background: "rgba(68,131,97,0.12)", color: "#448361" }}>
                    connected {r.hint}
                  </span>
                )}
                {st === "ok" && <Check size={15} style={{ color: "#448361" }} />}
                {st === "fail" && <X size={15} style={{ color: "#c4554d" }} />}
                {(st === "saving" || st === "testing") && <Loader2 size={15} className="animate-spin" style={{ color: "var(--text-faint)" }} />}
              </div>
              <div className="mt-2 flex gap-2">
                <input
                  type="password"
                  value={inputs[r.provider] ?? ""}
                  onChange={(e) => setInputs((i) => ({ ...i, [r.provider]: e.target.value }))}
                  onKeyDown={(e) => { if (e.key === "Enter") void save(r.provider); }}
                  placeholder={r.connected ? "replace key…" : `paste ${LABELS[r.provider]?.hint ?? "key"}`}
                  className="flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none"
                  style={{ borderColor: "var(--border)" }}
                />
                <button
                  className="rounded-lg px-3 py-1.5 text-sm text-white disabled:opacity-30"
                  style={{ background: "var(--text)" }}
                  disabled={!(inputs[r.provider] ?? "").trim() || st === "saving"}
                  onClick={() => void save(r.provider)}
                >
                  Save
                </button>
                {r.connected && (
                  <button
                    className="rounded-lg border px-3 py-1.5 text-sm"
                    style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
                    onClick={() => void test(r.provider)}
                  >
                    Test
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
