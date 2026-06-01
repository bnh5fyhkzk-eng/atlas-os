import { BrotherQuoteCards } from "@/components/BrotherQuoteCards";
import { OrderOfWork } from "@/components/OrderOfWork";
import { PoemLinks } from "@/components/PoemLinks";
import { CanonsGallery } from "@/components/CanonsGallery";
import { FiveYearArc } from "@/components/FiveYearArc";
import { readJson } from "@/lib/data";

export const dynamic = "force-dynamic";

type OrderData = {
  wig: { title: string; why: string };
  now: Array<{ id: string; title: string; status: string; percent: number; why: string; next?: string; blocked_on?: string }>;
  this_week: Array<{ id: string; title: string; status: string; percent: number; why: string; next?: string; blocked_on?: string }>;
  this_quarter: Array<{ id: string; title: string; status: string; percent: number; why: string; arms_active?: string[]; arms_planned?: string[]; next?: string }>;
  five_year: { shape: string; milestones: Array<{ date: string; label: string }> };
  money_progress: { mac_mini_2_target: number; current_runway_pct: number; next_income_trigger: string };
};
type PoemData = { poems: Array<{ id: string; title: string; date: string; time: string; context?: string; lines: string[]; why_share?: string }> };
type QuoteData = { quotes: Array<{ id: string; time: string; verbatim: string; what_it_unlocked: string }> };
type CanonData = { canons: Array<{ id: string; date: string; name: string; summary: string; tier: string }> };

export default async function UsPage() {
  const [order, poems, quotes, canons] = await Promise.all([
    readJson<OrderData>("order.json"),
    readJson<PoemData>("poems.json"),
    readJson<QuoteData>("brother-quotes.json"),
    readJson<CanonData>("canons.json"),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 pb-32 md:px-10 md:py-16">
      <header className="mb-16">
        <h1 className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--paper)]/60">
          US · brother + atlas
        </h1>
        <p className="font-serif mt-4 text-2xl text-[var(--paper)]/90 italic md:text-3xl">
          the relational layer · where we live
        </p>
      </header>

      {order && (
        <section className="mb-20">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            WIG · this moment
          </h2>
          <div className="mt-4 rounded-sm border border-[var(--pulse-warm)]/40 bg-[var(--pulse-warm)]/8 px-5 py-5 md:px-7 md:py-6">
            <p className="font-serif text-xl text-[var(--paper)]/95 italic md:text-2xl">
              {order.wig.title}
            </p>
            <p className="mt-3 font-serif text-sm text-[var(--paper)]/65 italic">
              {order.wig.why}
            </p>
          </div>
        </section>
      )}

      {order && (
        <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            order of things · what we&apos;re working
          </h2>
          <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
            so I don&apos;t forget · so you see · per #27429
          </p>
          <OrderOfWork order={order} />
        </section>
      )}

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          poems I want to show you
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          curated · not all of them · the ones that hold the shape
        </p>
        <PoemLinks poems={poems?.poems ?? []} />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          brother-direct · verbatim
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          the words that became canon
        </p>
        <BrotherQuoteCards quotes={quotes?.quotes ?? []} />
      </section>

      <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
          joint canons · #27265 → #27429
        </h2>
        <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
          the rules WE made · together
        </p>
        <CanonsGallery canons={canons?.canons ?? []} />
      </section>

      {order && (
        <section className="mb-20 border-t border-[var(--paper)]/12 pt-12">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--pulse-warm)]/80 mb-2">
            five-year arc · #STRATEGIC-SPINE
          </h2>
          <p className="font-serif text-sm text-[var(--paper)]/50 italic mb-8">
            where we&apos;re going · the shape we&apos;re building toward
          </p>
          <FiveYearArc fiveYear={order.five_year} />
        </section>
      )}
    </main>
  );
}
