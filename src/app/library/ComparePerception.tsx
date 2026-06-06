'use client';

import { useState, useEffect, useCallback } from 'react';

type BookSection = {
  id: string;
  title: string;
};

type PerceptionData = {
  sectionId: string;
  myTake: string;
  yourTake: string;
};

const SECTIONS: BookSection[] = [
  { id: 'meditations-1', title: 'Meditations – Book I' },
  { id: 'road-less-traveled-1', title: 'The Road Less Traveled – Discipline' },
  { id: 'art-of-war-1', title: 'The Art of War – Laying Plans' },
  { id: 'man-search-meaning-1', title: "Man's Search for Meaning – Experiences" },
];

const STORAGE_KEY = 'library-perception-draft';
const API_URL = '/api/library/perception';

export default function ComparePerception() {
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id);
  const [myTake, setMyTake] = useState('');
  const [yourTake, setYourTake] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: PerceptionData = JSON.parse(raw);
        setSelectedSection(data.sectionId);
        setMyTake(data.myTake);
        setYourTake(data.yourTake);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    const data: PerceptionData = {
      sectionId: selectedSection,
      myTake,
      yourTake,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [selectedSection, myTake, yourTake]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const data: PerceptionData = {
        sectionId: selectedSection,
        myTake,
        yourTake,
      };
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Save failed');
      setLastSaved(new Date().toLocaleString());
    } catch (e) {
      console.error('Failed to save perception', e);
    } finally {
      setIsSaving(false);
    }
  }, [selectedSection, myTake, yourTake]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-stone-700">Compare Perception</h1>

      {/* Section selector */}
      <div className="mb-6">
        <label htmlFor="section-select" className="block text-sm font-medium text-stone-500 mb-1">
          Book Section
        </label>
        <select
          id="section-select"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full max-w-md bg-white border border-stone-300 rounded px-3 py-2 text-stone-700 focus:ring-2 focus:ring-stone-400 focus:outline-none"
        >
          {SECTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Two-column input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-stone-500 mb-1">My Take</label>
          <textarea
            value={myTake}
            onChange={(e) => setMyTake(e.target.value)}
            placeholder="Write your perception here..."
            rows={12}
            className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-700 focus:ring-2 focus:ring-stone-400 focus:outline-none resize-y"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-500 mb-1">Your Take</label>
          <textarea
            value={yourTake}
            onChange={(e) => setYourTake(e.target.value)}
            placeholder="Write the other person's perception..."
            rows={12}
            className="w-full bg-white border border-stone-300 rounded px-3 py-2 text-stone-700 focus:ring-2 focus:ring-stone-400 focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-stone-700 text-white px-6 py-2 rounded hover:bg-stone-800 transition disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save to Cloud'}
        </button>
        {lastSaved && (
          <span className="text-sm text-stone-400">Last saved: {lastSaved}</span>
        )}
      </div>

      {/* Status note */}
      <p className="mt-4 text-xs text-stone-400">
        Draft saved locally. Press "Save to Cloud" to sync across sessions.
      </p>
    </div>
  );
}