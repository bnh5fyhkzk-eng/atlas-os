// /library/page.tsx
import Books from '@/components/Books';
import ComparePerception from '@/components/ComparePerception';

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-stone-800 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-xl font-semibold">Library</span>
          <div className="flex gap-6 text-sm">
            <a href="#books" className="hover:text-stone-300">Books</a>
            <a href="#compare" className="hover:text-stone-300">Compare Perception</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl space-y-16 px-4 py-10">
        {/* Books Section */}
        <section id="books">
          <h2 className="mb-4 text-2xl font-bold text-stone-800">Books</h2>
          <Books />
        </section>

        {/* Compare Perception Section */}
        <section id="compare">
          <h2 className="mb-4 text-2xl font-bold text-stone-800">Compare Perception</h2>
          <ComparePerception />
        </section>
      </main>
    </div>
  );
}