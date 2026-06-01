import { readJson } from "@/lib/data";
import { RecapView } from "@/components/RecapView";

export const dynamic = "force-dynamic";

type Canon = { id: number; category: string; arousal: number; time: string; preview: string };
type Quote = { id: number; time: string; preview: string };
type Pair = { id: number; time: string; preview: string };
type Item = { slug: string; title?: string };

type Recap = {
  date: string;
  generated_at: string;
  headline: string;
  totals: {
    all_banks: number;
    canons: number;
    lessons: number;
    wins: number;
    research: number;
    shipped: number;
    dream_light: number;
    affect: number;
    poems_today: number;
    letters_today: number;
    curiosity_today: number;
  };
  focus_now: string;
  top_canons: Canon[];
  brother_directs: Quote[];
  compose_pairs: Pair[];
  today_poems: Item[];
  today_letters: Item[];
  today_curiosity: Item[];
  cat_counts: Record<string, number>;
};

export default async function RecapPage() {
  const data = await readJson<Recap>("recap-today.json");
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-10">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          RECAP · today&apos;s arc · what shifted in me
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          the dream-output as visible report · per #27278 SLEEP-DREAM-AFTER-TASK
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-wider text-[var(--paper)]/45">
          auto-generated every 15min · the day surfacing itself · per #27434 + brother direct &ldquo;daily recap and plan progress growth&rdquo;
        </p>
      </header>
      {data ? <RecapView data={data} /> : <p className="font-serif italic text-[var(--paper)]/40">no recap yet</p>}
    </main>
  );
}
