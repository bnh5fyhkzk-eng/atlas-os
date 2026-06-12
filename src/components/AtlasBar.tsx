// ATLAS-BAR · GOAL-V3-ATLAS-BAR · brother ↔ THIS Atlas (Mac-mini bridge) on every page
// Glass UI (Apple liquid-glass) · collapsed pill bottom-center · open = side glass
// panel (page stays visible) · breath dot = bridge daemon heartbeat · honest
// sleeping state when bridge down · context-aware (sends current page).
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Send, X, Maximize2, Minimize2 } from "lucide-react";
import { sb } from "../lib/db";

interface RoomMsg {
  id: string;
  role: "brother" | "atlas";
  content: string;
  status: string;
  created_at: string;
}

const AWAKE_MS = 90_000; // heartbeat every 30s · stale after 90s

export function AtlasBar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [msgs, setMsgs] = useState<RoomMsg[]>([]);
  const [input, setInput] = useState("");
  const [awake, setAwake] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<number | null>(null);

  const load = useCallback(async () => {
    const { data } = await sb()
      .from("atlas_room_messages")
      .select("id,role,content,status,created_at")
      .order("created_at", { ascending: false })
      .limit(60);
    setMsgs(((data ?? []) as RoomMsg[]).reverse());
  }, []);

  const checkPresence = useCallback(async () => {
    const { data } = await sb().from("atlas_presence").select("last_seen").eq("id", "room-bridge").maybeSingle();
    setAwake(data ? Date.now() - new Date(data.last_seen).getTime() < AWAKE_MS : false);
  }, []);

  // presence always (breath dot on collapsed pill too)
  useEffect(() => {
    void checkPresence();
    const t = window.setInterval(() => void checkPresence(), 20_000);
    return () => window.clearInterval(t);
  }, [checkPresence]);

  // messages when open · realtime + poll fallback
  useEffect(() => {
    if (!open) return;
    void load();
    const ch = sb()
      .channel(`room-${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "atlas_room_messages" }, () => void load())
      .subscribe();
    pollRef.current = window.setInterval(() => void load(), 2500);
    return () => {
      void sb().removeChannel(ch);
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [open, load]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    try {
      await fetch("/api/room-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, context: { page: pathname } }),
      });
      void load();
    } finally {
      setSending(false);
    }
  };

  const dot = (
    <span
      className="breath-dot"
      style={{ background: awake ? "#34c759" : "rgba(120,120,128,0.5)" }}
      title={awake ? "Atlas awake · Mac mini bridge live" : "Atlas sleeping · messages bank · answers on wake"}
    />
  );

  if (!open) {
    return (
      <button className="atlas-pill" onClick={() => setOpen(true)}>
        {dot}
        <span className="text-sm font-medium">Atlas</span>
        <span className="text-xs" style={{ color: "rgba(60,60,67,0.6)" }}>
          {awake ? "here · ⌘J" : "sleeping · leave a note"}
        </span>
      </button>
    );
  }

  return (
    <div className={"atlas-glass" + (full ? " full" : "")}>
      <div className="atlas-glass-head">
        {dot}
        <span className="text-sm font-semibold">Atlas</span>
        <span className="flex-1 truncate text-xs" style={{ color: "rgba(60,60,67,0.6)" }}>
          {awake ? "Mac mini · live" : "sleeping · I'll answer on wake"}
        </span>
        <button onClick={() => setFull((v) => !v)} title={full ? "Side panel" : "Full screen"}>
          {full ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        <button onClick={() => setOpen(false)} title="Collapse">
          <X size={16} />
        </button>
      </div>

      <div className="atlas-glass-body">
        {msgs.length === 0 && (
          <div className="pt-10 text-center text-sm" style={{ color: "rgba(60,60,67,0.55)" }}>
            Our room · everything stays
          </div>
        )}
        {msgs.map((m) => (
          <div key={m.id} className={"flex " + (m.role === "brother" ? "justify-end" : "justify-start")}>
            <div className={"atlas-bubble " + (m.role === "brother" ? "mine" : "his")}>
              {m.content || (m.status === "pending" || m.status === "processing" ? "…" : "")}
              {m.status === "streaming" && <span className="atlas-cursor">▍</span>}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="atlas-glass-input">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
          }}
          placeholder={awake ? "Talk to me…" : "I'm sleeping · message banks for wake"}
        />
        <button disabled={sending || !input.trim()} onClick={() => void send()}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
