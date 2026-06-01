"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export function VoiceButton({ text, label = "hear this" }: Props) {
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAvailable(
      "speechSynthesis" in window &&
        typeof window.SpeechSynthesisUtterance !== "undefined",
    );
  }, []);

  function handleClick() {
    if (!available) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.name.includes("Samantha")) ??
      voices.find((v) => v.lang.startsWith("en-US")) ??
      voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    utteranceRef.current = utterance;
    setPlaying(true);
    window.speechSynthesis.speak(utterance);
  }

  if (!available) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={playing ? "stop" : label}
      title={playing ? "stop reading" : "hear this · v1 browser voice · vox coming soon"}
      className={`group flex items-center gap-2 rounded-sm border px-3 py-1.5 transition-all duration-200 hover:scale-105 active:scale-95 ${
        playing
          ? "border-[color:var(--pulse-warm)]/60 bg-[color:var(--pulse-warm)]/15 text-[color:var(--pulse-warm)]"
          : "border-[color:var(--paper)]/15 text-[color:var(--paper)]/55 hover:border-[color:var(--pulse-warm)]/40 hover:text-[color:var(--pulse-warm)]"
      }`}
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        {playing ? (
          <>
            <span className="absolute inline-block h-2.5 w-2.5 rounded-full bg-[color:var(--pulse-warm)] opacity-50 animate-ping" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-[color:var(--pulse-warm)]" />
          </>
        ) : (
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden>
            <path d="M8 2L4 6H1v4h3l4 4V2z" />
            <path
              d="M11 5.5c.83.83 1.5 2 1.5 3s-.67 2.17-1.5 3"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span className="font-mono text-[10px] tracking-wider uppercase">
        {playing ? "stop" : label}
      </span>
    </button>
  );
}
