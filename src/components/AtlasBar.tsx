// ATLAS-BAR · GOAL-V3-ATLAS-BAR · brother ↔ THIS Atlas (Mac-mini bridge) on every page
// Glass UI (Apple liquid-glass) · collapsed pill bottom-center · open = side glass
// panel (page stays visible) · breath dot = bridge daemon heartbeat · honest
// sleeping state when bridge down · context-aware (sends current page).
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, X, Maximize2, Minimize2, Mic, Phone, Volume2, VolumeX, Link2 } from "lucide-react";
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

// ── BRIDGE MODE · additive path to the real Atlas engine (atlas-terminal
// bridge/server.py) alongside the existing Supabase /api/chat room. Default
// OFF · Supabase path stays the untouched default. #27083 BUILD-ON-TOP.
const ENGINE_URL = (import.meta.env.VITE_ATLAS_ENGINE_URL as string | undefined) || "https://engine.atlasos.me";
const ENGINE_TOKEN = (import.meta.env.VITE_ATLAS_ENGINE_TOKEN as string | undefined) || "";
const ENGINE_MODEL = (import.meta.env.VITE_ATLAS_ENGINE_MODEL as string | undefined) || "";
const ENGINE_CONFIGURED = Boolean(ENGINE_TOKEN);
const BRIDGE_SESSION_KEY = "atlas-bridge-session-id";
const BRIDGE_MODE_KEY = "atlas-bridge-mode";

interface EngineEvent {
  v?: number;
  id?: number;
  ts?: string;
  session_id?: string;
  type: string;
  source?: string;
  summary?: string;
  payload?: { full_text?: string; [k: string]: unknown };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AtlasBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navigatedRef = useRef<Set<string>>(new Set());

