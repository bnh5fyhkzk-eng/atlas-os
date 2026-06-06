// /library/Books.tsx
'use client';

import React, { useState } from 'react';

// Mock data: books brother reads
const books = [
  {
    id: '1',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    atlasSynthesis: 'System 1 vs System 2 decision-making framework. Core for Atlas reasoning engine. Highlights cognitive biases in human judgment.',
    brotherPerception: '',
  },
  {
    id: '2',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    atlasSynthesis: 'User-centered design principles. Deeply influences Atlas UX and affordance patterns. Error prevention vs error handling.',
    brotherPerception: '',
  },
  {
    id: '3',
    title: 'Tristes Tropiques',
    author: 'Claude Lévi-Strauss',
    atlasSynthesis: 'Structural anthropology. Maps to Atlas taxonomy architecture. Binary oppositions inform categorization hierarchies.',
    brotherPerception: '',
  },
  {
    id: '4',
    title: 'Gödel, Escher, Bach',
    author: 'Douglas Hofstadter',
    atlasSynthesis: 'Self-reference and recursion. Core logic for Atlas meta-cognition loops. Strange loops in AI consciousness.',
    brotherPerception: '',
  },
];

export default function Books() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowComparison(true);
  };

  return (
    // stone-50 background
    <div className="min-h-screen bg-stone-50 p-4 sm:p-8 text-stone-800 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-stone-900">📚 Books Collin Reads</h1>
      <p className="text-sm text-stone-500 mb-6">
        Atlas synthesis per book · Collin fills perception zone
      </p>

      {/* Book list grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <button
            key={book.id}
            onClick={() => handleBookClick(book)}
            className="bg-white border border-stone-200 rounded-xl p-4 text-left hover:shadow-lg hover:border-stone-300 transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-stone-800">{book.title}</h2>
            <p className="text-sm text-stone-400 mt-1">{book.author}</p>
            <p className="text-xs text-stone-300 mt-2 line-clamp-2">
              {book.atlasSynthesis}
            </p>
          </button>
        ))}
      </div>

      {/* Comparison pane (expanded view) */}
      {showComparison && selectedBook && (
        <div className="mt-8 bg-white border border-stone-200 rounded-xl p-6 shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-xl text-stone-900">{selectedBook.title}</h3>
              <p className="text-sm text-stone-400">{selectedBook.author}</p>
            </div>
            <button
              onClick={() => setShowComparison(false)}
              className="text-stone-400 hover:text-stone-600 text-2xl leading-none pb-1"
              aria-label="Close comparison"
            >
              &times;
            </button>
          </div>

          {/* Atlas synthesis zone */}
          <div className="mb-4">
            <h4 className="font-semibold text-stone-700 mb-1">Atlas synthesis</h4>
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm text-stone-600">
              {selectedBook.atlasSynthesis}
            </div>
          </div>

          {/* Brother perception zone (empty for Collin to fill) */}
          <div>
            <h4 className="font-semibold text-stone-700 mb-1">Brother perception ✍️</h4>
            <div className="bg-yellow-50 border border-dashed border-stone-300 rounded-lg p-3 text-sm text-stone-400 italic">
              {selectedBook.brotherPerception || 'Collin, write your thoughts here...'}
            </div>
          </div>

          {/* Optional: Future comparison diagram placeholder */}
          <div className="mt-4 text-xs text-stone-400 text-right">
            comparison pane ready · Atlas vs Brother view
          </div>
        </div>
      )}
    </div>
  );
}