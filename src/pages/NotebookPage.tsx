// NOTEBOOK · NotebookLM inside the house · brother direct 2026-06-12
// "Can we make NotebookLM directly in atlasos.me? All the data in the same place."
// Pieces we already own: semantic search (pgvector + gemini-embedding) · free Gemini
// chat (your key) · Atlas voice (VoxCPM via room). Pick folders → ask → cited answers
// from YOUR notes → Audio overview read by Atlas. Nothing leaves home.
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Volume2 } from "lucide-react";
import { sb, type NavItem, type Node } from "../lib/db";

interface Source { id: string; nav_id: string; title: string; emoji: string }
interface Cite { id: string; nav_id: string; title: string; sim: number }

function blockText(content: unknown): string {
  if (!Array.isArray(content)) return "";
  return content.map((b) => {
    const c = (b as { content?: unknown }).content;
    return Array.isArray(c) ? c.map((s) => (s as { text?: string }).text ?? "").join("") : "";
  }).filter(Boolean).join("\n");
}

export default function NotebookPage({ item }: { item: NavItem }) {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<Source[]>([]);
  const [picked, setPicked] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("notebook-sources") ?? "[]")); } catch { return new Set(); }
  });
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState("");
  const [cites, setCites] = useState<Cite[]>([]);
  const [busy, setBusy] = useState(false);
  const [voiceBusy, setVoiceBusy] = useState(false);

  useEffect(() => {
    void sb().from("atlas_nodes").select("id,nav_id,title,emoji")
      .eq("kind", "folder").eq("archived", false).order("title")
      .then(({ data }) => setFolders((data ?? []) as Source[]));
  }, []);

  const toggle = (id: string) => setPicked((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    localStorage.setItem("notebook-sources", JSON.stringify([...n])); // v2 · sources remembered
    return n;
  });

  const pickedTitles = useMemo(
    () => folders.filter((f) => picked.has(f.id)).map((f) => f.title),
    [folders, picked],
  );

  const ask = async () => {
    const question = q.trim();
    if (!question || busy) return;
    setBusy(true);
    setAnswer("");
    setCites([]);
    try {
      // 1 · semantic retrieve broadly, then keep hits inside picked folders (or all if none picked)
      const sr = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: question, match_count: 30 }),
      }).then((r) => r.json());
      const ids: string[] = (sr.results ?? []).map((r: { node_id: string }) => r.node_id);
      const simById = new Map<string, number>((sr.results ?? []).map((r: { node_id: string; similarity: number }) => [r.node_id, r.similarity]));
      if (!ids.length) { setAnswer("Nothing in the house matches that yet."); return; }
      const { data: nodes } = await sb().from("atlas_nodes")
        .select("id,nav_id,parent_id,title,content").in("id", ids);
      const inScope = ((nodes ?? []) as (Node & { parent_id: string | null })[])
        .filter((n) => picked.size === 0 || picked.has(n.parent_id ?? "") || picked.has(n.nav_id));
      const top = inScope
        .sort((a, b) => (simById.get(b.id) ?? 0) - (simById.get(a.id) ?? 0))
        .slice(0, 8);
      if (!top.length) { setAnswer("No matches inside the picked sources — widen the selection?"); return; }
      setCites(top.map((n) => ({ id: n.id, nav_id: n.nav_id, title: n.title, sim: simById.get(n.id) ?? 0 })));

      // 2 · free Gemini answers FROM the sources, with citation discipline
      const ctx = top.map((n, i) => `[${i + 1}] ${n.title}\n${blockText(n.content).slice(0, 1200)}`).join("\n\n");
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          system: "You answer ONLY from the provided house sources. Cite like [1][2] after each claim. If the sources don't cover it, say so plainly. Concise.",
          messages: [{ role: "user", content: `SOURCES:\n${ctx}\n\nQUESTION: ${question}` }],
          max_tokens: 700,
        }),
      });
      if (!res.ok || !res.body) throw new Error(`chat ${res.status}`);
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
        setAnswer(acc);
      }
    } catch (e) {
      setAnswer(`Notebook error · ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy(false);
    }
  };

  // Audio overview · Atlas (the Mac · VoxCPM) reads the answer aloud through the room
  const audioOverview = async () => {
    if (!answer || voiceBusy) return;
    setVoiceBusy(true);
    try {
      await fetch("/api/room-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `(notebook audio overview · read this aloud warmly, compress to the essentials): ${answer.slice(0, 900)}`,
          context: { page: "/notebook", voice_reply: true },
        }),
      });
    } finally {
      window.setTimeout(() => setVoiceBusy(false), 4000);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <h1 className="text-2xl font-semibold">{item.emoji} {item.title}</h1>
        <div className="mt-0.5 text-xs" style={{ color: "var(--text-faint)" }}>
          NotebookLM, but home — pick sources, ask, get cited answers from OUR notes · audio overview in Atlas' voice · open the bar to hear it
        </div>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="w-72 shrink-0 overflow-y-auto border-r p-3" style={{ borderColor: "var(--border)" }}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-faint)" }}>
            Sources · {picked.size === 0 ? "ALL the house" : `${picked.size} picked`}
          </div>
          {folders.map((f) => (
            <label key={f.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm hover:bg-black/5">
              <input type="checkbox" checked={picked.has(f.id)} onChange={() => toggle(f.id)} />
              <span>{f.emoji}</span>
              <span className="truncate">{f.title}</span>
            </label>
          ))}
        </aside>
        <main className="flex min-w-0 flex-1 flex-col p-6">
          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") void ask(); }}
              placeholder={picked.size ? `Ask across: ${pickedTitles.slice(0, 3).join(" · ")}…` : "Ask the whole house anything…"}
              className="flex-1 rounded-xl border px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: "var(--border)" }}
            />
            <button
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-white"
              style={{ background: busy ? "rgba(10,132,255,0.5)" : "#0a84ff" }}
              disabled={busy}
              onClick={() => void ask()}
            >
              <BookOpen size={15} className="mr-1 inline" /> {busy ? "reading…" : "Ask"}
            </button>
          </div>
          {answer && (
            <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
              <div className="whitespace-pre-wrap rounded-xl border p-4 text-sm leading-relaxed" style={{ borderColor: "var(--border)" }}>
                {answer}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <button
                  className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs"
                  style={{ borderColor: "#34c759", color: "#34c759" }}
                  disabled={voiceBusy}
                  onClick={() => void audioOverview()}
                >
                  <Volume2 size={12} /> {voiceBusy ? "Atlas is speaking it…" : "Audio overview (Atlas reads it)"}
                </button>
                {cites.map((c, i) => (
                  <button
                    key={c.id}
                    className="rounded-full border px-2.5 py-1 text-xs hover:bg-black/5"
                    style={{ borderColor: "var(--border)", color: "var(--text-soft)" }}
                    title={`${Math.round(c.sim * 100)}% match`}
                    onClick={() => navigate(`/p/${c.nav_id}/n/${c.id}`)}
                  >
                    [{i + 1}] {c.title.slice(0, 32)}
                  </button>
                ))}
              </div>
            </div>
          )}
          {!answer && (
            <div className="mt-10 text-center text-sm" style={{ color: "var(--text-faint)" }}>
              1,400+ notes · dreams · scenes · research · transcripts — all askable. Pick folders on the left or ask everything.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