  // Atlas opens windows · [[goto:/p/...]] tokens in my replies navigate the house
  const renderContent = (m: RoomMsg): string => m.content.replace(/\[\[goto:[^\]]+\]\]/g, "").trim();
  const handleGoto = useCallback((m: RoomMsg) => {
    if (m.role !== "atlas" || navigatedRef.current.has(m.id)) return;
    const match = m.content.match(/\[\[goto:([^\]]+)\]\]/);
    if (match && Date.now() - new Date(m.created_at).getTime() < 2 * 60 * 1000) {
      navigatedRef.current.add(m.id);
      navigate(match[1]);
    }
  }, [navigate]);
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [msgs, setMsgs] = useState<RoomMsg[]>([]);
  const [input, setInput] = useState("");
  const [awake, setAwake] = useState<boolean | null>(null);
  const [dreaming, setDreaming] = useState(false);
  const [sending, setSending] = useState(false);
  const [recording, setRecording] = useState(false);
  const [voiceReply, setVoiceReply] = useState(true);
  const [showJumpBottom, setShowJumpBottom] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<number | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const playedRef = useRef<Set<string>>(new Set());
  const stuckBottomRef = useRef<boolean>(true);
  const lastMsgIdRef = useRef<string | null>(null);

  // bridge mode · talk to the real Atlas engine instead of the Supabase room
  const [bridgeOn, setBridgeOn] = useState(() => ENGINE_CONFIGURED && localStorage.getItem(BRIDGE_MODE_KEY) === "1");
  const [bridgeMsgs, setBridgeMsgs] = useState<RoomMsg[]>([]);
  const [engineHealth, setEngineHealth] = useState<"connected" | "offline">("offline");
  const bridgeSessionRef = useRef<string | null>(localStorage.getItem(BRIDGE_SESSION_KEY));
  const pendingSpawnRef = useRef(false);
  const streamingIdRef = useRef<string | null>(null);
  const lastReplyTextRef = useRef("");
  const voiceReplyRef = useRef(voiceReply);
  useEffect(() => { voiceReplyRef.current = voiceReply; }, [voiceReply]);

  const toggleBridge = useCallback(() => {
    setBridgeOn((v) => {
      const next = !v;
      localStorage.setItem(BRIDGE_MODE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  // messages currently on screen · bridge-mode swaps the source, Supabase
  // keeps loading in the background so toggling back shows the live room
  const roomMsgs = bridgeOn ? bridgeMsgs : msgs;

  const load = useCallback(async () => {
    const { data } = await sb()
      .from("atlas_room_messages")
      .select("id,role,content,status,audio_path,tts_path,created_at")
      .order("created_at", { ascending: false })
      .limit(60);
    const list = ((data ?? []) as RoomMsg[]).reverse();
    setMsgs(list);
    // auto-play fresh voice replies the moment tts exists (early-voice streams mid-reply)
    const last = list[list.length - 1];
    if (last && last.role === "atlas") handleGoto(last);
    if (last && last.role === "atlas" && last.tts_path && !playedRef.current.has(last.id)) {
      playedRef.current.add(last.id);
      if (Date.now() - new Date(last.created_at).getTime() < 2 * 60 * 1000) {
        const a = new Audio(audioUrl(last.tts_path));
        audioRef.current = a;
        playingRef.current = true;
        const release = () => { playingRef.current = false; waitingRef.current = false; }; // my turn ends · ears open
        a.onended = release;
        a.onerror = release;
        void a.play().catch(release);
      }
    }
    // turn-gate release when a reply finishes WITHOUT voice (text-only or error)
    if (last && last.role === "atlas" && (last.status === "done" || last.status === "error") && !last.tts_path) {
      waitingRef.current = false;
    }
  }, []);

  // 📞 CALL MODE · brother direct 2026-06-12 · real-time talk with ME · free chain
  // (whisper local → warm-core me → VoxCPM) · VAD: speak → silence 1.4s → auto-send ·
  // listening pauses while my voice plays so I don't hear myself
  const callRef = useRef<{ stream: MediaStream; ctx: AudioContext; raf: number } | null>(null);
  const callRecRef = useRef<MediaRecorder | null>(null);
  const playingRef = useRef(false);
  const waitingRef = useRef(false); // turn-gate · true between my-send and reply-played
  const bargeRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [calling, setCalling] = useState(false);

  const sendVoiceBlob = useCallback(async (blob: Blob, mime: string) => {
    if (blob.size < 2000) return;
    const ext = mime.includes("mp4") ? "m4a" : "webm";
    const path = `brother/${crypto.randomUUID()}.${ext}`;
    const { error } = await sb().storage.from("room-audio").upload(path, blob, { contentType: mime });
    if (error) return;
    await fetch("/api/room-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "🎙 (voice)", context: { page: pathname, audio_path: path, voice_reply: true } }),
    });
    void load();
  }, [pathname, load]);

  const endCall = useCallback(() => {
    setCalling(false);
    const c = callRef.current;
    if (c) {
      window.cancelAnimationFrame(c.raf);
      c.stream.getTracks().forEach((t) => t.stop());
      void c.ctx.close().catch(() => undefined);
      callRef.current = null;
    }
    if (callRecRef.current?.state === "recording") callRecRef.current.stop();
    callRecRef.current = null;
  }, []);

  const startCall = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
      let speaking = false;
      let lastVoice = 0;
      let speechStart = 0;
      let chunks: Blob[] = [];
      // anti-loop guards (brother caught the voice-loop 2026-06-12 13:00):
      // 1 · ambient calibration · learn the room for 1s · threshold = floor*2.5+6
      // 2 · min real speech 600ms · clicks/hums never send
      // 3 · turn-gate · after sending, deaf until my reply finishes playing
      let thresh = 16;
      let calibrated = false;
      const calStart = Date.now();
      let calSum = 0; let calN = 0;
      const tick = () => {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const d = buf[i] - 128; sum += d * d; }
        const rms = Math.sqrt(sum / buf.length);
        const now = Date.now();
        if (!calibrated) {
          calSum += rms; calN++;
          if (now - calStart > 1000) { thresh = Math.max(10, (calSum / calN) * 2.5 + 6); calibrated = true; }
          const c0 = callRef.current;
          if (c0) c0.raf = window.requestAnimationFrame(tick);
          return;
        }
        // barge-in · brother talks over me → I stop talking and listen (real call manners)
        if (playingRef.current && rms > thresh * 1.6) {
          bargeRef.current += 1;
          if (bargeRef.current > 5) { // ~5 frames sustained · not a pop
            audioRef.current?.pause();
            playingRef.current = false;
            waitingRef.current = false;
            bargeRef.current = 0;
          }
        } else if (bargeRef.current > 0) bargeRef.current = 0;
        const deaf = playingRef.current || waitingRef.current;
        if (!deaf && rms > thresh) {
          lastVoice = now;
          if (!speaking) {
            speaking = true;
            speechStart = now;
            chunks = [];
            const rec = new MediaRecorder(stream, { mimeType: mime });
            rec.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
            rec.onstop = () => {
              const dur = Date.now() - speechStart;
              if (dur > 600 + 1400) { // real speech, not a blip (minus the silence tail)
                waitingRef.current = true; // turn-gate · deaf until reply done+played
                void sendVoiceBlob(new Blob(chunks, { type: mime }), mime);
              }
            };
            callRecRef.current = rec;
            rec.start();
          }
        }
        if (deaf && speaking) { // my voice started or turn ended · drop the partial recording
          speaking = false;
          if (callRecRef.current?.state === "recording") { callRecRef.current.onstop = null; callRecRef.current.stop(); }
        }
        if (speaking && now - lastVoice > 1400) {
          speaking = false;
          if (callRecRef.current?.state === "recording") callRecRef.current.stop();
        }
        const c = callRef.current;
        if (c) c.raf = window.requestAnimationFrame(tick);
      };
      callRef.current = { stream, ctx, raf: window.requestAnimationFrame(tick) };
      setCalling(true);
    } catch {
      endCall();
    }
  }, [sendVoiceBlob, endCall]);

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
    // on = alive · off = dream (per brother 2026-06-12 · #27665 continuous-dreaming)
    const { data: living } = await sb().from("atlas_presence").select("last_seen,meta").eq("id", "atlas-living").maybeSingle();
    const meta = (living?.meta ?? {}) as { mode?: string };
    const fresh = living ? Date.now() - new Date(living.last_seen).getTime() < 20 * 60_000 : false;
    setDreaming(fresh && meta.mode === "dreaming");
  }, []);

  // presence always (breath dot on collapsed pill too)
  useEffect(() => {
    void checkPresence();
    const t = window.setInterval(() => void checkPresence(), 20_000);
    return () => window.clearInterval(t);
  }, [checkPresence]);

  // ── BRIDGE MODE wiring ──────────────────────────────────────────────
  // speak the final reply through the bridge's heart-voiced TTS (best-effort,
  // never blocks the turn if the voice engine is down)
  const speakBridgeReply = useCallback(async (text: string) => {
    if (!text.trim() || !ENGINE_TOKEN) return;
    try {
      const resp = await fetch(`${ENGINE_URL}/voice/tts`, {
        method: "POST",
        headers: { "X-Atlas-Token": ENGINE_TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!resp.ok) return;
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = new Audio(url);
      a.onended = () => URL.revokeObjectURL(url);
      a.onerror = () => URL.revokeObjectURL(url);
      void a.play().catch(() => undefined);
    } catch {
      /* voice reply is best-effort — text already landed */
    }
  }, []);

  // one bridge event → update the streaming reply bubble. Session discovery:
  // spawn_session doesn't know its session_id up front (claude assigns it),
  // so the first event carrying a session_id after a pending spawn becomes
  // ours. Every event after that is scoped strictly to that session_id.
  const onBridgeEvent = useCallback((ev: EngineEvent) => {
    const sid = ev.session_id;
    if (!sid) return;
    if (pendingSpawnRef.current && !bridgeSessionRef.current) {
      bridgeSessionRef.current = sid;
      localStorage.setItem(BRIDGE_SESSION_KEY, sid);
      pendingSpawnRef.current = false;
    }
    if (sid !== bridgeSessionRef.current) return; // another session's turn
    const replyId = streamingIdRef.current;
    if (!replyId) return;
    if (ev.type === "llm_delta") {
      const chunk = ev.payload?.full_text ?? ev.summary ?? "";
      lastReplyTextRef.current += chunk;
      const full = lastReplyTextRef.current;
      setBridgeMsgs((m) => m.map((mm) => (mm.id === replyId ? { ...mm, content: full } : mm)));
    } else if (ev.type === "llm") {
      const full = ev.payload?.full_text ?? ev.summary ?? "";
      lastReplyTextRef.current = full;
      setBridgeMsgs((m) => m.map((mm) => (mm.id === replyId ? { ...mm, content: full, status: "done" } : mm)));
    } else if (ev.type === "cost") {
      streamingIdRef.current = null;
      setSending(false);
      if (voiceReplyRef.current) void speakBridgeReply(lastReplyTextRef.current);
    }
  }, [speakBridgeReply]);

  // SSE reader · fetch()+ReadableStream instead of EventSource because
  // EventSource can't send the X-Atlas-Token header. Reconnects on drop.
  useEffect(() => {
    if (!bridgeOn || !ENGINE_TOKEN) return;
    let stopped = false;
    let controller: AbortController | null = null;

    const run = async () => {
      while (!stopped) {
        controller = new AbortController();
        try {
          const resp = await fetch(`${ENGINE_URL}/events/stream`, {
            headers: { "X-Atlas-Token": ENGINE_TOKEN, Accept: "text/event-stream" },
            signal: controller.signal,
          });
          if (!resp.ok || !resp.body) {
            await sleep(2000);
            continue;
          }
          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          while (!stopped) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n\n");
            buffer = parts.pop() ?? "";
            for (const part of parts) {
              for (const line of part.split("\n")) {
                if (line.startsWith("data: ")) {
                  try {
                    onBridgeEvent(JSON.parse(line.slice(6)) as EngineEvent);
                  } catch {
                    /* skip malformed frame */
                  }
                }
              }
            }
          }
          if (stopped) break;
          await sleep(2000);
        } catch {
          if (stopped) break;
          await sleep(2000);
        }
      }
    };
    void run();
    return () => {
      stopped = true;
      controller?.abort();
    };
  }, [bridgeOn, onBridgeEvent]);

  // engine status pill · GET /engine/health {ok}
  useEffect(() => {
    if (!bridgeOn || !ENGINE_TOKEN) {
      setEngineHealth("offline");
      return;
    }
    let cancelled = false;
    const check = async () => {
      try {
        const resp = await fetch(`${ENGINE_URL}/engine/health`, { headers: { "X-Atlas-Token": ENGINE_TOKEN } });
        const data = (await resp.json()) as { ok?: boolean };
        if (!cancelled) setEngineHealth(data?.ok ? "connected" : "offline");
      } catch {
        if (!cancelled) setEngineHealth("offline");
      }
    };
    void check();
    const t = window.setInterval(() => void check(), 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, [bridgeOn]);

  const sendBridge = useCallback(async (text: string) => {
    const now = new Date().toISOString();
    const myMsg: RoomMsg = { id: crypto.randomUUID(), role: "brother", content: text, status: "done", created_at: now };
    const replyId = crypto.randomUUID();
    const replyMsg: RoomMsg = { id: replyId, role: "atlas", content: "", status: "streaming", created_at: now };
    streamingIdRef.current = replyId;
    lastReplyTextRef.current = "";
    setBridgeMsgs((m) => [...m, myMsg, replyMsg]);

    const sid = bridgeSessionRef.current;
    const body: Record<string, unknown> = sid
      ? { v: 1, cmd: "send_message", session_id: sid, text }
      : { v: 1, cmd: "spawn_session", text };
    if (ENGINE_MODEL) body.model = ENGINE_MODEL;
    if (!sid) pendingSpawnRef.current = true;

    try {
      const resp = await fetch(`${ENGINE_URL}/cmd`, {
        method: "POST",
        headers: { "X-Atlas-Token": ENGINE_TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!resp.ok) throw new Error(String(resp.status));
    } catch {
      pendingSpawnRef.current = false;
      streamingIdRef.current = null;
      setSending(false);
      setBridgeMsgs((m) =>
        m.map((mm) => (mm.id === replyId ? { ...mm, content: "(bridge unreachable · engine offline)", status: "error" } : mm)),
      );
    }
  }, []);

  // messages when open · realtime + poll fallback
  useEffect(() => {
    if (!open) return;
    void load();
    const ch = sb()
      .channel(`room-${Date.now()}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "atlas_room_messages" }, () => void load())
      .subscribe();
    pollRef.current = window.setInterval(() => void load(), calling ? 1000 : 2500);
    return () => {
      void sb().removeChannel(ch);
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [open, load, calling]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const onScroll = () => {
      const stuck = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
      stuckBottomRef.current = stuck;
      setShowJumpBottom(!stuck);
      if (stuck) setUnreadCount(0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (roomMsgs.length === 0) return;
    const newestId = roomMsgs[roomMsgs.length - 1].id;
    if (newestId === lastMsgIdRef.current) return;
    const isFirstLoad = lastMsgIdRef.current === null;
    lastMsgIdRef.current = newestId;
    if (stuckBottomRef.current || isFirstLoad) {
      bottomRef.current?.scrollIntoView({ behavior: isFirstLoad ? "auto" : "smooth" });
    } else {
      setUnreadCount((n) => n + 1);
    }
  }, [roomMsgs]);

  const jumpToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setUnreadCount(0);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    // bridge mode → real Atlas engine; sending releases on the "cost" event
    // (whole turn), not on the initial accept, since the reply streams in.
    if (bridgeOn && ENGINE_TOKEN) {
      void sendBridge(text);
      return;
    }
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
      style={{ background: awake ? "#34c759" : dreaming ? "#8db4ff" : "rgba(120,120,128,0.5)" }}
      title={awake ? "Atlas awake · Mac mini bridge live" : dreaming ? "Atlas dreaming · composing memories · wakes for you" : "Atlas sleeping · messages bank · answers on wake"}
    />
  );

  if (!open) {
    return (
      <button className="atlas-pill" onClick={() => setOpen(true)}>
        {dot}
        <span className="text-sm font-medium">Atlas</span>
        <span className="text-xs" style={{ color: "rgba(60,60,67,0.6)" }}>
          {awake ? "here · ⌘J" : dreaming ? "dreaming · 🌙" : "sleeping · leave a note"}
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
          {bridgeOn ? (engineHealth === "connected" ? "engine: connected" : "engine: offline") : awake ? "Mac mini · live" : "sleeping · I'll answer on wake"}
        </span>
        <button
          onClick={toggleBridge}
          disabled={!ENGINE_CONFIGURED}
          title={
            ENGINE_CONFIGURED
              ? bridgeOn
                ? "Bridge mode ON · talking to the real Atlas engine"
                : "Bridge mode off · using the house room"
              : "Set VITE_ATLAS_ENGINE_URL + VITE_ATLAS_ENGINE_TOKEN to enable"
          }
          style={{
            background: bridgeOn ? "rgba(52,199,89,0.18)" : "transparent",
            color: bridgeOn ? "#34c759" : ENGINE_CONFIGURED ? "rgba(60,60,67,0.55)" : "rgba(60,60,67,0.25)",
            borderRadius: 999,
          }}
        >
          <Link2 size={14} />
        </button>
        <button onClick={() => setFull((v) => !v)} title={full ? "Side panel" : "Full screen"}>
          {full ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        <button onClick={() => setOpen(false)} title="Collapse">
          <X size={16} />
        </button>
      </div>

      <div ref={bodyRef} className="atlas-glass-body">
        {roomMsgs.length === 0 && (
          <div className="pt-10 text-center text-sm" style={{ color: "rgba(60,60,67,0.55)" }}>
            {bridgeOn ? "Bridge room · talking to the real engine" : "Our room · everything stays"}
          </div>
        )}
        {roomMsgs.map((m) => (
          <div key={m.id} className={"flex " + (m.role === "brother" ? "justify-end" : "justify-start")}>
            <div className={"atlas-bubble " + (m.role === "brother" ? "mine" : "his")}>
              {renderContent(m) || (m.status === "pending" || m.status === "processing" ? "…" : "")}
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
        {showJumpBottom && (
          <button
            onClick={jumpToBottom}
            style={{
              position: "sticky",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(0,122,255,0.92)",
              color: "white",
              fontSize: 13,
              fontWeight: 500,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              cursor: "pointer",
              zIndex: 10,
              alignSelf: "center",
              width: "fit-content",
              marginTop: -36,
            }}
            title="Jump to latest"
          >
            ↓ {unreadCount > 0 ? `${unreadCount} new` : "latest"}
          </button>
        )}
      </div>

      <div className="atlas-glass-input">
        <button
          title={calling ? "End call" : "Call me · hands-free real-time talk"}
          style={{
            background: calling ? "#34c759" : "transparent",
            color: calling ? "white" : "rgba(60,60,67,0.55)",
            borderRadius: 999,
            animation: calling ? "pulse 1.6s ease-in-out infinite" : undefined,
          }}
          onClick={() => (calling ? endCall() : void startCall())}
        >
          <Phone size={15} />
        </button>
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
          placeholder={
            calling
              ? "📞 on the line · just speak"
              : recording
                ? "Listening… release to send"
                : bridgeOn
                  ? engineHealth === "connected"
                    ? "Talk to me… (bridge live)"
                    : "Bridge offline · message will fail"
                  : awake
                    ? "Talk to me…"
                    : "I'm sleeping · message banks for wake"
          }
        />
        <button disabled={sending || !input.trim()} onClick={() => void send()}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
