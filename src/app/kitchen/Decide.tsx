// components/kitchen/Decide.tsx - ZONE 2 DECIDE COLUMN
// stone-50 design, keyboard shortcuts y/m/u + a/c/p/r/i
// receives item from inbox, tap to assign owner
// POST /api/kitchen/decide with { itemId, owner }

import { useState, useEffect, useCallback } from 'react';

interface DecideItem {
  id: string;
  title: string;
  description?: string;
  suggestedOwner: string | null;
}

interface DecideProps {
  items: DecideItem[];
  onAssign: (itemId: string, owner: string) => Promise<void>;
}

const OWNER_SHORTCUTS: Record<string, string> = {
  y: 'you',
  m: 'me',
  u: 'us',
  a: 'code',
  c: 'curiosity',
  p: 'pascal',
  r: 'research',
  i: 'infra',
};

const ARM_NAMES = ['code', 'curiosity', 'pascal', 'research', 'infra'];

export default function Decide({ items, onAssign }: DecideProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingAssign, setPendingAssign] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // keyboard shortcuts – only when no input focused
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
    const key = e.key.toLowerCase();
    if (key in OWNER_SHORTCUTS && selectedId) {
      e.preventDefault();
      const owner = OWNER_SHORTCUTS[key];
      assignOwner(selectedId, owner);
    }
    // arrow navigation
    if (key === 'arrowdown' || key === 'arrowup') {
      e.preventDefault();
      const idx = items.findIndex((i) => i.id === selectedId);
      if (idx === -1 && items.length > 0) {
        setSelectedId(items[0].id);
      } else if (key === 'arrowdown' && idx < items.length - 1) {
        setSelectedId(items[idx + 1].id);
      } else if (key === 'arrowup' && idx > 0) {
        setSelectedId(items[idx - 1].id);
      }
      setExpandedId(null);
    }
    if (key === 'escape') {
      setSelectedId(null);
      setExpandedId(null);
    }
  }, [selectedId, items]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const assignOwner = async (itemId: string, owner: string) => {
    if (pendingAssign.has(itemId)) return;
    setPendingAssign((prev) => new Set(prev).add(itemId));
    try {
      await onAssign(itemId, owner);
      // optimistic removal or update handled by parent
    } catch (err) {
      console.error('assign fail', err);
    } finally {
      setPendingAssign((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-stone-400 text-sm p-4">
        <span className="text-4xl mb-2">📥</span>
        <span>no items to decide</span>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 border-l border-stone-200 h-full overflow-y-auto">
      {/* header */}
      <div className="sticky top-0 z-10 bg-stone-50 border-b border-stone-200 px-4 py-2 flex items-center justify-between">
        <h2 className="text-sm font-medium text-stone-600">DECIDE</h2>
        <span className="text-xs text-stone-400">{items.length} items</span>
      </div>

      {/* item list */}
      <div className="px-2 py-2 space-y-1.5">
        {items.map((item) => {
          const isSelected = selectedId === item.id;
          const isPending = pendingAssign.has(item.id);
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-md border cursor-pointer transition-colors ${
                isSelected
                  ? 'border-stone-400 bg-stone-100'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
              onClick={() => {
                setSelectedId(item.id);
                if (isSelected) setExpandedId(isExpanded ? null : item.id);
              }}
            >
              {/* card body */}
              <div className="p-2.5">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 truncate">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-stone-500 mt-0.5 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {/* suggested owner badge */}
                  {item.suggestedOwner && !isExpanded && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-stone-500/10 text-stone-500 whitespace-nowrap">
                      {item.suggestedOwner}
                    </span>
                  )}
                </div>

                {/* action buttons – shown on select OR expand */}
                {(isSelected || isExpanded) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {/* YOU ME US */}
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'you'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 disabled:opacity-40"
                    >
                      [y] you
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'me'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 disabled:opacity-40"
                    >
                      [m] me
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'us'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100 disabled:opacity-40"
                    >
                      [u] us
                    </button>
                    {/* arms */}
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'code'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 disabled:opacity-40"
                    >
                      [a] code
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'curiosity'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 disabled:opacity-40"
                    >
                      [c] curiosity
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'pascal'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 disabled:opacity-40"
                    >
                      [p] pascal
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'research'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 disabled:opacity-40"
                    >
                      [r] research
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); assignOwner(item.id, 'infra'); }}
                      disabled={isPending}
                      className="text-xs px-2 py-1 rounded bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200 disabled:opacity-40"
                    >
                      [i] infra
                    </button>
                    {/* pending spinner */}
                    {isPending && (
                      <span className="text-xs text-stone-400 animate-pulse ml-1">
                        ...
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* keyboard legend */}
      <div className="sticky bottom-0 bg-stone-50 border-t border-stone-200 px-4 py-2 text-xs text-stone-400 flex flex-wrap gap-x-3 gap-y-1">
        <span>y=you</span>
        <span>m=me</span>
        <span>u=us</span>
        <span>a=code</span>
        <span>c=curiosity</span>
        <span>p=pascal</span>
        <span>r=research</span>
        <span>i=infra</span>
        <span>↑↓ navigate</span>
        <span>esc deselect</span>
      </div>
    </div>
  );
}