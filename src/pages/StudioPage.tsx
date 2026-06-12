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
  // STUDIO v3 · MAKE things, not just browse them (brother direct 2026-06-12 15:25)
  const [makerModel, setMakerModel] = useState<string | null>(null);
  const [makerPrompt, setMakerPrompt] = useState("");
  const [makerOut, setMakerOut] = useState("");
  const [making, setMaking] = useState(false);
  const [filed, setFiled] = useState(false);

  const make = async () => {
    if (!makerModel || !makerPrompt.trim() || making) return;
    setMaking(true);
    setMakerOut("");
    setFiled(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: `google/${makerModel}`, messages: [{ role: "user", content: makerPrompt }], max_tokens: 1200 }),
      });
      if (!res.ok || !res.body) throw new Error(`${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value, { stream: true }).split("\n")) {
          const t = line.trim();
          if (!t.startsWith("data:") || t.includes("[DONE]")) continue;
          try { acc += JSON.parse(t.slice(5))?.choices?.[0]?.delta?.content ?? ""; } catch { /* keepalive */ }
        }
        setMakerOut(acc);
      }
    } catch (e) {
      setMakerOut(`make failed · ${e instanceof Error ? e.message : e}`);
    } finally {
      setMaking(false);
    }
  };

  const fileIt = async () => {
    if (!makerOut || filed) return;
    // Studio outputs folder under this Studio nav · made things LIVE in the house
    const { data: f } = await sb().from("atlas_nodes").select("id")
      .eq("nav_id", item.id).eq("title", "Studio outputs").eq("kind", "folder").eq("archived", false).maybeSingle();
    let fid = f?.id as string | undefined;
    if (!fid) {
      const { data: nf } = await sb().from("atlas_nodes")
        .insert({ nav_id: item.id, kind: "folder", title: "Studio outputs", emoji: "🎁", created_by: "studio" })
        .select("id").single();
      fid = nf?.id;
    }
    await sb().from("atlas_nodes").insert({
      nav_id: item.id, parent_id: fid, kind: "note",
      title: makerPrompt.slice(0, 60), emoji: "🎨", created_by: `studio:${makerModel}`,
      content: makerOut.split(/\n+/).filter(Boolean).slice(0, 80)
        .map((l) => ({ type: "paragraph", content: [{ type: "text", text: l, styles: {} }] })),
    });
    setFiled(true);
  };

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
      {makerModel && (
        <div className="mx-6 mt-3 rounded-xl border p-3" style={{ borderColor: "#448361" }}>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span className="font-semibold">🎨 Making with {makerModel}</span>
            <button className="ml-auto text-xs" style={{ color: "var(--text-faint)" }} onClick={() => setMakerModel(null)}>✕ close</button>
          </div>
          <div className="flex gap-2">
            <input
              autoFocus
              value={makerPrompt}
              onChange={(e) => setMakerPrompt(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") void make(); }}
              placeholder="What should it make? · Enter"
              className="flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
            />
            <button className="rounded-lg px-3 py-1.5 text-sm text-white" style={{ background: making ? "rgba(68,131,97,0.5)" : "#448361" }} disabled={making} onClick={() => void make()}>
              {making ? "making…" : "Make"}
            </button>
          </div>
          {makerOut && (
            <div className="mt-2">
              <div className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg border p-2 text-xs" style={{ borderColor: "var(--border)" }}>{makerOut}</div>
              <button className="mt-1.5 rounded-lg border px-2.5 py-1 text-xs" style={{ borderColor: "#0a84ff", color: "#0a84ff" }} onClick={() => void fileIt()}>
                {filed ? "✓ filed in Studio outputs" : "💾 file it in the house"}
              </button>
            </div>
          )}
        </div>
      )}
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
                            <>
                              <button
                                className="rounded border px-1 text-[10px] hover:bg-black/5"
                                style={{ borderColor: "#448361", color: "#448361" }}
                                onClick={() => { setMakerModel(m.id); setMakerOut(""); }}
                              >▶ make</button>
                              <button
                                className="rounded border px-1 text-[10px] hover:bg-black/5"
                                style={{ borderColor: "#0a84ff", color: "#0a84ff" }}
                                onClick={() => void setDefault(m.id)}
                              >{saved === m.id ? "✓ default" : "set default"}</button>
                            </>
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
