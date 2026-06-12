// ATLAS-BAR · GOAL-V3-ATLAS-BAR · brother ↔ THIS Atlas (Mac-mini bridge) on every page
// Glass UI (Apple liquid-glass) · collapsed pill bottom-center · open = side glass
// panel (page stays visible) · breath dot = bridge daemon heartbeat · honest
// sleeping state when bridge down · context-aware (sends current page).
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Send, X, Maximize2, Minimize2, Mic, Volume2, VolumeX } from "lucide-react";
import { sb } from "../lib/db";

interface RoomMsg {
  id: string;
  role: "brother" | "atlas";
  content: string;
  status: string;
  audio_path?: string | null;
  tts_path?: string | null;
  created_at: string;
}

function audioUrl(path: string): string {
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/room-audio/${path}`;
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
  const [recording, setRecording] = useState(false);
  const [voiceReply, setVoiceReply] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<number | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const playedRef = useRef<Set<string>>(new Set());

  const load = useCallback(async () => {
    const { data } = await sb()
      .from("atlas_room_messages")
      .select("id,role,content,status,audio_path,tts_path,created_at")
      .order("created_at", { ascending: false })
      .limit(60);
    const list = ((data ?? []) as RoomMsg[]).reverse();
    setMsgs(list);
    // auto-play fresh voice replies (last message · done · has tts · not yet played)
    const last = list[list.length - 1];
    if (last && last.role === "atlas" && last.status === "done" && last.tts_path && !playedRef.current.has(last.id)) {
      playedRef.current.add(last.id);
      if (Date.now() - new Date(last.created_at).getTime() < 2 * 60 * 1000) {
        void new Audio(audioUrl(last.tts_path)).play().catch(() => undefined);
      }
    }
  }, []);

  // push-to-talk · hold mic → record → release → upload → bridge does Whisper
  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4" });
      chunksRef.current = [];
      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType });
        if (blob.size < 1500) return; // accidental tap
        const ext = rec.mimeType.includes("mp4") ? "m4a" : "webm";
        const path = `brother/${crypto.randomUUID()}.${ext}`;
        const { error } = await sb().storage.from("room-audio").upload(path, blob, { contentType: rec.mimeType });
        if (error) return;
        await fetch("/api/room-send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: "🎙 (voice)", context: { page: pathname, audio_path: path, voice_reply: voiceReply } }),
        });
        void load();
      };
      recRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };

  const stopRec = () => {
    setRecording(false);
    recRef.current?.stop();
  };

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
              {m.audio_path && (
                <audio controls preload="none" src={audioUrl(m.audio_path)} style={{ height: 30, marginTop: 4, width: "100%" }} />
              )}
              {m.tts_path && (
                <audio controls preload="none" src={audioUrl(m.tts_path)} style={{ height: 30, marginTop: 4, width: "100%" }} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="atlas-glass-input">
        <button
          title={voiceReply ? "Voice replies ON" : "Voice replies off"}
          style={{ background: "transparent", color: voiceReply ? "#0a84ff" : "rgba(60,60,67,0.4)" }}
          onClick={() => setVoiceReply((v) => !v)}
        >
          {voiceReply ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button
          title="Hold to talk"
          style={{
            background: recording ? "#ff3b30" : "rgba(60,60,67,0.12)",
            color: recording ? "white" : "rgba(60,60,67,0.7)",
            transform: recording ? "scale(1.15)" : undefined,
            transition: "all 120ms ease",
          }}
          onMouseDown={() => void startRec()}
          onMouseUp={stopRec}
          onMouseLeave={() => recording && stopRec()}
          onTouchStart={(e) => { e.preventDefault(); void startRec(); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRec(); }}
        >
          <Mic size={15} />
        </button>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); }
          }}
          placeholder={recording ? "Listening… release to send" : awake ? "Talk to me…" : "I'm sleeping · message banks for wake"}
        />
        <button disabled={sending || !input.trim()} onClick={() => void send()}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
