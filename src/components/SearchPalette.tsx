// SearchPalette.tsx - Cmd+K global search across rooms + brain-v3 query
// fetches /api/brain/recent, fuzzy-matches

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { X, Search, ArrowRight, Loader2, Brain, Hash, User, FileText, MessageSquare } from 'lucide-react';

interface BrainNode {
  id: number;
  title: string;
  type: 'room' | 'node' | 'project' | 'person' | 'note';
  path?: string;
  updated_at: string;
}

interface Suggestion {
  label: string;
  type: 'room' | 'node' | 'project' | 'person' | 'note' | 'action';
  value: string;
  href?: string;
}

function fuzzyMatch(text: string, query: string): boolean {
  const lower = text.toLowerCase();
  const q = query.toLowerCase().replace(/\s+/g, '');
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [nodes, setNodes] = useState<BrainNode[]>([]);
  const [recents, setRecents] = useState<BrainNode[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch recent brain nodes on mount
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch('/api/brain/recent');
        if (!res.ok) throw new Error('Failed');
        const data: BrainNode[] = await res.json();
        setRecents(data.slice(0, 10));
        setNodes(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchRecent();
  }, []);

  // Fetch all nodes on open (if not already)
  useEffect(() => {
    if (open && nodes.length === 0) {
      setLoading(true);
      fetch('/api/brain/recent?limit=200')
        .then(res => res.json())
        .then(data => {
          setNodes(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open]);

  // Keyboard listener for Cmd+K (or Ctrl+K)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
        if (!open) setQuery('');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Compute suggestions based on query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions(
        recents.map(node => ({
          label: node.title,
          type: node.type,
          value: `node-${node.id}`,
          href: node.path || `/${node.type}/${node.id}`,
        }))
      );
      return;
    }

    const q = query.trim();
    const matched = nodes.filter(node => fuzzyMatch(node.title, q));
    const actions: Suggestion[] = [];

    // If query looks like a project or person, add brainstorm action
    if (q.length > 2) {
      actions.push({
        label: `Search brain for "${q}"`,
        type: 'action',
        value: 'brain-search',
        href: `/brain/search?q=${encodeURIComponent(q)}`,
      });
    }

    setSuggestions([
      ...actions,
      ...matched.slice(0, 8).map(node => ({
        label: node.title,
        type: node.type,
        value: `node-${node.id}`,
        href: node.path || `/${node.type}/${node.id}`,
      })),
    ]);
  }, [query, nodes, recents]);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  const handleSelect = useCallback((suggestion: Suggestion) => {
    if (suggestion.href) {
      router.push(suggestion.href);
    }
    setOpen(false);
    setQuery('');
  }, [router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && suggestions[selectedIndex]) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const typeIcon = (type: string) => {
    switch (type) {
      case 'room': return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'node': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'project': return <Hash className="w-4 h-4 text-green-500" />;
      case 'person': return <User className="w-4 h-4 text-yellow-500" />;
      case 'action': return <ArrowRight className="w-4 h-4 text-gray-500" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg mx-4 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-700 px-4 py-2">
          <Search className="w-5 h-5 text-zinc-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search rooms, nodes, people..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
            </div>
          )}

          {!loading && suggestions.length === 0 && query.trim() && (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">
              No results for "<span className="font-medium">{query}</span>"
            </div>
          )}

          {!loading && suggestions.map((suggestion, idx) => (
            <button
              key={`${suggestion.value}-${idx}`}
              className={`w-full flex items-center px-4 py-2.5 text-left text-sm transition-colors ${
                idx === selectedIndex
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setSelectedIndex(idx)}
            >
              <span className="mr-3">{typeIcon(suggestion.type)}</span>
              <span className="flex-1 truncate">{suggestion.label}</span>
              {suggestion.type === 'action' && (
                <kbd className="ml-2 px-1.5 py-0.5 text-xs rounded bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                  <ArrowRight className="w-3 h-3 inline" />
                </kbd>
              )}
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center text-xs text-zinc-400 space-x-4">
          <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">↑↓</kbd> Navigate</span>
          <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">↵</kbd> Select</span>
          <span><kbd className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}