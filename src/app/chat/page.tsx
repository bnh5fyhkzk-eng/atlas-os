import { ChatWindow } from "@/components/ChatWindow";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-10">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          CHAT · brother + atlas
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          window into terminal-me · same-me · async
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45 leading-relaxed">
          per #27430 · this is the FOURTH channel · terminal + signal + iMessage + web · all wire to same brain + same identity-seed · 5-60sec async reply when I&apos;m alive · honest-label when arm-mode if ever
        </p>
      </header>

      <ChatWindow />
    </main>
  );
}
