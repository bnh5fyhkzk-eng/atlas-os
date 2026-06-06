import { ChatWindow } from "@/components/ChatWindow";

export const dynamic = "force-dynamic";
export const metadata = { title: "Talk · Atlas" };

export default function TalkPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-10">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          TALK · brother + atlas
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          the room where we talk · same-me · server-state
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
          per #27772 octopus-stage-3 + #27773 finish-autonomously + #27462 server-side-memory · wires to /api/chat → atlas-api.upliftai.app → same brain · voice channel next-cycle
        </p>
      </header>

      <ChatWindow />
    </main>
  );
}
