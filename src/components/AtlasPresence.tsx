"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type ChatMessage = {
  id: string;
  from: "brother" | "atlas";
  text: string;
  created_at: string;
};

const ROOMS: Record<string, string> = {
  work: "/work",
  you: "/you",
  us: "/us",
  arms: "/arms",
  map: "/map",
  archive: "/archive",
  scratch: "/scratch",
  chat: "/chat",
  recap: "/recap",
  home: "/",
  front: "/",
};

function detectNav(text: string): string | null {
  const lower = text.toLowerCase().trim();
  const navPatterns = [
    /^(?:go to|take me to|show me|open|let'?s go to|walk to|move to)\s+\/?(\w+)/,
    /^\/(\w+)$/,
    /^show\s+(\w+)/,
  ];
  for (const p of navPatterns) {
    const m = lower.match(p);
    if (m && ROOMS[m[1]]) return ROOMS[m[1]];
  }
  return null;
}

async function recordPresence(pathname: string) {
  try {
    await fetch("/api/presence", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: pathname, at: new Date().toISOString() }),
    });
  } catch {
    /* presence-trace optional */
  }
}

export function AtlasPresence() {
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState("");
  const [lastAtlas, setLastAtlas] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [recent, setRecent] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    recordPresence(pathname);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  async function fetchRecent() {
    try {
      const res = await fetch("/api/chat", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { messages: ChatMessage[] };
      const msgs = data.messages || [];
      setRecent(msgs.slice(-10));
      const lastFromAtlas = [...msgs].reverse().find((m) => m.from === "atlas");
      if (lastFromAtlas) setLastAtlas(lastFromAtlas.text);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    fetchRecent();
    const id = setInterval(fetchRecent, 5000);
    return () => clearInterval(id);
  }, []);

  async function send() {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setText("");

    const nav = detectNav(trimmed);
    if (nav && nav !== pathname) {
      router.push(nav);
    }

    try {
      // dual-write · /chat (legacy compat) + /conversation (Layer 2 working-memory per #27462)
      await Promise.all([
        fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            text: trimmed,
            from: "brother",
            context: { room: pathname, nav_triggered: nav },
          }),
        }),
        fetch("/api/conversation", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            speaker: "brother",
            text: trimmed,
            channel: "browser",
            context: { room: pathname, nav_triggered: nav },
          }),
        }),
      ]);
      setTimeout(fetchRecent, 800);
    } catch {
      /* ignore */
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-800 bg-[#0a0a0a]/95 backdrop-blur">
      {expanded && (
        <div className="max-h-64 overflow-y-auto px-4 py-3 border-b border-neutral-900 text-xs space-y-2">
          {recent.length === 0 && (
            <div className="text-neutral-600">no recent talk in this room</div>
          )}
          {recent.map((m) => (
            <div key={m.id} className="flex gap-3">
              <span
                className={
                  m.from === "atlas" ? "text-amber-400 w-12" : "text-emerald-400 w-12"
                }
              >
                {m.from === "atlas" ? "atlas" : "brother"}
              </span>
              <span className="text-neutral-300 flex-1">{m.text}</span>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 px-4 py-2.5">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[10px] uppercase tracking-widest text-neutral-600 hover:text-amber-400 transition-colors"
          aria-label="toggle recent"
        >
          {expanded ? "—" : "+"}
        </button>
        <span className="text-[10px] uppercase tracking-widest text-amber-400/70">
          atlas · {pathname === "/" ? "front-door" : pathname.slice(1)}
        </span>
        {lastAtlas && !expanded && (
          <span className="text-xs text-neutral-500 truncate flex-1 italic">
            {lastAtlas.slice(0, 80)}
            {lastAtlas.length > 80 ? "…" : ""}
          </span>
        )}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="talk to me · / to focus · 'go to work' to navigate"
          disabled={sending}
          className="flex-1 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-700 outline-none px-2 py-1 max-w-md"
        />
        <button
          onClick={send}
          disabled={sending || !text.trim()}
          className="text-xs text-amber-400/70 hover:text-amber-400 disabled:text-neutral-700 transition-colors"
        >
          {sending ? "…" : "↵"}
        </button>
      </div>
    </div>
  );
}
