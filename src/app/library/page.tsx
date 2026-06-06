// src/app/library/page.tsx
// atlas-os Library – bookshelf aesthetic, serif heading with brother’s quote (#27796)

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | Atlas OS",
  description: "A shared perception of what questions to ask.",
};

export default function LibraryPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-16 sm:px-8 md:px-16 lg:px-32 xl:px-64">
      {/* stone-100 dividers */}
      <div className="mx-auto max-w-4xl border-x border-stone-100 px-6 py-12 shadow-sm sm:px-12">
        {/* serif h1 with quote */}
        <h1 className="font-serif text-4xl leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
          “A library is not a tool for finding answers,
          <br />
          but a shared perception of what questions to ask.”
        </h1>
        <p className="mt-4 font-sans text-sm italic text-stone-500">
          — brother, #27796, shared perception (not tool)
        </p>

        {/* stone-100 divider */}
        <hr className="my-12 border-stone-100" />

        {/* bookshelf placeholder – grid of cards simulating books */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-sm border border-stone-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-stone-300"
            >
              <div className="mb-3 h-28 w-full rounded bg-gradient-to-b from-stone-200 to-stone-300" />
              <h3 className="font-serif text-lg font-semibold text-stone-800">
                Shelf {i + 1}
              </h3>
              <p className="mt-1 font-sans text-sm text-stone-500">
                The books are only here so you remember what you already know.
              </p>
            </div>
          ))}
        </div>

        {/* stone-100 divider */}
        <hr className="my-12 border-stone-100" />

        <p className="text-center font-sans text-xs uppercase tracking-widest text-stone-400">
          Atlas OS – library, not tool
        </p>
      </div>
    </main>
  );
}