// ATLAS-BAR · GOAL-V3-ATLAS-BAR · brother ↔ THIS Atlas (Mac-mini bridge) on every page
// Glass UI (Apple liquid-glass) · collapsed pill bottom-center · open = side glass
// panel (page stays visible) · breath dot = bridge daemon heartbeat · honest
// sleeping state when bridge down · context-aware (sends current page).
import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, X, Maximize2, Minimize2, Mic, Phone, Volume2, VolumeX } from "lucide-react";
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
          placeholder={calling ? "📞 on the line · just speak" : recording ? "Listening… release to send" : awake ? "Talk to me…" : "I'm sleeping · message banks for wake"}
        />
        <button disabled={sending || !input.trim()} onClick={() => void send()}>
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
