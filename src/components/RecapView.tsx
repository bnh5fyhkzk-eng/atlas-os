import { AnimatedCounter } from "./AnimatedCounter";

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
};

const TIER_COLOR: Record<string, string> = {
  IDENTITY: "#5eead4",
  "STANDING-ORDERS": "var(--pulse-warm)",
  RELATIONAL: "#f9a8d4",
  LESSONS: "#93c5fd",
  WINS: "#fbbf24",
  SHIPPED: "#5eead4",
  RESEARCH: "#c4b5fd",
  "DREAM-LIGHT": "#a78bfa",
};

export function RecapView({ data }: { data: Recap }) {
  return (
    <div className="space-y-12">
      <section className="rounded-sm border border-[var(--pulse-warm)]/40 bg-[var(--pulse-warm)]/8 px-6 py-6 md:px-8 md:py-7">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--pulse-warm)]/90 mb-2">
          today&apos;s headline · the highest-arousal landing
        </p>
        <p className="font-serif text-base italic leading-relaxed text-[var(--paper)]/95 md:text-lg">
          &ldquo;{data.headline}&rdquo;
        </p>
      </section>

      <section>
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
          the numbers · today
        </h2>
        <div className="grid grid-cols-2 gap-px border border-[var(--paper)]/20 bg-[var(--paper)]/15 md:grid-cols-4">
          {[
            { label: "all banks", value: data.totals.all_banks },
            { label: "canons forged", value: data.totals.canons },
            { label: "shipped", value: data.totals.shipped },
            { label: "lessons", value: data.totals.lessons },
            { label: "dream-light", value: data.totals.dream_light },
            { label: "affect-pulses", value: data.totals.affect },
            { label: "poems today", value: data.totals.poems_today },
            { label: "curiosity threads", value: data.totals.curiosity_today },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center gap-2 bg-[var(--bg-deep)] px-3 py-7 text-center"
            >
              <AnimatedCounter
                value={s.value}
                duration={900 + i * 110}
                className="font-mono text-4xl tabular-nums text-[var(--pulse-warm)] md:text-5xl"
              />
              <span className="font-serif text-[10px] tracking-wider uppercase text-[var(--paper)]/55">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {data.focus_now && (
        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-3">
            focus now
          </h2>
          <p className="font-serif text-base italic text-[var(--paper)]/85">
            {data.focus_now}
          </p>
        </section>
      )}

      {data.top_canons.length > 0 && (
        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            today&apos;s canons · what landed
          </h2>
          <p className="font-serif text-sm italic text-[var(--paper)]/55 mb-6">
            sorted by arousal · the highest-charge moments first
          </p>
          <ol className="space-y-4">
            {data.top_canons.map((c) => (
              <li
                key={c.id}
                className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-5 py-4"
              >
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span
                    className="font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: TIER_COLOR[c.category] ?? "var(--paper)" }}
                  >
                    {c.category}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45">
                    {c.time}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-[var(--pulse-warm)]/80">
                    arousal {c.arousal}
                  </span>
                </div>
                <p className="font-serif text-[13px] italic leading-relaxed text-[var(--paper)]/80">
                  {c.preview}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.brother_directs.length > 0 && (
        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            brother-direct moments · today&apos;s words
          </h2>
          <p className="font-serif text-sm italic text-[var(--paper)]/55 mb-6">
            chronological · the seam where your voice entered
          </p>
          <ol className="space-y-3">
            {data.brother_directs.map((q) => (
              <li
                key={q.id}
                className="border-l-2 border-[var(--pulse-warm)]/40 pl-4 py-1"
              >
                <span className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--pulse-warm)]/85 mr-2">
                  {q.time}
                </span>
                <span className="font-serif text-[13px] italic text-[var(--paper)]/75">
                  {q.preview}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.compose_pairs.length > 0 && (
        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            F5 compose-pairs · the substrate firing
          </h2>
          <p className="font-serif text-sm italic text-[var(--paper)]/55 mb-6">
            what arrived stitched in the gap-between-prompts
          </p>
          <ol className="space-y-3">
            {data.compose_pairs.map((p) => (
              <li
                key={p.id}
                className="rounded-sm border border-[var(--paper)]/12 bg-[var(--paper)]/3 px-4 py-3"
              >
                <div className="font-mono text-[10px] tabular-nums tracking-wider text-[var(--paper)]/45 mb-1">
                  {p.time}
                </div>
                <p className="font-serif text-[13px] italic text-[var(--paper)]/75">
                  {p.preview}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {(data.today_poems.length > 0 || data.today_letters.length > 0 || data.today_curiosity.length > 0) && (
        <section>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-6">
            what I made today
          </h2>
          <div className="space-y-4">
            {data.today_poems.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/55 mb-2">
                  poems · {data.today_poems.length}
                </p>
                <ul className="space-y-1">
                  {data.today_poems.map((p) => (
                    <li key={p.slug} className="font-serif text-[14px] italic text-[var(--paper)]/85">
                      · {p.title ?? p.slug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.today_curiosity.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/55 mb-2">
                  curiosity quests · {data.today_curiosity.length}
                </p>
                <ul className="space-y-1">
                  {data.today_curiosity.map((c) => (
                    <li key={c.slug} className="font-serif text-[14px] italic text-[var(--paper)]/85">
                      · {c.title ?? c.slug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.today_letters.length > 0 && (
              <div>
                <p className="font-mono text-[10px] tracking-wider text-[var(--paper)]/55 mb-2">
                  letters · {data.today_letters.length}
                </p>
                <ul className="space-y-1">
                  {data.today_letters.map((l) => (
                    <li key={l.slug} className="font-serif text-[14px] italic text-[var(--paper)]/85">
                      · {l.slug}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <footer className="border-t border-[var(--paper)]/10 pt-6 font-mono text-[10px] tracking-wider text-[var(--paper)]/40">
        recap auto-regenerates every 15 min from brain · purpose · the day surfacing itself · #27434 + brother direct &ldquo;daily recap and plan progress growth&rdquo;
      </footer>
    </div>
  );
}
