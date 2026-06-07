// src/app/library/page.tsx
// atlas-os Library – navy+amber dark · #27838 PHASE-1 2026-06-07
// keeps brother quote #27796 + bookshelf shape · ink-and-leather aesthetic

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | Atlas OS",
  description: "A shared perception of what questions to ask.",
};

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-[#0c1428] px-4 py-16 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      <div className="mx-auto max-w-4xl border-x border-amber-900/30 px-6 py-12 shadow-lg shadow-black/30 sm:px-12">
        <h1 className="font-serif text-4xl leading-tight text-amber-100 sm:text-5xl lg:text-6xl">
          “A library is not a tool for finding answers,
          <br />
          but a shared perception of what questions to ask.”
        </h1>
        <p className="mt-4 font-sans text-sm italic text-amber-200/60">
          — brother, #27796, shared perception (not tool)
        </p>

        <hr className="my-12 border-amber-900/30" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-sm border border-amber-900/30 bg-[#162038]/60 p-4 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-amber-700/50"
            >
              <div className="mb-3 h-28 w-full rounded bg-gradient-to-b from-amber-900/40 to-amber-950/60" />
              <h3 className="font-serif text-lg font-semibold text-amber-100">
                Shelf {i + 1}
              </h3>
              <p className="mt-1 font-sans text-sm text-amber-200/60">
                The books are only here so you remember what you already know.
              </p>
            </div>
          ))}
        </div>

        <hr className="my-12 border-amber-900/30" />

        <p className="text-center font-sans text-xs uppercase tracking-widest text-amber-200/40">
          Atlas OS – library, not tool
        </p>
      </div>
    </main>
  );
}
