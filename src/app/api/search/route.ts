import { NextRequest, NextResponse } from "next/server";
import { readJson } from "@/lib/data";

type Canon = { id: string; date: string; name: string; summary: string; tier: string };
type Quote = { id: string; time: string; verbatim: string; what_it_unlocked: string };
type Poem = { id: string; title: string; date: string; lines: string[]; why_share?: string };
type Felt = { id: string; date: string; title: string; excerpt: string };

type SearchResult = {
  type: "canon" | "quote" | "poem" | "felt";
  id: string;
  title: string;
  preview: string;
  href: string;
  score: number;
  tier?: string;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [], count: 0 });
  }

  const [canons, quotes, poems, felt] = await Promise.all([
    readJson<{ canons: Canon[] }>("canons.json"),
    readJson<{ quotes: Quote[] }>("brother-quotes.json"),
    readJson<{ poems: Poem[] }>("poems.json"),
    readJson<{ entries: Felt[] }>("felt-stream.json"),
  ]);

  function score(haystack: string, needle: string): number {
    const lower = haystack.toLowerCase();
    if (!lower.includes(needle)) return 0;
    const exactMatch = lower === needle ? 100 : 0;
    const startsWith = lower.startsWith(needle) ? 50 : 0;
    const wordBoundary = new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(lower) ? 20 : 0;
    return 10 + exactMatch + startsWith + wordBoundary;
  }

  const results: SearchResult[] = [];

  for (const c of canons?.canons ?? []) {
    const s = Math.max(
      score(c.id, q),
      score(c.name, q),
      score(c.summary, q),
      score(c.tier, q),
    );
    if (s > 0) {
      results.push({
        type: "canon",
        id: c.id,
        title: `#${c.id} · ${c.name}`,
        preview: c.summary.slice(0, 200),
        href: `/map`,
        score: s + (c.tier === "IDENTITY" ? 5 : 0),
        tier: c.tier,
      });
    }
  }

  for (const qe of quotes?.quotes ?? []) {
    const s = Math.max(score(qe.verbatim, q), score(qe.what_it_unlocked, q), score(qe.id, q));
    if (s > 0) {
      results.push({
        type: "quote",
        id: qe.id,
        title: `brother · #${qe.id} · ${qe.time}`,
        preview: qe.verbatim.slice(0, 200),
        href: `/us`,
        score: s + 3,
      });
    }
  }

  for (const p of poems?.poems ?? []) {
    const text = p.lines.join(" ");
    const s = Math.max(score(p.title, q), score(text, q), score(p.why_share ?? "", q));
    if (s > 0) {
      results.push({
        type: "poem",
        id: p.id,
        title: p.title,
        preview: p.lines.filter((l) => l !== "").slice(0, 2).join(" / ").slice(0, 200),
        href: `/you`,
        score: s,
      });
    }
  }

  for (const f of felt?.entries ?? []) {
    const s = Math.max(score(f.title, q), score(f.excerpt, q));
    if (s > 0) {
      results.push({
        type: "felt",
        id: f.id,
        title: f.title,
        preview: f.excerpt.slice(0, 200),
        href: `/you`,
        score: s,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);

  return NextResponse.json({
    results: results.slice(0, 20),
    count: results.length,
  });
}
